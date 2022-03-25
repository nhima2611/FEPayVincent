// material-ui
import { Box, Grid } from '@mui/material';
import ActionKanbanOrList from 'components/ActionKanbanOrList';
import { refLoading } from 'components/Loading';
import PreviewTable, { refPreviewTable } from 'components/PreviewTable';
import { STATUS } from 'constants/status';
import TableContext from 'contexts/TableContext';
import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import toastService from 'services/core/toast.service';
import ticketsServices from 'services/tickets-services';
// project imports
import { useDispatch } from 'store';
import { openDrawer } from 'store/slices/menu';
import { AssignToModel } from 'types/ticket';
import MainCard from 'ui-component/cards/MainCard';
import eventEmitter from 'utils/eventEmitter';
import toastify from 'utils/toastify';
import AssignToDialog, { refAssignTo } from '../components/AssignToDialog';
import TicketList from './list';

export default function MyTicketsPage() {
    const dispatchs = useDispatch();
    const [{ queryPageIndex, queryPageSize, sortByObject, filters, selectedIds, resetState }, dispatch] = useContext(TableContext);

    useEffect(() => {
        // hide left drawer when email app opens
        dispatchs(openDrawer(false));
        resetState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const navi = useNavigate();

    const onClickRowItem = (row) => {
        const { original } = row;
        console.log(original);
        if (original.last_status === 0) {
            navi(`edit-ticket/${row.values?.ticket_id?.toString()}`);
        } else {
            navi(`/tickets/${row.values?.ticket_id?.toString()}`);
        }
    };

    const [searchTerm, setSearchTerm] = useState('');

    const {
        isLoading,
        data: dataTable,
        refetch: refetchTable
    } = useQuery(
        ['my_tickets_table', queryPageIndex, queryPageSize, searchTerm, sortByObject, filters],
        () => {
            const page_size = `per_page=${queryPageSize}&page=${queryPageIndex + 1}`;
            const search = searchTerm?.length === 0 ? '' : `&keyword=${searchTerm}`;
            const view_type = `view_type=${0}`;
            const sortByProps = Boolean(sortByObject.length)
                ? `&order_by=${sortByObject[0]?.id ?? 'ticket_id'}&sorted_by=${sortByObject[0]?.desc ? 'desc' : 'asc'}`
                : '';
            const filtersByData = Boolean(filters)
                ? _.map(filters, (it) => {
                      const isDateType = ['created_date', 'last_status_date'].includes(it.id);
                      return `&${it.id}=${isDateType ? moment(it.value).format('DD/MM/YYYY') : it.value}`;
                  }).join('')
                : '';

            return ticketsServices.getAll(`${page_size}${search}&${view_type}${sortByProps}${filtersByData}`);
        },
        {
            keepPreviousData: true,
            // staleTime: Infinity
            onError: (err: any) => {
                toastify.showToast('error', err.message);
            },
            onSuccess: (res) => {
                dispatch({
                    type: 'TOTAL_COUNT_CHANGED',
                    payload: res.data?.meta?.pagination?.total
                });
            }
        }
    );

    const handleSearch = _.debounce(
        ({ value }) => {
            setSearchTerm(value);
        },
        1500,
        {
            maxWait: 1500
        }
    );

    useEffect(() => {
        eventEmitter.addListener('SEARCH_TICKET_LIST', handleSearch);

        return () => {
            eventEmitter.removeAllListeners();
        };
    }, []);

    const mDownloadTicket = useMutation(({ ids }: { ids: number[] }) => ticketsServices.downloadTicket(ids), {
        onSuccess: (data) => {
            const outputFilename = `${Date.now()}.xls`;
            const url = window.URL.createObjectURL(new Blob([data.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', outputFilename);
            document.body.appendChild(link);
            link.click();

            toastify.showToast('success', 'Download Success!');
            eventEmitter.emit('DESELECT_ALL_ROWS', true);
        },
        onError: (err: any) => {
            toastify.showToast('error', err.message);
        }
    });

    const mVerifyImportFile = useMutation((file) => ticketsServices.verifyImportFile(file), {
        onSuccess: (res) => {
            refPreviewTable.current?.handleClickOpen(res.data);
            toastify.showToast('success', res.data);
        },
        onError: (err: any) => {
            toastify.showToast('error', err.message);
        }
    });

    const mUploadFile = useMutation(({ data }: { data: any[] }) => ticketsServices.importFile(data), {
        onSuccess: (res) => {
            refetchTable();
            refPreviewTable.current?.handleClose();
            toastify.showToast('success', res.data);
        },
        onError: (err: any) => {
            toastify.showToast('error', err.message || 'Upload failed');
        }
    });

    const mDeleteTicket = useMutation((ids: number[]) => ticketsServices.deleteTicket(ids), {
        onSuccess: (res) => {
            toastify.showToast('success', res.data?.message);
            refetchTable();
            eventEmitter.emit('DESELECT_ALL_ROWS', true);
        },
        onError: (err: any) => {
            toastify.showToast('error', err.message);
        }
    });

    const sIds: number[] = _.map(selectedIds, (value, key) => _.toNumber(key));

    const onClickDownload = () => {
        if (!sIds.length) {
            return toastify.showToast('warning', 'Please choose row!');
        }
        return toastService.showConfirm({
            onConfirm: async () => {
                mDownloadTicket.mutate({ ids: sIds });
            },
            title: 'Are you sure download it?',
            icon: 'warning'
        });
    };
    const onClickTrash = () => {
        const checkStatus = _.some(
            _.filter(dataTable?.data?.data, (item) =>
                _.keys(selectedIds)
                    .map((it) => _.toNumber(it))
                    .includes(item.ticket_id)
            ),
            (it) => [STATUS.NEW, STATUS.PROCESSING, STATUS.REJECTED, STATUS.REVERTED, STATUS.SOLVED].includes(it.last_status)
        );

        if (checkStatus) return toastify.showToast('error', 'Can not delete');

        if (!sIds.length) {
            return toastify.showToast('warning', 'Please choose row!');
        }
        return toastService.showDeleteConfirm({
            onConfirm: async () => {
                mDeleteTicket.mutate(sIds);
            }
        });
    };

    const onVerifyImport = (file: any) => {
        mVerifyImportFile.mutate(file);
    };

    const onUploadFile = (data: any) => {
        return toastService.showConfirm({
            onConfirm: async () => {
                mUploadFile.mutate({ data });
            },
            title: 'Are you sure submit it?',
            icon: 'warning'
        });
    };

    const onClickAssignee = () => {
        refAssignTo.current?.handleClickOpen({ title: 'Assignee' });
    };

    const onClickSupporter = () => {
        refAssignTo.current?.handleClickOpen({ title: 'Supporter' });
    };

    const mAssignTo = useMutation((model: AssignToModel) => ticketsServices.assignTo(model), {
        onSuccess: (res) => {
            refetchTable();
            toastify.showToast('success', res.data?.message);
            refAssignTo.current?.handleClose();
            eventEmitter.emit('DESELECT_ALL_ROWS', true);
        },
        onError: (err: any) => {
            toastify.showToast('error', err.message);
        }
    });

    const onSubmitAssignTo = (data: AssignToModel) => {
        mAssignTo.mutate({
            ...data,
            ticket_ids: sIds
        });
    };

    const onClickTransfer = () => {
        navi('/kanban-ticket');
    };

    if (mVerifyImportFile.isLoading) {
        refLoading.current?.handleToggle();
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Grid container>
                <Grid item xs={12}>
                    <MainCard contentSX={{ p: 2 }}>
                        <ActionKanbanOrList
                            onClickDownload={onClickDownload}
                            onClickTransfer={onClickTransfer}
                            urlAddTicket="/tickets/create-ticket"
                            onUploadFile={onVerifyImport}
                            onClickTrash={onClickTrash}
                            onClickAssignee={onClickAssignee}
                            onClickSupporter={onClickSupporter}
                        />
                        <TicketList
                            onClickRowItem={onClickRowItem}
                            loading={isLoading}
                            data={dataTable?.data?.data}
                            cols={dataTable?.data?.cols}
                        />
                        <AssignToDialog onSubmit={onSubmitAssignTo} loading={mAssignTo.isLoading} />
                        <PreviewTable onSubmit={onUploadFile} loading={mUploadFile.isLoading} />
                    </MainCard>
                </Grid>
            </Grid>
        </Box>
    );
}

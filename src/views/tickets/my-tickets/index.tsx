// material-ui
import { Box, Grid } from '@mui/material';
import ActionKanbanOrList from 'components/ActionKanbanOrList';
import { lastStatusType } from 'constants/tickets';
import TableContext from 'contexts/TableContext';
import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import toastService from 'services/core/toast.service';
import ticketsServices from 'services/tickets-services';
// project imports
import { useDispatch, useSelector } from 'store';
import { getColumns, getColumnsOrder, getItems, setMode } from 'store/slices/kanban';
import { openDrawer } from 'store/slices/menu';
import MainCard from 'ui-component/cards/MainCard';
import eventEmitter from 'utils/eventEmitter';
import toastify from 'utils/toastify';
import Board from 'components/kanban';
import TicketList from './list';
import AssignToDialog, { refAssignTo } from '../components/AssignToDialog';
import { AssignToModel } from 'types/ticket';
import { STATUS } from 'constants/status';

export default function MyTicketsPage() {
    const dispatchs = useDispatch();
    const [{ queryPageIndex, queryPageSize, sortByObject, filters, selectedIds, resetState }, dispatch] = useContext(TableContext);

    useEffect(() => {
        // hide left drawer when email app opens
        dispatchs(openDrawer(false));
        resetState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatchs(getColumnsOrder());
        // dispatch(getItems());
        // dispatch(getUsersListStyle1());
        // dispatch(getProfiles());
        // dispatch(getComments());
        // dispatch(getUserStory());
        // dispatch(getUserStoryOrder());
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

    const { mode } = useSelector((state) => state.kanban);

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
                const d = _(res.data?.data)
                    .groupBy('last_status')
                    .map((items, status) => ({ status: _.get(lastStatusType, [_.toNumber(status)]), value: _.map(items, 'ticket_id') }))
                    .value()
                    .reduce((obj, param) => {
                        obj[param.status] = param.value;
                        return obj;
                    }, {});

                dispatchs(getColumns(d));
                dispatchs(getItems(res.data?.data));

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

    const mUploadTicket = useMutation((file) => ticketsServices.uploadTicket(file), {
        onSuccess: (res) => {
            refetchTable();
            toastify.showToast('success', res.data);
        },
        onError: (err: any) => {
            toastify.showToast('error', err.message);
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
        return mDownloadTicket.mutate({ ids: sIds });
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

    const onUploadFile = (file: any) => {
        mUploadTicket.mutate(file);
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
            console.log(res);
            toastify.showToast('success', res.data?.message);
            refAssignTo.current?.handleClose();
            eventEmitter.emit('DESELECT_ALL_ROWS', true);
        },
        onError: (err: any) => {
            toastify.showToast('error', err.message);
        }
    });

    const onSubmitAssignTo = (values: any) => {
        mAssignTo.mutate({
            email: values.email,
            name: values.username,
            ticket_ids: sIds,
            type: values.type
        });
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Grid container>
                <Grid item xs={12}>
                    <MainCard contentSX={{ p: 2 }}>
                        <ActionKanbanOrList
                            onClickDownload={onClickDownload}
                            onClickTransfer={() => dispatchs(setMode())}
                            urlAddTicket="/tickets/create-ticket"
                            onUploadFile={onUploadFile}
                            onClickTrash={onClickTrash}
                            onClickAssignee={onClickAssignee}
                            onClickSupporter={onClickSupporter}
                        />
                        {mode === 'kanban' ? (
                            <Board />
                        ) : (
                            <TicketList
                                onClickRowItem={onClickRowItem}
                                loading={isLoading}
                                data={dataTable?.data?.data}
                                cols={dataTable?.data?.cols}
                            />
                        )}
                        <AssignToDialog onSubmit={onSubmitAssignTo} />
                    </MainCard>
                </Grid>
            </Grid>
        </Box>
    );
}

import { Box, Grid } from '@mui/material';
import ActionPartner from 'components/ActionPartner';
import TableContext from 'contexts/TableContext';
import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSearchParam } from 'react-use';
import toastService from 'services/core/toast.service';
import partnerServices from 'services/partner-services';
import MainCard from 'ui-component/cards/MainCard';
import eventEmitter from 'utils/eventEmitter';
import toastify from 'utils/toastify';
import PartnerList from './list';

const PartnerPage = () => {
    const [{ queryPageIndex, queryPageSize, sortByObject, filters, selectedIds, resetState }, dispatch] = useContext(TableContext);
    const [searchTerm, setSearchTerm] = useState('');

    const f = useSearchParam('f');
    const {
        isLoading,
        data: dataTable,
        refetch: refetchTable
    } = useQuery(
        ['partner_table', queryPageIndex, queryPageSize, searchTerm, sortByObject, filters],
        () => {
            const page_size = `per_page=${queryPageSize}&page=${queryPageIndex + 1}`;
            const search = searchTerm?.length === 0 ? '' : `&keyword=${searchTerm}`;
            const view_type = `view_type=${1}`;
            const sortByProps = Boolean(sortByObject.length)
                ? `&order_by=${sortByObject[0]?.id ?? 'ticket_id'}&sorted_by=${sortByObject[0]?.desc ? 'desc' : 'asc'}`
                : '';
            const filtersByData = Boolean(filters)
                ? _.map(filters, (it) => {
                      const isDateType = ['created_date', 'last_status_date'].includes(it.id);
                      return `&${it.id}=${isDateType ? moment(it.value).format('DD/MM/YYYY') : it.value}`;
                  }).join('')
                : '';

            return partnerServices.getAll(`${page_size}${search}&${view_type}${sortByProps}${filtersByData}`);
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

    const navi = useNavigate();

    const onClickRowItem = (row) => {
        navi(row.values?.id?.toString());
    };

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

    useEffect(() => {
        if (f) {
            dispatch({ type: 'PAGE_CHANGED', payload: JSON.parse(f!)?.queryPageIndex! || 0 });
            setSearchTerm(JSON.parse(f!)?.keyword! || '');
        }
    }, [f]);

    const sIds: number[] = _.map(selectedIds, (value, key) => _.toNumber(key));

    const mDownloadPartner = useMutation(({ ids }: { ids: number[] }) => partnerServices.downloadPartner(ids), {
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

    const onClickDownload = () => {
        if (!sIds.length) {
            return toastify.showToast('warning', 'Please choose row!');
        }
        return toastService.showConfirm({
            onConfirm: async () => {
                mDownloadPartner.mutate({ ids: sIds });
            },
            title: 'Are you sure download it?',
            icon: 'warning'
        });
    };

    const onUploadFile = () => {};
    const onClickTrash = () => {};
    return (
        <Box sx={{ display: 'flex' }}>
            <Grid container>
                <Grid item xs={12}>
                    <MainCard contentSX={{ p: 2 }}>
                        <ActionPartner
                            onClickDownload={onClickDownload}
                            urlAddTicket="create"
                            onUploadFile={onUploadFile}
                            onClickTrash={onClickTrash}
                        />
                        <PartnerList
                            onClickRowItem={onClickRowItem}
                            loading={isLoading}
                            data={dataTable?.data?.data}
                            cols={dataTable?.data?.cols}
                        />
                    </MainCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PartnerPage;

import { Box, Grid } from '@mui/material';
import ActionPartner from 'components/ActionPartner';
import TableContext from 'contexts/TableContext';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import partnerServices from 'services/partner-services';
import MainCard from 'ui-component/cards/MainCard';
import eventEmitter from 'utils/eventEmitter';
import toastify from 'utils/toastify';
import PartnerList from './list';

const PosPage = () => {
    const [{ queryPageIndex, queryPageSize, sortByObject, filters, selectedIds, resetState }, dispatch] = useContext(TableContext);
    const [searchTerm, setSearchTerm] = useState('');

    const {
        isLoading,
        data: dataTable,
        refetch: refetchTable
    } = useQuery(
        ['pos_table', queryPageIndex, queryPageSize, searchTerm, sortByObject, filters],
        () => {
            const page_size = `per_page=${queryPageSize}&page=${queryPageIndex + 1}`;
            const search = searchTerm?.length === 0 ? '' : `&keyword=${searchTerm}`;
            const view_type = `view_type=${3}`;
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

    const onClickDownload = () => {};
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
                            title="Sub Partner List"
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

export default PosPage;

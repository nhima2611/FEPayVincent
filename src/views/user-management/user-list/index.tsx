import { Box, Grid } from '@mui/material';
import ActionPartner from 'components/ActionPartner';
import TableContext from 'contexts/TableContext';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSearchParam } from 'react-use';
import userService from 'services/api-services/user.service';
import MainCard from 'ui-component/cards/MainCard';
import eventEmitter from 'utils/eventEmitter';
import toastify from 'utils/toastify';
import PartnerList from './list';

const UserPage = () => {
    const [{ queryPageIndex, queryPageSize, sortByObject, filters, selectedIds, resetState }, dispatch] = useContext(TableContext);
    const [searchTerm, setSearchTerm] = useState('');
    const navi = useNavigate();
    const userIdParam = useSearchParam('user_id');

    const {
        isLoading,
        data: dataTable,
        refetch: refetchTable
    } = useQuery(
        ['user_table', queryPageIndex, queryPageSize, searchTerm, sortByObject, filters],
        () => {
            const page_size = `per_page=${queryPageSize}&page=${queryPageIndex + 1}`;
            const search = searchTerm?.length === 0 ? '' : `&keyword=${searchTerm}`;
            const view_type = `view_type=${2}`;
            const sortByProps = Boolean(sortByObject.length)
                ? `&order_by=${sortByObject[0]?.id ?? 'ticket_id'}&sorted_by=${sortByObject[0]?.desc ? 'desc' : 'asc'}`
                : '';
            const filtersByData = Boolean(filters)
                ? _.map(filters, (it) => {
                      const isDateType = ['created_date', 'last_status_date'].includes(it.id);
                      return `&${it.id}=${isDateType ? moment(it.value).format('DD/MM/YYYY') : it.value}`;
                  }).join('')
                : '';

            return userService.getAll(`${page_size}${search}&${view_type}${sortByProps}${filtersByData}`);
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

    const onClickRowItem = (row) => {
        navi(row.values?.user_id?.toString());
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
        if (userIdParam) {
            dispatch({ type: 'FILTERS_CHANGED', payload: [{ id: 'user_id', value: userIdParam }] });
        }
    }, [userIdParam]);

    const onClickDownload = () => {};
    const onUploadFile = () => {};
    const onClickTrash = () => {};
    const onClickUser = () => {};
    return (
        <Box sx={{ display: 'flex' }}>
            <Grid container>
                <Grid item xs={12}>
                    <MainCard contentSX={{ p: 2 }}>
                        <ActionPartner
                            onClickDownload={onClickDownload}
                            onClickUser={onClickUser}
                            urlAddTicket="create"
                            onUploadFile={onUploadFile}
                            onClickTrash={onClickTrash}
                            title="User List"
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

export default UserPage;

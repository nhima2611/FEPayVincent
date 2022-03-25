import { Box, Grid } from '@mui/material';
import ActionKanbanOrList from 'components/ActionKanbanOrList';
import Board from 'components/kanban';
import { lastStatusType } from 'constants/tickets';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import ticketsServices from 'services/tickets-services';
import { useDispatch } from 'store';
import { getColumns, getColumnsOrder, getItems } from 'store/slices/kanban';
import MainCard from 'ui-component/cards/MainCard';

const KanbanTicketPage = () => {
    const dispatch = useDispatch();
    const navi = useNavigate();

    useEffect(() => {
        dispatch(getColumnsOrder());
        // dispatch(getItems());
        // dispatch(getUsersListStyle1());
        // dispatch(getProfiles());
        // dispatch(getComments());
        // dispatch(getUserStory());
        // dispatch(getUserStoryOrder());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const qGetKanban = useQuery('qGetKanban', () => ticketsServices.getAll(`view_type=2`), {
        onSuccess: (res) => {
            const d = _(res.data?.data)
                .groupBy('last_status')
                .map((items, status) => ({ status: _.get(lastStatusType, [_.toNumber(status)]), value: _.map(items, 'ticket_id') }))
                .value()
                .reduce((obj, param) => {
                    obj[param.status] = param.value;
                    return obj;
                }, {});

            dispatch(getColumns(d));
            dispatch(getItems(res.data?.data));
        }
    });
    return (
        <Box sx={{ display: 'flex' }}>
            <Grid container>
                <Grid item xs={12}>
                    <MainCard contentSX={{ p: 2 }}>
                        <ActionKanbanOrList mode="kanban" urlAddTicket="/tickets/create-ticket" onClickTransfer={() => navi(-1)} />
                        {qGetKanban.isLoading ? <div>loading</div> : <Board />}
                    </MainCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default KanbanTicketPage;

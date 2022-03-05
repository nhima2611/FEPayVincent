import { useEffect, useState, SyntheticEvent } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';

// material-ui
import { Box, Grid, Tab, Tabs } from '@mui/material';
import {
    getUserStory,
    getUserStoryOrder,
    getProfiles,
    getComments,
    getItems,
    getColumns,
    getColumnsOrder,
    setMode
} from 'store/slices/kanban';

// project imports
import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/slices/menu';
import MainCard from 'ui-component/cards/MainCard';
import Board from './kanban/Board';
import ActionKanban from './action-kanban';
import ListStylePage1 from './kanban/List';
import { getUsersListStyle1 } from 'store/slices/user';

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// ==============================|| APPLICATION - KANBAN ||============================== //

export default function KanbanPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        // hide left drawer when email app opens
        // dispatch(openDrawer(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(getItems());
        dispatch(getColumns());
        dispatch(getColumnsOrder());
        dispatch(getUsersListStyle1());

        // dispatch(getProfiles());
        // dispatch(getComments());
        // dispatch(getUserStory());
        // dispatch(getUserStoryOrder());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { mode } = useSelector((state) => state.kanban);

    return (
        <Box sx={{ display: 'flex' }}>
            <Grid container>
                <Grid item xs={12}>
                    <MainCard contentSX={{ p: 2 }}>
                        <ActionKanban onClickTransfer={() => dispatch(setMode())} urlAddTicket="/tickets/create-ticket" />
                        {mode === 'kanban' ? <Board /> : <ListStylePage1 />}
                    </MainCard>
                </Grid>
            </Grid>
        </Box>
    );
}

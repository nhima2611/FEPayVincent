import React from 'react';
import { dispatch } from 'store';
import { setMode } from 'store/slices/kanban';
import MainCard from 'ui-component/cards/MainCard';
import ActionLimitation from './action-limit';
import UserList from './UserList';
import FilterSelectLimitation from './fillter-limit/index';

export default function Limitation() {
    return (
        <MainCard content={false} border={false}>
            <FilterSelectLimitation />
            <UserList />
        </MainCard>
    );
}

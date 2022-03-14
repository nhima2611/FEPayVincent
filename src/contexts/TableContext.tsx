import React, { createContext, useReducer } from 'react';

export const initialState = {
    queryPageIndex: 0,
    queryPageSize: 10,
    totalCount: null,
    sortByObject: [],
    filters: [],
    selectedIds: []
};

const PAGE_CHANGED = 'PAGE_CHANGED';
const PAGE_SIZE_CHANGED = 'PAGE_SIZE_CHANGED';
const TOTAL_COUNT_CHANGED = 'TOTAL_COUNT_CHANGED';
const SORT_BY_OBJECT_CHANGED = 'SORT_BY_OBJECT_CHANGED';
const FILTERS_CHANGED = 'FILTERS_CHANGED';
const SELECTED_CHANGE = 'SELECTED_CHANGE';

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case PAGE_CHANGED:
            return {
                ...state,
                queryPageIndex: payload
            };
        case PAGE_SIZE_CHANGED:
            return {
                ...state,
                queryPageSize: payload
            };
        case TOTAL_COUNT_CHANGED:
            return {
                ...state,
                totalCount: payload
            };
        case SORT_BY_OBJECT_CHANGED:
            return {
                ...state,
                sortByObject: payload
            };
        case FILTERS_CHANGED:
            return {
                ...state,
                filters: payload
            };
        case SELECTED_CHANGE:
            return {
                ...state,
                selectedIds: payload
            };

        default:
            throw new Error(`Unhandled action type: ${type}`);
    }
};

const TableContext = createContext<any>(null);

export const TableProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <TableContext.Provider value={[{ ...state }, dispatch]}>{children}</TableContext.Provider>;
};

export default TableContext;

import React, { useContext, useState } from 'react';
import {
    Box,
    Checkbox,
    IconButton,
    OutlinedInput,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { visuallyHidden } from '@mui/utils';

import { useTable, usePagination, useRowSelect, useSortBy, useFilters } from 'react-table';
import { IconFilter } from '@tabler/icons';
import { STATUS } from 'constants/status';
import { getColorAndNameStatus, issueType, lastStatusType, productTypes, requestedBy, transactionType } from 'views/tickets/constant';
import { DefaultColumnFilter } from 'views/tickets/list';
import TableContext from 'contexts/TableContext';
import eventEmitter from 'utils/eventEmitter';
// import { initialState, reducer } from 'views/tickets';

const FETable = ({ data, columns, fetchData, pageCount: controlledPageCount, loading, onClickRowItem }) => {
    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            //   fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase()) : true;
                });
            }
        }),
        []
    );

    const [{ queryPageIndex, queryPageSize, totalCount }, dispatch] = useContext(TableContext);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        selectedFlatRows,
        toggleAllPageRowsSelected,
        state: { pageIndex, pageSize, sortBy, filters, selectedRowIds }
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageIndex: queryPageIndex,
                pageSize: queryPageSize
            },
            manualSortBy: true,
            disableSortRemove: true,
            manualPagination: true,
            manualFilters: true,
            pageCount: totalCount,
            filterTypes,
            autoResetSelectedRows: false,
            getRowId: (row) => row.ticket_id
        },
        useFilters,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columnss) => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    )
                },
                ...columnss
            ]);
        }
    );

    const handleDeselectAllRow = (flag: boolean) => {
        if (flag) {
            toggleAllPageRowsSelected(false);
        }
    };

    React.useEffect(() => {
        eventEmitter.addListener('DESELECT_ALL_ROWS', handleDeselectAllRow);
    }, []);

    React.useEffect(() => {
        dispatch({ type: 'PAGE_SIZE_CHANGED', payload: pageSize });
        gotoPage(0);
    }, [pageSize, gotoPage]);

    React.useEffect(() => {
        if (controlledPageCount) {
            dispatch({
                type: 'TOTAL_COUNT_CHANGED',
                payload: controlledPageCount
            });
        }
    }, [controlledPageCount]);

    React.useEffect(() => {
        if (selectedRowIds) {
            dispatch({
                type: 'SELECTED_CHANGE',
                payload: selectedRowIds
            });
        }
    }, [selectedRowIds]);

    React.useEffect(() => {
        if (sortBy) {
            dispatch({
                type: 'SORT_BY_OBJECT_CHANGED',
                payload: sortBy
            });
        }
    }, [sortBy]);

    React.useEffect(() => {
        if (filters) {
            dispatch({
                type: 'FILTERS_CHANGED',
                payload: filters
            });
        }
    }, [filters]);

    const handleChangePage = (event, newPage) => {
        gotoPage(newPage);
        dispatch({ type: 'PAGE_CHANGED', payload: newPage });
    };

    const handleChangeRowsPerPage = (event) => {
        setPageSize(Number(event.target.value));
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = pageIndex > 0 ? Math.max(0, (1 + pageIndex) * pageSize - pageOptions.length) : 0;

    const [dense] = React.useState(false);

    const renderNotfound = () => (
        <TableRow>
            <TableCell sx={{ textAlign: 'center' }} colSpan={columns.length + 1}>
                Search Not Found
            </TableCell>
        </TableRow>
    );

    return (
        <div>
            <TableContainer {...getTableProps()}>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                    <TableHead>
                        {headerGroups.map((headerGroup) => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <TableCell
                                        {...(column.id === 'selection'
                                            ? column.getHeaderProps()
                                            : column.getHeaderProps(column.getSortByToggleProps()))}
                                        sx={{ minWidth: 110 }}
                                    >
                                        <TableSortLabel
                                            active={column.isSorted}
                                            direction={column.isSortedDesc ? 'desc' : 'asc'}
                                            IconComponent={ArrowDropDownIcon}
                                        >
                                            {column.render('Header')}
                                            {column.id !== 'selection' ? (
                                                <Box component="span" sx={visuallyHidden}>
                                                    {column.isSortedDesc ? 'sorted descending' : 'sorted ascending'}
                                                </Box>
                                            ) : null}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>

                    <TableHead>
                        {headerGroups.map((headerGroup) => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => {
                                    if (column.id === 'selection')
                                        return (
                                            <TableCell {...column.getHeaderProps()}>
                                                <IconButton disabled>
                                                    <IconFilter color="#008345" />
                                                </IconButton>
                                            </TableCell>
                                        );
                                    return (
                                        <TableCell {...column.getHeaderProps()} sx={{ minWidth: 110 }}>
                                            {column.canFilter ? column.render('Filter') : null}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHead>

                    <TableBody {...getTableBodyProps()}>
                        {!Boolean(data.length) && renderNotfound()}

                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <TableRow
                                    hover
                                    {...row.getRowProps()}
                                    onClick={() => onClickRowItem(row)}
                                    sx={{ textDecoration: 'none', cursor: 'pointer' }}
                                >
                                    {row.cells.map((cell) => {
                                        const isDateType = ['created_date', 'last_status_date'].includes(cell.column?.id);
                                        const isStatusType = ['last_status'].includes(cell.column?.id);
                                        const isTransactionType = ['transaction_type'].includes(cell.column?.id);
                                        const isIssueType = ['issue_type'].includes(cell.column?.id);
                                        const isProductType = ['product_type'].includes(cell.column?.id);
                                        const isRequestedByType = ['requested_by'].includes(cell.column?.id);

                                        if (isDateType)
                                            return (
                                                <TableCell {...cell.getCellProps()} sx={{ ...styles.cellText }}>
                                                    {moment(cell.value).format('DD/MM/YYYY')}
                                                </TableCell>
                                            );
                                        if (isTransactionType)
                                            return (
                                                <TableCell {...cell.getCellProps()} sx={{ ...styles.cellText }}>
                                                    {_.get(transactionType, [cell.value])}
                                                </TableCell>
                                            );
                                        if (isIssueType)
                                            return (
                                                <TableCell {...cell.getCellProps()} sx={{ ...styles.cellText }}>
                                                    {_.get(issueType, [cell.value])}
                                                </TableCell>
                                            );
                                        if (isProductType)
                                            return (
                                                <TableCell {...cell.getCellProps()} sx={{ ...styles.cellText }}>
                                                    {_.get(productTypes, [cell.value])}
                                                </TableCell>
                                            );
                                        if (isRequestedByType)
                                            return (
                                                <TableCell {...cell.getCellProps()} sx={{ ...styles.cellText }}>
                                                    {_.get(requestedBy, [cell.value])}
                                                </TableCell>
                                            );
                                        if (isStatusType)
                                            return (
                                                <TableCell
                                                    {...cell.getCellProps()}
                                                    sx={{ ...styles.cellText, color: getColorAndNameStatus(cell.value)?.color }}
                                                >
                                                    {_.get(lastStatusType, [cell.value])}
                                                </TableCell>
                                            );
                                        return (
                                            <TableCell {...cell.getCellProps()} sx={{ ...styles.cellText }}>
                                                {cell.render('Cell')}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}

                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: (dense ? 33 : 53) * emptyRows
                                }}
                            >
                                <TableCell colSpan={columns.length + 1} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                rowsPerPageOptions={[10, 15, 20]}
                count={pageOptions.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default FETable;

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }: { indeterminate: any }, ref) => {
    const defaultRef = React.useRef<any>();
    const resolvedRef: any = ref || defaultRef;

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <>
            <Checkbox
                ref={resolvedRef}
                {...rest}
                size="small"
                onClick={(event) => {
                    event.stopPropagation();
                }}
            />
        </>
    );
});

const styles = {
    cellText: {
        fontSize: 10,
        width: 50
    }
};

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
    Box,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import TableContext from 'contexts/TableContext';
import React, { useContext } from 'react';
import { useFilters, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import eventEmitter from 'utils/eventEmitter';

const FETable = ({ data, columns, onClickRowItem }) => {
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
            <TableCell sx={{ textAlign: 'left' }} colSpan={columns.length + 1}>
                Search Not Found
            </TableCell>
        </TableRow>
    );

    return (
        <div>
            <TableContainer {...getTableProps()}>
                <Table aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                    <TableHead>
                        {headerGroups.map((headerGroup) => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <TableCell
                                        {...(column.id === 'selection'
                                            ? column.getHeaderProps()
                                            : column.getHeaderProps(column.getSortByToggleProps()))}
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
                                    if (column.id === 'selection') return <TableCell {...column.getHeaderProps()}>Filter</TableCell>;
                                    return (
                                        <TableCell {...column.getHeaderProps()} sx={{ minWidth: 200 }}>
                                            {column.canFilter ? column.render('Filter') : null}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHead>

                    <TableBody {...getTableBodyProps()}>
                        {!Boolean(data.length) && renderNotfound()}

                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <TableRow
                                    hover
                                    {...row.getRowProps()}
                                    onClick={() => onClickRowItem(row)}
                                    sx={{ textDecoration: 'none', cursor: 'pointer' }}
                                >
                                    {row.cells.map((cell) => {
                                        return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
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
                onClick={(event) => {
                    event.stopPropagation();
                }}
                sx={{ padding: 0 }}
            />
        </>
    );
});

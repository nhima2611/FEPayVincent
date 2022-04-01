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
    TableSortLabel,
    Typography
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import TableContext from 'contexts/TableContext';
import React, { createRef, useContext, useImperativeHandle } from 'react';
import { useFilters, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import eventEmitter from 'utils/eventEmitter';

interface Props {
    data: any;
    columns: any;
    onClickRowItem?: (it?: any) => void;
    showCustomFilter?: boolean;
    rowId?: string;
    disableCheckbox?: boolean;
    manualSortBy?: boolean;
    manualPagination?: boolean;
    hiddenColumns?: string[];
}
export const refFETable = createRef<any>();
const FETable = ({
    data,
    columns,
    onClickRowItem,
    showCustomFilter = false,
    rowId = '',
    disableCheckbox,
    manualSortBy = true,
    manualPagination = true,
    hiddenColumns = []
}: Props) => {
    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            //   fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row?.values[id];
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
        setAllFilters,
        setFilter,
        state: { pageIndex, pageSize, sortBy, filters, selectedRowIds }
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageIndex: queryPageIndex,
                pageSize: queryPageSize,
                hiddenColumns
            },
            manualSortBy,
            disableSortRemove: true,
            manualPagination,
            manualFilters: true,
            pageCount: totalCount,
            filterTypes,
            autoResetSelectedRows: false,
            getRowId: (row: any) => _.get(row, rowId)
        },
        useFilters,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            if (disableCheckbox) return;
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

    const onClear = () => setAllFilters([]);

    const handleDeselectAllRow = (flag: boolean) => {
        if (flag) {
            toggleAllPageRowsSelected(false);
        }
    };

    useImperativeHandle(refFETable, () => ({
        setFilter
    }));

    React.useEffect(() => {
        eventEmitter.addListener('DESELECT_ALL_ROWS', handleDeselectAllRow);
    }, []);

    React.useEffect(() => {
        dispatch({ type: 'PAGE_SIZE_CHANGED', payload: pageSize });
    }, [pageSize]);

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
            dispatch({ type: 'PAGE_CHANGED', payload: 0 });
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
                Empty Data
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
                                        sx={{ padding: 0.5, minWidth: column.minWidth, textAlign: 'left' }}
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

                    {showCustomFilter && (
                        <TableHead>
                            {headerGroups.map((headerGroup) => (
                                <TableRow {...headerGroup.getHeaderGroupProps()} sx={{ textAlign: 'center' }}>
                                    {headerGroup.headers.map((column) => {
                                        if (column.id === 'selection')
                                            return (
                                                <TableCell {...column.getHeaderProps()} onClick={onClear}>
                                                    <Typography sx={{ cursor: 'pointer' }}>Clear</Typography>
                                                </TableCell>
                                            );
                                        return (
                                            <TableCell {...column.getHeaderProps()} sx={{ px: 1 }}>
                                                {column.canFilter ? column.render('Filter') : null}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHead>
                    )}

                    <TableBody {...getTableBodyProps()}>
                        {!Boolean(data.length) && renderNotfound()}

                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <TableRow
                                    hover
                                    {...row.getRowProps()}
                                    onClick={() => onClickRowItem?.(row)}
                                    sx={{
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: `rgba(0, 131, 69, 0.05) !important`
                                        }
                                    }}
                                >
                                    {row.cells.map((cell) => {
                                        return (
                                            <TableCell {...cell.getCellProps()} sx={{ padding: 0.5, wordBreak: 'break-all' }}>
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
                rowsPerPageOptions={[10, 20, 50]}
                count={pageOptions.length}
                rowsPerPage={queryPageSize}
                page={queryPageIndex}
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
            />
        </>
    );
});

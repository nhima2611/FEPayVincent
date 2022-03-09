// material-ui
import {
    Box,
    Checkbox,
    IconButton,
    OutlinedInput,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { IconChevronDown, IconFilter } from '@tabler/icons';
import { map } from 'lodash';
import React, { useEffect, useState } from 'react';
import { ArrangementOrder, EnhancedTableHeadProps, GetComparator, KeyedObject } from 'types';
import eventEmitter from 'utils/eventEmitter';

// table filter
function descendingComparator(a: KeyedObject, b: KeyedObject, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator: GetComparator = (order, orderBy) =>
    order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array: any[], comparator: (a: KeyedObject, b: KeyedObject) => number) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0] as any, b[0] as any);
        if (order !== 0) return order;
        return (a[1] as number) - (b[1] as number);
    });
    return stabilizedThis.map((el) => el[0]);
}

interface Props {
    headCells: any[];
    rows: any[];
    onClickRowItem: (row: any) => void;
    onDataFilter: (data: any) => void;
}

const FETable = ({ headCells, rows, onClickRowItem, onDataFilter }: Props) => {
    const [order, setOrder] = React.useState<ArrangementOrder>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('calories');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    useEffect(() => {
        eventEmitter.emit('HAS_SELECTED', { isSelected: Boolean(selected.length) });
    }, [selected]);

    const handleRequestSort = (event: React.SyntheticEvent, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelectedId: string[] = rows.map((n) => n.id);
            setSelected(newSelectedId);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: any, name: string) => {
        event.stopPropagation();
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
        setRowsPerPage(parseInt(event?.target.value!, 10));
        setPage(0);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <div>
            <EnhancedTableToolbar numSelected={selected.length} />

            {/* table */}
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                    <EnhancedTableHead
                        headCells={headCells}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />

                    <EnhancedFilterTableHead headCells={headCells} onDataFilter={onDataFilter} />

                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                /** Make sure no display bugs if row isn't an OrderData object */
                                if (typeof row === 'number') return null;
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        onClick={() => onClickRowItem(row)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ textDecoration: 'none', cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox" onClick={(event: any) => handleClick(event, row.id)}>
                                            <Checkbox
                                                size="small"
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        {map(row, (item: any, i: number) => {
                                            const color = item === 'New' ? 'red' : item === 'On-Hold' ? 'green' : '';
                                            return (
                                                <TableCell sx={{ ...styles.cellText, color }} key={i}>
                                                    {item}
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
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* table data */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default FETable;

const styles = {
    cellText: {
        fontSize: 10,
        width: 50
    }
};

const InputItem = ({ onDataChange, headCell }) => {
    const [input, setInput] = useState<string>('');

    React.useEffect(() => {
        if (!input.length) return;
        onDataChange?.({ [headCell.id]: input });
    }, [input]);

    return (
        <TableCell>
            <OutlinedInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                sx={{ height: 28, fontSize: 10, borderRadius: 8 }}
                placeholder="input"
            />
        </TableCell>
    );
};

const EnhancedFilterTableHead = ({ headCells, onDataFilter }: { headCells: any[]; onDataFilter: (data: any) => void }) => {
    const [data, setData] = useState({});
    const onDataChange = (input: any) => setData({ ...data, ...input });
    const onClickFilter = () => onDataFilter?.(data);

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <IconButton onClick={onClickFilter}>
                        <IconFilter color="#008345" />
                    </IconButton>
                </TableCell>
                {headCells.map((headCell) => {
                    return <InputItem headCell={headCell} onDataChange={onDataChange} key={headCell.id} />;
                })}
            </TableRow>
        </TableHead>
    );
};

// ==============================|| TABLE - HEADER TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected }: { numSelected: number }) => (
    <Toolbar
        sx={{
            p: 0,
            pl: 1,
            pr: 1,
            ...(numSelected > 0 && {
                color: (theme) => theme.palette.secondary.main
            })
        }}
    >
        <Typography variant="h6" id="tableTitle">
            My Ticket List - {numSelected} Selected
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        {/* {numSelected > 0 && (
            <Tooltip title="Delete">
                <IconButton size="large">
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        )} */}
    </Toolbar>
);

// ==============================|| TABLE - HEADER ||============================== //

interface TableDataEnhancedTableHead extends EnhancedTableHeadProps {
    headCells: any[];
}

function EnhancedTableHead({
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells
}: TableDataEnhancedTableHead) {
    const createSortHandler = (property: string) => (event: React.SyntheticEvent) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        size="small"
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align="center"
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            IconComponent={IconChevronDown}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

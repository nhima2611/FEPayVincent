// assets
import DeleteIcon from '@mui/icons-material/Delete';
// material-ui
import { useDispatch } from 'react-redux';
import { setMode } from 'store/slices/kanban';

import {
    Box,
    Checkbox,
    IconButton,
    Pagination,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import usePagination from 'hooks/usePagination';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ArrangementOrder, EnhancedTableHeadProps, GetComparator, HeadCell, KeyedObject } from 'types';
import { WaitingListItem } from 'types/repaymentcontrol';
import WaitingListActions from './WaitingListActions';

// table data
type CreateDataType = {
    name: number;
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
};
function createData(
    id: string,
    partner: string,
    subpartner: string,
    pos: string,
    description: string,
    product: string,
    tranx_limit: number,
    daily_limit: number,
    monthly_limit?: number,
    duration?: string
) {
    return {
        id,
        partner,
        subpartner,
        pos,
        description,
        product,
        tranx_limit,
        daily_limit,
        monthly_limit,
        duration
    };
}

const rows: WaitingListItem[] = [
    createData(
        '123-01',
        'SMARTNET',
        'SMARTNET',
        'All Pos',
        '560',
        'All Product',
        50000000,
        350000000,
        10235000000,
        '01/01/2021-31/12/2021'
    ),
    createData(
        '123-01',
        'SMARTNET',
        'SMARTNET',
        'All Pos',
        '560',
        'All Product',
        50000000,
        350000000,
        10235000000,
        '01/01/2021-31/12/2021'
    ),
    createData(
        '123-01',
        'SMARTNET',
        'SMARTNET',
        'All Pos',
        '560',
        'All Product',
        50000000,
        350000000,
        10235000000,
        '01/01/2021-31/12/2021'
    ),
    createData(
        '123-01',
        'SMARTNET',
        'SMARTNET',
        'All Pos',
        '560',
        'All Product',
        50000000,
        350000000,
        10235000000,
        '01/01/2021-31/12/2021'
    ),
    createData(
        '123-01',
        'SMARTNET',
        'SMARTNET',
        'All Pos',
        '560',
        'All Product',
        50000000,
        350000000,
        10235000000,
        '01/01/2021-31/12/2021'
    ),
    createData(
        '123-01',
        'SMARTNET',
        'SMARTNET',
        'All Pos',
        '560',
        'All Product',
        50000000,
        350000000,
        10235000000,
        '01/01/2021-31/12/2021'
    ),
    createData('123-01', 'SMARTNET', 'SMARTNET', 'All Pos', '560', 'All Product', 50000000, 350000000, 10235000000, '01/01/2021-31/12/2021')
];

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

function stableSort(array: WaitingListItem[], comparator: (a: KeyedObject, b: KeyedObject) => number) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0] as WaitingListItem, b[0] as WaitingListItem);
        if (order !== 0) return order;
        return (a[1] as number) - (b[1] as number);
    });
    return stabilizedThis.map((el) => el[0]);
}

// table header
const headCells: HeadCell[] = [
    {
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: '#'
    },
    {
        id: 'partner',
        numeric: false,
        disablePadding: false,
        label: 'Partner'
    },
    {
        id: 'subpartner',
        numeric: false,
        disablePadding: false,
        label: 'subpartner'
    },
    {
        id: 'pos',
        numeric: false,
        disablePadding: false,
        label: 'POS#'
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Description'
    },
    {
        id: 'product',
        numeric: false,
        disablePadding: false,
        label: 'Product'
    },
    {
        id: 'tranx_limit',
        numeric: true,
        disablePadding: false,
        label: 'Tranx Limit'
    },
    {
        id: 'daily_limit',
        numeric: true,
        disablePadding: false,
        label: 'Daily Limit'
    },
    {
        id: 'monthly_limit',
        numeric: true,
        disablePadding: false,
        label: 'Monthly Limit'
    },
    {
        id: 'duration',
        numeric: false,
        disablePadding: false,
        label: 'Duration'
    }
];

// ==============================|| TABLE - HEADER ||============================== //

interface TableDataEnhancedTableHead extends EnhancedTableHeadProps {}

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }: TableDataEnhancedTableHead) {
    const createSortHandler = (property: string) => (event: React.SyntheticEvent) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" sx={{ pl: 3 }}>
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
            Waiting List - {numSelected} Selected
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        {numSelected > 0 && (
            <Tooltip title="Delete">
                <IconButton size="large">
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        )}
    </Toolbar>
);

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function WaitingList() {
    const [order, setOrder] = React.useState<ArrangementOrder>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('calories');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(1);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const dispatch = useDispatch();
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

    const handleClick = (event: React.MouseEvent<HTMLTableRowElement> | undefined, name: string) => {
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

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
        dd.jump(newPage);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, page * 3 - rows.length) : 0;
    const PER_PAGE = 3;
    const count = Math.ceil(rows.length / PER_PAGE);
    const dd = usePagination(rows, PER_PAGE);

    return (
        <div>
            <WaitingListActions onClickTransfer={() => dispatch(setMode())} urlAddTicket="/tickets/create-ticket" />
            <EnhancedTableToolbar numSelected={selected.length} />

            {/* table */}
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {stableSort(dd.currentData(), getComparator(order, orderBy)).map((row, index) => {
                            /** Make sure no display bugs if row isn't an OrderData object */
                            if (typeof row === 'number') return null;
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                <TableRow
                                    hover
                                    component={Link}
                                    to={`/tickets/${row.id}`}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                    selected={isItemSelected}
                                    sx={{ textDecoration: 'none' }}
                                >
                                    <TableCell padding="checkbox" sx={{ pl: 3 }} onClick={(event: any) => handleClick(event, row.id)}>
                                        <Checkbox
                                            size="small"
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="left">
                                        {row.id}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="left">
                                        {row.partner}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="left">
                                        {row.subpartner}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="left">
                                        {row.pos}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="left">
                                        {row.description}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.product}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.tranx_limit}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.daily_limit}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.monthly_limit}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.duration}
                                    </TableCell>
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
            <Stack sx={{ alignItems: 'center', mt: 2 }}>
                <Pagination count={count} color="primary" page={page} onChange={handleChangePage} />
            </Stack>
        </div>
    );
}

const styles = {
    cellText: {
        fontSize: 10
    }
};

import * as React from 'react';

// material-ui
import {
    Box,
    Checkbox,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableSortLabel,
    TableRow,
    Toolbar,
    Tooltip,
    Typography,
    Pagination,
    Grid,
    Stack
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { KeyedObject, ArrangementOrder, EnhancedTableHeadProps, GetComparator, HeadCell } from 'types';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import usePagination from 'hooks/usePagination';
import { Link } from 'react-router-dom';
import { ListLimitation } from './Limititation';
import ActionLimitation from './action-limit';
import { dispatch } from 'store';
import { setMode } from 'store/slices/kanban';

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
    partnerID: any,
    subPartnerID: any,
    posName: any,
    ward: any,
    district: any,
    province: string,
    upperLevel: string,
    activeLimitation: string,
    deadline: any
) {
    return {
        id,
        partnerID,
        subPartnerID,
        posName,
        ward,
        district,
        province,
        upperLevel,
        activeLimitation,
        deadline
    };
}

const rows: ListLimitation[] = [
    createData(
        '1',
        '12345',
        '12345',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '2',
        '12345',
        '12345',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '3',
        '12345',
        '12345',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '4',
        '12345',
        '12345',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '5',
        '12345',
        '12345',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '6',
        '12345',
        '12345',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '7',
        '12345',
        '12345',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '8',
        '123422225',
        '12345',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '9',
        '123453333',
        '12345',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    )
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

function stableSort(array: ListLimitation[], comparator: (a: KeyedObject, b: KeyedObject) => number) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0] as ListLimitation, b[0] as ListLimitation);
        if (order !== 0) return order;
        return (a[1] as number) - (b[1] as number);
    });
    return stabilizedThis.map((el) => el[0]);
}

// table header
const headCells: HeadCell[] = [
    {
        id: 'partnerID',
        numeric: false,
        disablePadding: true,
        label: 'Partner ID'
    },
    {
        id: 'subPartnerID',
        numeric: true,
        disablePadding: false,
        label: 'Sub-Partner ID'
    },
    {
        id: 'posName',
        numeric: true,
        disablePadding: false,
        label: 'POS name'
    },
    {
        id: 'ward',
        numeric: true,
        disablePadding: false,
        label: 'Ward'
    },
    {
        id: 'district',
        numeric: true,
        disablePadding: false,
        label: 'District'
    },
    {
        id: 'province',
        numeric: true,
        disablePadding: false,
        label: 'Province'
    },
    {
        id: 'upperLevel',
        numeric: true,
        disablePadding: false,
        label: 'Upper Level'
    },
    {
        id: 'activeLimitation',
        numeric: true,
        disablePadding: false,
        label: 'Active Limitation'
    },
    {
        id: 'deadline',
        numeric: true,
        disablePadding: false,
        label: 'Deadline'
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
            POS List - {numSelected} Selected
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

export default function UserList() {
    const [order, setOrder] = React.useState<ArrangementOrder>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('calories');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(1);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
        <div style={{ marginTop: '70px' }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <ActionLimitation onClickTransfer={() => dispatch(setMode())} urlAddTicket="/tickets/create-ticket" />
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

                                    <TableCell sx={styles.cellText} align="center">
                                        {row.partnerID}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.subPartnerID}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.posName}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.ward}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.district}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.province}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.upperLevel}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.activeLimitation}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.deadline}
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

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
import { KanbanItem } from 'types/kanban';
import { Link } from 'react-router-dom';

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
    ticketID: number,
    contractID: number,
    refID: number,
    createdDate: any,
    modifiedDate: any,
    status: any,
    partner: string,
    assignee?: string,
    supporter?: string,
    transactionType?: 'Repayment' | 'Disbursement',
    issueType?: 'Cancel transaction' | 'Adjust Amount' | 'Adjust Contract Number' | 'System Issue',
    productType?: 'Loan' | 'Card' | 'Banca',
    requestedBy?: string
) {
    return {
        id,
        ticketID,
        contractID,
        refID,
        createdDate,
        modifiedDate,
        status,
        partner,
        assignee,
        supporter,
        transactionType,
        issueType,
        productType,
        requestedBy
    };
}

const rows: KanbanItem[] = [
    createData(
        '1',
        12345,
        12345,
        12345,
        '25/2/2022',
        '27/2/2022',
        'New',
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
        12345,
        12345,
        12345,
        '25/2/2022',
        '27/2/2022',
        'New',
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
        12345,
        12345,
        12345,
        '25/2/2022',
        '27/2/2022',
        'New',
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
        12345,
        12345,
        12345,
        '25/2/2022',
        '27/2/2022',
        'New',
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
        12345,
        12345,
        12345,
        '25/2/2022',
        '27/2/2022',
        'New',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '11',
        12345,
        12345,
        12345,
        '25/2/2022',
        '27/2/2022',
        'New',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '22',
        12345,
        12345,
        12345,
        '25/2/2022',
        '27/2/2022',
        'New',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '33',
        12345,
        12345,
        12345,
        '25/2/2022',
        '27/2/2022',
        'New',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '44',
        12345,
        12345,
        12345,
        '25/2/2022',
        '27/2/2022',
        'New',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '55',
        12345,
        12345,
        12345,
        '25/2/2022',
        '27/2/2022',
        'New',
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

function stableSort(array: KanbanItem[], comparator: (a: KeyedObject, b: KeyedObject) => number) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0] as KanbanItem, b[0] as KanbanItem);
        if (order !== 0) return order;
        return (a[1] as number) - (b[1] as number);
    });
    return stabilizedThis.map((el) => el[0]);
}

// table header
const headCells: HeadCell[] = [
    {
        id: 'ticketID',
        numeric: false,
        disablePadding: true,
        label: 'Ticket ID'
    },
    {
        id: 'contractID',
        numeric: true,
        disablePadding: false,
        label: 'Contract ID'
    },
    {
        id: 'ref',
        numeric: true,
        disablePadding: false,
        label: 'Ref#'
    },
    {
        id: 'createdDate',
        numeric: true,
        disablePadding: false,
        label: 'Created Date'
    },
    {
        id: 'ModifiedDate',
        numeric: true,
        disablePadding: false,
        label: 'Modified Date'
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Status'
    },
    {
        id: 'Partner',
        numeric: true,
        disablePadding: false,
        label: 'Partner'
    },
    {
        id: 'Assignee',
        numeric: true,
        disablePadding: false,
        label: 'Assignee'
    },
    {
        id: 'Supporter',
        numeric: true,
        disablePadding: false,
        label: 'Supporter'
    },
    {
        id: 'TransactionType',
        numeric: true,
        disablePadding: false,
        label: 'Transaction Type'
    },
    {
        id: 'IssueType',
        numeric: true,
        disablePadding: false,
        label: 'Issue Type'
    },
    {
        id: 'ProductType',
        numeric: true,
        disablePadding: false,
        label: 'Product Type'
    },
    {
        id: 'RequestedBy',
        numeric: true,
        disablePadding: false,
        label: 'Requested By'
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
        <div>
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
                                        {row.contractID}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="left">
                                        {row.refID}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.createdDate}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.modifiedDate}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.status}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.partner}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.assignee}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.supporter}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.transactionType}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.issueType}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.productType}
                                    </TableCell>
                                    <TableCell sx={styles.cellText} align="center">
                                        {row.requestedBy}
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

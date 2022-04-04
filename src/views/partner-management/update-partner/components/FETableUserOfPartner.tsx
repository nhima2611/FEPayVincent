import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button, Menu, MenuItem } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import userService from 'services/api-services/user.service';
import toastService from 'services/core/toast.service';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    renderCell?: (value) => React.ReactNode;
}

const columns: readonly Column[] = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'fullname', label: 'Name', minWidth: 170 },
    {
        id: 'phone',
        label: 'Phone'
    },
    {
        id: 'email',
        label: 'Email'
    },
    {
        id: 'created_at',
        label: 'Created on',
        renderCell: (value) => <>{moment(value?.created_at).format('HH:mm DD/MM/yyyy')}</>
    },
    { id: 'approved_by', label: 'Approved by' },
    {
        id: 'role',
        label: 'User Title',
        minWidth: 100
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 100,
        renderCell: (row) => <ButtonStatus row={row} />
    }
];
function ButtonStatus({ row }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeStatus = () => {
        const payload = row;
        payload.status = row.status === 1 ? 0 : 1;
        userService
            .updatePut(payload)
            .then((res) => {
                toastService.toast('success', 'Changed Status User');
                handleClose();
            })
            .catch((err) => {
                toastService.toast(
                    'error',
                    `${err?.message} ${_.map(err.details, (item) => {
                        return `\n<i> - ${item}</i>`;
                    })}` || 'Something went error !'
                );
            });
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="contained"
                color={row?.status === 1 ? 'primary' : 'error'}
                size="small"
                endIcon={<ArrowDropDownIcon />}
            >
                {row?.status === 1 ? 'Active' : 'Deactive'}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                <MenuItem onClick={(e) => handleChangeStatus()}>{row?.status === 1 ? 'Deactive' : 'Active'}</MenuItem>
            </Menu>
        </div>
    );
}

export default function FETableUserOfPartner({ rows }: { rows: any[] }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.renderCell ? column.renderCell?.(row) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

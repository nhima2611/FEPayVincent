import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    renderCell?: (value) => React.ReactNode;
}

const columns: readonly Column[] = [
    { id: 'id', label: 'No', minWidth: 50 },
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
        renderCell: (value) => <>{moment(value).format('HH:mm DD/MM/yyyy')}</>
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
        renderCell: (value) => (
            <Button variant="outlined" size="small">
                Active
            </Button>
        )
    }
];
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
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.renderCell ? column.renderCell?.(value) : value}
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

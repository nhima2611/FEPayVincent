import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { useMutation } from 'react-query';
import ticketsServices from 'services/tickets-services';
import { AddDescriptionModel } from 'types/ticket';
import eventEmitter from 'utils/eventEmitter';
import toastify from 'utils/toastify';

function createData(content: string, updatedByUsers: string, updatedByRole: string, timestamp: Date) {
    return {
        content,
        updatedByUsers,
        updatedByRole,
        timestamp
    };
}

const FEDescriptionDetail = ({ data = [], ticketId }: { data: any[]; ticketId: number }) => {
    const [value, setValue] = useState<string>('');
    const { user } = useAuth();

    const mAddDescription = useMutation((model: AddDescriptionModel) => ticketsServices.addDescription(model), {
        onSuccess: () => {
            eventEmitter.emit('ADD_DESCRIPTION_SUCCESS', true);
            setValue('');
            toastify.showToast('success', 'Add Description Success!');
        },
        onError: (err: any) => {
            toastify.showToast('error', err.message);
        }
    });

    const handleOnSend = (e) => {
        e.preventDefault();
        if (!Boolean(value.length)) return;
        const d: AddDescriptionModel = {
            ticket_id: ticketId,
            user_id: user?.id,
            fullname: user?.fullname,
            content: value
        };

        mAddDescription.mutate(d);
    };
    return (
        <form onSubmit={handleOnSend}>
            <Stack spacing={1} direction="row">
                <Typography sx={{ color: '#333333', fontWeight: 'bold' }}>Description: </Typography>
            </Stack>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Content</TableCell>
                            <TableCell align="left">Updated by Users</TableCell>
                            <TableCell align="left">Updated by Role</TableCell>
                            <TableCell align="left">Timestamp</TableCell>
                        </TableRow>
                    </TableHead>
                    {Boolean(!data.length) && <caption style={{ textAlign: 'center' }}>Empty data</caption>}
                    <TableBody>
                        {data.map((row: any, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left">
                                    <div style={{ maxWidth: 200, overflow: 'hidden' }}>{row.content}</div>
                                </TableCell>
                                <TableCell align="left">{row?.fullname}</TableCell>
                                <TableCell align="left">{row?.user?.role}</TableCell>
                                <TableCell align="left">{moment(row?.created_at).format('DD/MM/YYYY - HH:mm a')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TextField
                sx={{ marginTop: 2 }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                fullWidth
                rows={4}
                placeholder="Enter Description"
            />
        </form>
    );
};

export default FEDescriptionDetail;

const styles = {
    cellText: {
        fontSize: 10,
        fontWeight: 600,
        color: '#333333'
    }
};

import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useState } from 'react';

function createData(content: string, updatedByUsers: string, updatedByRole: string, timestamp: Date) {
    return {
        content,
        updatedByUsers,
        updatedByRole,
        timestamp
    };
}

const rows = [
    // createData(
    //     'Lorem Ipsum de Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ...Show less, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ...Show lesslotee ipsum de lotee tan ipsum de tan binlen, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ...Show less',
    //     'Tran',
    //     'Admin',
    //     new Date()
    // )
];
const FEDescriptionDetail = () => {
    const [value, setValue] = useState<string>('');
    const [data, setData] = useState<any[]>(rows);

    const handleOnSend = (e) => {
        e.preventDefault();
        if (!Boolean(value.length)) return;
        const d = new Date();
        setValue('');
        const newMessage = createData(value, 'Tran', 'Admin', d);
        setData((prevState) => [newMessage, ...prevState]);
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
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row" sx={styles.cellText}>
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left" sx={styles.cellText}>
                                    {row.content}
                                </TableCell>
                                <TableCell align="left" sx={styles.cellText}>
                                    {row.updatedByUsers}
                                </TableCell>
                                <TableCell align="left" sx={styles.cellText}>
                                    {row.updatedByRole}
                                </TableCell>
                                <TableCell align="left" sx={styles.cellText}>
                                    {moment(row.timestamp).format('DD/MM/YYYY - HH:mm a')}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TextField value={value} onChange={(e) => setValue(e.target.value)} fullWidth rows={4} placeholder="Enter Description" />
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

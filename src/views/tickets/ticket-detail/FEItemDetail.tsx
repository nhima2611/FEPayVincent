import { Stack, Typography } from '@mui/material';

const FEItemDetail = ({ title, value }) => {
    return (
        <Stack direction="row" justifyContent="space-between" sx={{ marginY: 3 }}>
            <Typography sx={{ fontWeight: 'bold', color: '#4c4c4c' }}>{`${title}:`}</Typography>
            <Typography sx={{ color: '#4c4c4c' }}>{value}</Typography>
        </Stack>
    );
};

export default FEItemDetail;

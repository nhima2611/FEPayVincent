import { Box, Grid, styled, Typography } from '@mui/material';

const BoxStyle = styled(Box)({
    backgroundImage: `url(
        "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='14' ry='14' stroke='%23CCCCCCFF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e"
        )`,
    borderRadius: 14
});

const FEAttachmentsList = ({ data = [] }: { data: any[] }) => {
    const onClickItem = (item: any) => {
        return window.open(item.path, '_blank', 'noopener,noreferrer');
    };

    return (
        <Box sx={{ paddingBottom: 2 }}>
            <Grid container spacing={2}>
                {_.map(data, (item, index) => (
                    <Grid key={index} item xs={12} sm={4} md={3}>
                        <BoxStyle
                            onClick={() => onClickItem(item)}
                            sx={{ padding: 3, backgroundColor: 'rgba(39, 174, 96, .15)', cursor: 'pointer' }}
                        >
                            <Typography sx={{ maxWidth: 400, overflow: 'hidden' }}>{item.name}</Typography>
                        </BoxStyle>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FEAttachmentsList;

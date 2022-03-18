// material-ui
// assets
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import RectangleRoundedIcon from '@mui/icons-material/RectangleRounded';
import { Box, ButtonBase, Grid, IconButton, Menu, MenuItem, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
// third party
import Chart, { Props as ChartProps } from 'react-apexcharts';
// project imports
import MainCard from 'ui-component/cards/MainCard';

// ===========================|| REVENUE CHART CARD ||=========================== //

const RevenueChartCardRed = ({ chartData }: { chartData: ChartProps }) => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

    const blockSXWarning = {
        p: 1,
        border: 1,
        borderColor: 'error.main'
    };

    const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
        setAnchorEl(event?.currentTarget);
    };

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setAnchorEl(null);
    };

    const iconSXWarning = {
        fontSize: '0.875rem',
        marginRight: 0.2,
        verticalAlign: 'sub',
        color: 'error.main'
    };

    const iconSXOrange = {
        fontSize: '0.875rem',
        marginRight: 0.2,
        verticalAlign: 'sub',
        color: '#F2994A'
    };

    return (
        <MainCard sx={blockSXWarning}>
            <Grid container spacing={2} direction={matchDownMd && !matchDownXs ? 'row' : 'column'}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h3" color="error.main">
                            VIETTEL
                        </Typography>
                    </Grid>
                    <Grid item>
                        123-01
                        <ButtonBase
                            className="more-button"
                            sx={{ borderRadius: '12px' }}
                            onClick={handleClick}
                            aria-controls="menu-comment"
                            aria-haspopup="true"
                        >
                            <IconButton component="span" size="small" disableRipple>
                                <MoreVertTwoToneIcon fontSize="inherit" />
                            </IconButton>
                        </ButtonBase>
                        <Menu
                            id="menu-comment"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            variant="selectedMenu"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    // handlerDetails();
                                }}
                            >
                                Edit
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    setOpen(true);
                                }}
                            >
                                Delete
                            </MenuItem>
                        </Menu>
                        {/* <Menu
                            id="menu-popular-card"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            variant="selectedMenu"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                        >
                            <MenuItem onClick={handleClose}> Today</MenuItem>
                            <MenuItem onClick={handleClose}> This Month</MenuItem>
                            <MenuItem onClick={handleClose}> This Year </MenuItem>
                        </Menu> */}
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={7} md={12}>
                    <Chart {...chartData} />
                </Grid>
                {/* <Box sx={{ display: { xs: 'none', sm: 'block', md: 'none' } }}>
                    <Grid item>
                        <Divider />
                    </Grid>
                </Box> */}
                <Grid item container justifyContent="space-around" alignItems="center" xs={12} sm={5} md={12}>
                    <Grid item sm={6}>
                        <Grid container direction="column">
                            <Typography variant="h6">
                                <RectangleRoundedIcon sx={iconSXWarning} />
                                Daily Limit
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={6}>
                        <Grid container direction="column">
                            <Typography variant="h6" align="right">
                                75%
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={12}>
                        <Grid container direction="column">
                            <Box sx={{ color: theme.palette.primary.main }}>
                                <Typography variant="h4" align="right" style={{ color: theme.palette.error.main }}>
                                    $263,040,000
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container justifyContent="space-around" alignItems="center" xs={12} sm={5} md={12}>
                    <Grid item sm={6}>
                        <Grid container direction="column">
                            <Typography variant="h6">
                                <RectangleRoundedIcon sx={iconSXOrange} /> Monthly Limit
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={6}>
                        <Grid container direction="column">
                            <Typography variant="h6" align="right">
                                25%
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={12}>
                        <Grid container direction="column">
                            <Box sx={{ color: theme.palette.primary.main }}>
                                <Typography variant="h4" align="right" color="inherit" style={{ color: '#F2994A' }}>
                                    $263,040,000
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container justifyContent="space-around" alignItems="center" xs={12} sm={5} md={12}>
                    <Grid item sm={6}>
                        <Grid container direction="column">
                            <Typography variant="h6">Successfull:</Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={6}>
                        <Grid container direction="column">
                            <Typography variant="h6" align="right">
                                768,148
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container justifyContent="space-around" alignItems="center" xs={12} sm={5} md={12}>
                    <Grid item sm={6}>
                        <Grid container direction="column">
                            <Typography variant="h6">Failed:</Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={6}>
                        <Grid container direction="column">
                            <Typography variant="h6" align="right">
                                154
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default RevenueChartCardRed;

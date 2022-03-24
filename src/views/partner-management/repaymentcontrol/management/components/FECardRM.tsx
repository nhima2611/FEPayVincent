// material-ui
// assets
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import RectangleRoundedIcon from '@mui/icons-material/RectangleRounded';
import { Box, ButtonBase, Grid, IconButton, Menu, MenuItem, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import FEChartRM from './FEChartRM';
import AnimatedNumber from 'animated-number-react';
import numeral from 'numeral';

const FECardRM = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

    const blockSXBlue = {
        p: 1,
        border: 1,
        borderColor: '#E5E5E5'
    };

    const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
        setAnchorEl(event?.currentTarget);
    };

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setAnchorEl(null);
    };

    const iconSXBlue = {
        fontSize: '0.875rem',
        marginRight: 0.2,
        verticalAlign: 'sub',
        color: '#2F80ED'
    };

    const iconSXPurple = {
        fontSize: '0.875rem',
        marginRight: 0.2,
        verticalAlign: 'sub',
        color: '#BB6BD9'
    };

    return (
        <MainCard sx={blockSXBlue}>
            <Grid container spacing={2} direction={matchDownMd && !matchDownXs ? 'row' : 'column'}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h3" color="error.main">
                            SMARTNET
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
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={7} md={12}>
                    {/* <Chart {...chartData} /> */}
                    <FEChartRM />
                </Grid>
                <Grid item container justifyContent="space-around" alignItems="center" xs={12} sm={5} md={12}>
                    <Grid item sm={6}>
                        <Grid container direction="column">
                            <Typography variant="h6">
                                <RectangleRoundedIcon sx={iconSXBlue} />
                                Daily Limit
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={6}>
                        <Grid container direction="column">
                            <Typography variant="h6" align="right">
                                Total: $
                                <AnimatedNumber
                                    value={Math.floor(Math.random() * 900000)}
                                    formatValue={(res) => numeral(res).format('0,0')}
                                    duration={500}
                                />
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={12}>
                        <Grid container direction="column">
                            <Box sx={{ color: theme.palette.primary.main }}>
                                <Typography variant="h4" align="right" style={{ color: '#3D83EA' }}>
                                    $
                                    <AnimatedNumber
                                        value={Math.floor(Math.random() * 900000000)}
                                        formatValue={(res) => numeral(res).format('0,0')}
                                        duration={500}
                                    />
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container justifyContent="space-around" alignItems="center" xs={12} sm={5} md={12}>
                    <Grid item sm={6}>
                        <Grid container direction="column">
                            <Typography variant="h6">
                                <RectangleRoundedIcon sx={iconSXPurple} /> Monthly Limit
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={6}>
                        <Grid container direction="column">
                            <Typography variant="h6" align="right">
                                Total: $
                                <AnimatedNumber
                                    value={Math.floor(Math.random() * 900000)}
                                    formatValue={(res) => numeral(res).format('0,0')}
                                    duration={500}
                                />
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={12}>
                        <Grid container direction="column">
                            <Box sx={{ color: theme.palette.primary.main }}>
                                <Typography variant="h4" align="right" color="inherit" style={{ color: '#285598' }}>
                                    $
                                    <AnimatedNumber
                                        value={Math.floor(Math.random() * 900000000)}
                                        formatValue={(res) => numeral(res).format('0,0')}
                                        duration={500}
                                    />
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

export default FECardRM;

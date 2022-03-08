import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { CardContent, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import RepaymentChart from './RepaymentChart';
import RepaymentStatistic from './RepaymentStatistic';

interface Props {
    data?: any[];
    dataType?: any[];
    title?: string | any;
}

const RepaymentControl = ({ data = [], dataType = [], title = 'xx' }: Props) => {
    const theme = useTheme();
    const xx = React.useMemo(() => ['July', 'August', 'September', 'October', 'November', 'December'], []);

    const [anchorEl, setAnchorEl] = React.useState<Element | ((element: Element) => Element) | null | undefined>(null);

    const handleClick = React.useCallback(
        (event: React.SyntheticEvent) => {
            setAnchorEl(event.currentTarget);
        },
        [anchorEl]
    );

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <MainCard
            content={false}
            boxShadow
            shadow="0px 4px 4px rgba(0, 0, 0, 0.05)"
            sx={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
                border: '1px solid #E5E5E5 !important'
            }}
        >
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container alignContent="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h4">{title}</Typography>
                            </Grid>
                            <Grid item>
                                <MoreVertOutlinedIcon
                                    fontSize="small"
                                    sx={{
                                        color: theme.palette.primary[200],
                                        cursor: 'pointer'
                                    }}
                                    aria-controls="menu-popular-card"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                />
                                <Menu
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
                                </Menu>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <RepaymentChart
                            labels={xx}
                            series={[
                                {
                                    name: 'Cash',
                                    color: '#27ae60cc',
                                    data: [
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000)
                                    ]
                                },
                                {
                                    name: 'E-Wallet',
                                    color: '#FF0015',
                                    data: [
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000)
                                    ]
                                },
                                {
                                    name: 'l2B/M2B',
                                    color: '#2F80ED',
                                    data: [
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000)
                                    ]
                                },
                                {
                                    name: 'ATM/CDM',
                                    color: '#2f80ed99',
                                    data: [
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000),
                                        Math.floor(Math.random() * 1000000)
                                    ]
                                }
                            ]}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <RepaymentStatistic />
                    </Grid>
                </Grid>
            </CardContent>
        </MainCard>
    );
};

export default React.memo(RepaymentControl);

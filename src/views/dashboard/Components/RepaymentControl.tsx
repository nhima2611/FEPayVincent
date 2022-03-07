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
        <MainCard content={false}>
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
                        <RepaymentChart dataType={xx} />
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

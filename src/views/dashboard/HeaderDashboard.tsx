import { Grid, Tab, Tabs, Typography } from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';
// project imports
import useConfig from 'hooks/useConfig';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`
    };
}

export default function HeaderDashboard({ onChangeTab }: { onChangeTab: (e, v) => void }) {
    const theme = useTheme();
    const { borderRadius } = useConfig();

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        onChangeTab(event, newValue);
    };

    return (
        <MainCard
            boxShadow
            shadow="0px 4px 4px rgba(0, 0, 0, 0.05)"
            sx={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
                border: '1px solid #E5E5E5 !important'
            }}
            contentSX={{ padding: '8px !important' }}
        >
            <Tabs
                value={value}
                onChange={handleChange}
                orientation="horizontal"
                variant="standard"
                sx={{
                    '& .MuiTabs-flexContainer': {
                        borderBottom: 'none'
                    },
                    '& button': {
                        borderRadius: `${borderRadius}px`,
                        color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[600],
                        minHeight: 'auto',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        textAlign: 'center',
                        justifyContent: 'flex-start'
                    },
                    '& button.Mui-selected': {
                        color: theme.palette.primary.main,
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
                    },
                    '& button > svg': {
                        marginBottom: '0px !important',
                        marginRight: 1.25,
                        marginTop: 1.25,
                        height: 20,
                        width: 20
                    },
                    '& button > div > span': {
                        display: 'block'
                    },
                    '& > div > span': {
                        display: 'none'
                    }
                }}
            >
                <Tab
                    label={
                        <Grid container direction="column">
                            <Typography variant="subtitle1" color="inherit">
                                Daily
                            </Typography>
                        </Grid>
                    }
                    {...a11yProps(0)}
                />
                <Tab
                    label={
                        <Grid container direction="column">
                            <Typography variant="subtitle1" color="inherit">
                                Weekly
                            </Typography>
                        </Grid>
                    }
                    {...a11yProps(1)}
                />
                <Tab
                    label={
                        <Grid container direction="column">
                            <Typography variant="subtitle1" color="inherit">
                                Monthly
                            </Typography>
                        </Grid>
                    }
                    {...a11yProps(2)}
                />
            </Tabs>
        </MainCard>
    );
}

import { Box, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';
// project imports
import useConfig from 'hooks/useConfig';
import React from 'react';
import { gridSpacing } from 'store/constant';
import { TabsProps } from 'types';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import BodyDashboardDaily from './BodyDashboardDaily';

// tab content
function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`
    };
}

// ================================|| UI TABS - VERTICAL ||================================ //

export default function TabFilter() {
    const theme = useTheme();
    const { borderRadius } = useConfig();

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12} md={12}>
                    <MainCard contentSX={{ padding: '8px !important' }}>
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
                </Grid>
                <Grid item xs={12}>
                    <TabPanel value={value} index={0}>
                        <BodyDashboardDaily />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SubCard>
                            <Stack spacing={gridSpacing}>
                                <Typography variant="body2">
                                    3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                                    eiusmod.
                                </Typography>
                                <Typography>
                                    Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                                    shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                                    proident. Ad vegan excepteur butcher vice lomo.
                                </Typography>
                            </Stack>
                        </SubCard>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <SubCard>
                            <Stack spacing={gridSpacing}>
                                <Typography variant="body2">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                                    moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                </Typography>
                                <Typography>
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                                    moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                </Typography>
                            </Stack>
                        </SubCard>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <SubCard>
                            <Stack spacing={gridSpacing}>
                                <Typography variant="body2">
                                    3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                                    eiusmod.
                                </Typography>
                                <Typography>
                                    Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                                    shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                                    proident. Ad vegan excepteur butcher vice lomo.
                                </Typography>
                            </Stack>
                        </SubCard>
                    </TabPanel>
                </Grid>
            </Grid>
        </div>
    );
}

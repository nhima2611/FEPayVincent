import {
    Avatar,
    Badge,
    Chip,
    CircularProgress,
    ClickAwayListener,
    Divider,
    Grid,
    Link,
    Paper,
    Popper,
    Stack,
    Tab,
    Tabs,
    useMediaQuery
} from '@mui/material';
import Box from '@mui/material/Box';
// material-ui
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
// assets
import { IconBell } from '@tabler/icons';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useInfiniteQuery, useMutation } from 'react-query';
import notificationServices from 'services/notification-services';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import NotificationList from './NotificationList';

// ==============================|| NOTIFICATION ||============================== //

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const NotificationSection = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const [countNoti, setCountNoti] = useState(0);
    const anchorRef = useRef<any>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<HTMLDivElement> | MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const [tabValue, setTabValue] = useState(0);

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
        if (newValue === 0) qNotifications.refetch();
        if (newValue === 1) qNotificationUnreads.refetch();
    };
    const qNotificationUnreads = useInfiniteQuery(
        'qNotificationUnreads',
        ({ pageParam = 1 }) =>
            notificationServices.getAll(`page=${pageParam}&is_readed=0`).then((res) => {
                setCountNoti(_.get(res, 'data.meta.pagination.total'));
                return _.get(res, 'data');
            }),
        {
            getNextPageParam: (lastPage, pages) => {
                const currentPage: number = _.get(lastPage, 'meta.pagination.current_page');
                const totalPage: number = _.get(lastPage, 'meta.pagination.total_pages');
                if (currentPage === totalPage) return null;
                return currentPage + 1;
            }
        }
    );
    const qNotifications = useInfiniteQuery(
        'qNotifications',
        ({ pageParam = 1 }) =>
            notificationServices.getAll(`page=${pageParam}`).then((res) => {
                setCountNoti(_.get(res, 'data.meta.pagination.total'));
                return _.get(res, 'data');
            }),
        {
            getNextPageParam: (lastPage, pages) => {
                const currentPage: number = _.get(lastPage, 'meta.pagination.current_page');
                const totalPage: number = _.get(lastPage, 'meta.pagination.total_pages');

                if (currentPage === totalPage) return null;
                return currentPage + 1;
            }
        }
    );

    const mRead = useMutation((id: number | any) => notificationServices.updatePut({ id, is_readed: 1 }), {
        onSuccess: (data) => {
            if (tabValue === 0) qNotifications.refetch();
            if (tabValue === 1) qNotificationUnreads.refetch();
        },
        onError: (err: any) => {
            console.log(err);
        }
    });

    const mReadAll = useMutation(() => notificationServices.readAll(), {
        onSuccess: (data) => {
            if (tabValue === 0) qNotifications.refetch();
            if (tabValue === 1) qNotificationUnreads.refetch();
        },
        onError: (err: any) => {
            console.log(err);
        }
    });
    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    mr: 3,
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}
            >
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        transition: 'all .2s ease-in-out',
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                        color: theme.palette.mode === 'dark' ? theme.palette.warning.dark : theme.palette.secondary.dark,
                        '&[aria-controls="menu-list-grow"],&:hover': {
                            background: theme.palette.mode === 'dark' ? theme.palette.warning.dark : theme.palette.secondary.dark,
                            color: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.secondary.light
                        }
                    }}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    color="inherit"
                >
                    <Badge
                        color="error"
                        variant="dot"
                        invisible={
                            !_.some(_.flattenDeep(_.get(qNotifications, 'data.pages', []).map((item) => item.data)), ['is_readed', 0])
                        }
                    >
                        <IconBell stroke={1.5} size="1.3rem" />
                    </Badge>
                </Avatar>
            </Box>

            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                            <Paper>
                                {open && (
                                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item xs={12}>
                                                <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }}>
                                                    <Grid item>
                                                        <Stack direction="row" spacing={2}>
                                                            <Typography variant="subtitle1">Notification</Typography>
                                                            <Chip
                                                                size="small"
                                                                label={countNoti}
                                                                sx={{
                                                                    color: theme.palette.background.default,
                                                                    bgcolor: theme.palette.warning.dark
                                                                }}
                                                            />
                                                        </Stack>
                                                    </Grid>
                                                    <Grid item>
                                                        <Link
                                                            component="button"
                                                            variant="body2"
                                                            onClick={(e) => {
                                                                mReadAll.mutate();
                                                            }}
                                                        >
                                                            <Typography variant="subtitle2" color="primary">
                                                                Mark as all read
                                                            </Typography>
                                                        </Link>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container direction="column" spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Box sx={{ width: '100%' }}>
                                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                                <Tabs
                                                                    value={tabValue}
                                                                    onChange={handleChangeTab}
                                                                    aria-label="basic tabs example"
                                                                >
                                                                    <Tab label="All" {...a11yProps(0)} />
                                                                    <Tab label="Unread" {...a11yProps(1)} />
                                                                </Tabs>
                                                            </Box>
                                                            <PerfectScrollbar
                                                                style={{
                                                                    height: '100%',
                                                                    maxHeight: 'calc(100vh - 220px)',
                                                                    overflowX: 'hidden'
                                                                }}
                                                                onYReachEnd={(e) =>
                                                                    qNotifications.hasNextPage && tabValue === 0
                                                                        ? qNotifications.fetchNextPage()
                                                                        : {}
                                                                }
                                                            >
                                                                <TabPanel value={tabValue} index={0}>
                                                                    <NotificationList
                                                                        data={_.get(qNotifications, 'data.pages', [])}
                                                                        onClickItem={(item) => {
                                                                            !Boolean(item.is_readed) && mRead.mutate(item.id);
                                                                            console.log(item);
                                                                        }}
                                                                    />
                                                                    {Boolean(
                                                                        qNotifications.isFetching && !qNotifications.isFetchingNextPage
                                                                    ) && <CircularProgress />}
                                                                </TabPanel>
                                                            </PerfectScrollbar>
                                                            <PerfectScrollbar
                                                                style={{
                                                                    height: '100%',
                                                                    maxHeight: 'calc(100vh - 220px)',
                                                                    overflowX: 'hidden'
                                                                }}
                                                                onYReachEnd={(e) =>
                                                                    qNotificationUnreads.hasNextPage && tabValue === 1
                                                                        ? qNotificationUnreads.fetchNextPage()
                                                                        : {}
                                                                }
                                                            >
                                                                <TabPanel value={tabValue} index={1}>
                                                                    <NotificationList
                                                                        data={_.get(qNotificationUnreads, 'data.pages', [])}
                                                                        onClickItem={(item) => {
                                                                            !Boolean(item.is_readed) && mRead.mutate(item.id);
                                                                            console.log(item);
                                                                        }}
                                                                    />
                                                                    {Boolean(
                                                                        qNotificationUnreads.isFetching &&
                                                                            !qNotificationUnreads.isFetchingNextPage
                                                                    ) && <CircularProgress />}
                                                                </TabPanel>
                                                            </PerfectScrollbar>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12} p={0}>
                                                        <Divider sx={{ my: 0 }} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {/* <Divider />
                                        <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                                            <Button size="small" disableElevation>
                                                View All
                                            </Button>
                                        </CardActions> */}
                                    </MainCard>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    );
};

export default React.memo(NotificationSection);

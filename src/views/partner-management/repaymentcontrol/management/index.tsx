import { Grid } from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch } from 'react-redux';
import Slider, { Settings } from 'react-slick';
import { gridSpacing } from 'store/constant';
import { setMode } from 'store/slices/kanban';
import MainCard from 'ui-component/cards/MainCard';
import FECardRM from './components/FECardRM';
import LimitationListActions from './LimitationListActions';
import LimitationListStylePage1 from './List';

// ================================|| CHART ||================================ //
export default function ManagementPage() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2
    };
    return (
        <>
            <div>
                <Slider {...settings}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <Box sx={{ px: 1 }} key={item}>
                            <h3>
                                <FECardRM />
                            </h3>
                        </Box>
                    ))}
                </Slider>
            </div>
            <Grid container spacing={gridSpacing} alignItems="center">
                <Grid item xs={12} sm={12}>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex' }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <MainCard contentSX={{ p: 2 }}>
                                        <LimitationListActions
                                            onClickTransfer={() => dispatch(setMode())}
                                            urlAddTicket="/tickets/create-ticket"
                                        />
                                        <LimitationListStylePage1 />
                                    </MainCard>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

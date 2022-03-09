import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { gridSpacing } from 'store/constant';
import BodyDashboard from './BodyDashboard';
import HeaderDashboard from './HeaderDashboard';

interface IFilter {
    id: number;
    tab: 'Daily' | 'Weekly' | 'Monthly';
}
export default () => {
    const [filter, setFilter] = useState<IFilter>({ id: 0, tab: 'Daily' });
    const [key, setKey] = useState(v4());
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12} md={12}>
                <HeaderDashboard
                    onChangeTab={(e, v) => {
                        setKey(v4());
                        switch (v) {
                            case 0:
                                setFilter({ id: 0, tab: 'Daily' });
                                break;
                            case 1:
                                setFilter({ id: 0, tab: 'Weekly' });
                                break;
                            case 2:
                                setFilter({ id: 0, tab: 'Monthly' });
                                break;
                            default:
                                break;
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <BodyDashboard key={key} />
            </Grid>
        </Grid>
    );
};

// material-ui
import { useTheme } from '@mui/material/styles';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import LimitationList from './LimitationList';

// ==============================|| USER LIST STYLE 1 ||============================== //

const LimitationListStylePage1 = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<Element | ((element: Element) => Element) | null | undefined>(null);
    const handleClick = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <MainCard content={false} border={false}>
            <LimitationList />
        </MainCard>
    );
};

export default LimitationListStylePage1;

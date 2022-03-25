import React, { useImperativeHandle } from 'react';
import { Backdrop, CircularProgress, Dialog } from '@mui/material';

export const refLoading = React.createRef<{ handleToggle: () => void }>();
const Loading = () => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    useImperativeHandle(
        refLoading,
        () => ({
            handleToggle
        }),
        [open]
    );

    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};
export default Loading;

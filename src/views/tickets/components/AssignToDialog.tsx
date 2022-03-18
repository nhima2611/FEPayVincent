import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from '@mui/material';
import FETextField from 'components/forms/FETextField';
import { useFormik } from 'formik';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import * as yup from 'yup';

const validationSchema = yup.object({
    username: yup.string().required('Name is Required'),
    email: yup.string().email().required('Email is Required')
});
export const refAssignTo = React.createRef<any>();
const AssignToDialog = ({ onSubmit }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            type: null
        },
        validationSchema,
        onSubmit
    });

    useEffect(() => {
        !open && formik.resetForm();
    }, [open]);

    const handleClickOpen = ({ title: text }) => {
        setOpen(true);
        setTitle(text);
        formik.setFieldValue('type', text === 'Assignee' ? 1 : 2);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useImperativeHandle(
        refAssignTo,
        () => ({
            handleClickOpen,
            handleClose
        }),
        [open]
    );

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>We will send updates occasionally.</DialogContentText>
                    <Stack spacing={2} sx={{ paddingTop: 2 }}>
                        <FETextField formik={formik} title="Email" name="email" autoFocus />
                        <FETextField formik={formik} title="Name" name="username" />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AssignToDialog;

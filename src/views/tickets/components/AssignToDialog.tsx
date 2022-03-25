import {
    Autocomplete,
    Button,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import * as yup from 'yup';

const validationSchema = yup.object({
    emails: yup.array().required('Email is Required')
});

export const refAssignTo = React.createRef<any>();
const AssignToDialog = ({ onSubmit, loading }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');

    const formik = useFormik({
        initialValues: {
            emails: [],
            type: null
        },
        validationSchema,
        onSubmit: (val: any) => {
            const dd = {
                ...val,
                emails: _.map(val.emails, (it) => it.email)
            };
            onSubmit?.(dd);
        }
    });

    useEffect(() => {
        !open && formik.resetForm();
    }, [open]);

    const handleClickOpen = ({ title: text, data = [] }) => {
        setOpen(true);
        setTitle(text);
        formik.setFieldValue('type', text === 'Assignee' ? 1 : 2);
        formik.setFieldValue('emails', data);
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

    const LIMIT = formik.values.type === 1 ? 1 : 3;

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>We will send updates occasionally.</DialogContentText>
                    <Stack spacing={2} sx={{ paddingTop: 2 }}>
                        <Autocomplete
                            isOptionEqualToValue={(option, value) => option.email === value.email}
                            value={formik.values.emails}
                            onChange={(e, newVal) => formik.setFieldValue('emails', newVal)}
                            multiple
                            options={top100Films}
                            getOptionDisabled={(option) => formik.values.emails?.length >= LIMIT}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.email}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox style={{ marginRight: 8 }} checked={selected} />
                                    {`${option.email} - ${option.name}`}
                                </li>
                            )}
                            renderTags={(value: any[], getTagProps) =>
                                value.map((option: any, index: number) => (
                                    <Chip
                                        variant="outlined"
                                        label={option?.email}
                                        {...getTagProps({ index })}
                                        sx={{
                                            background: 'white !important',
                                            borderRadius: '16px !important',
                                            borderColor: 'green !important'
                                        }}
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Emails"
                                    placeholder="Favorites"
                                    fullWidth
                                    helperText={formik.values.type === 2 && 'Maximum 3 supporter'}
                                />
                            )}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" disabled={loading}>
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AssignToDialog;

const top100Films = [
    {
        email: 'dis.staff.card.01@gmail.com',
        name: 'Dis Card'
    },
    {
        email: 'rep.staff.card.01@gmail.com',
        name: 'Rep Card'
    },
    {
        email: 'dis.staff.loan.01@gmail.com',
        name: 'Dis Loan'
    },
    {
        email: 'rep.staff.load.01@gmail.com',
        name: 'Rep Loan'
    }
];

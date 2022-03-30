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
import React, { useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import ticketsServices from 'services/tickets-services';
import * as yup from 'yup';

const validationSchema = yup.object({
    emails: yup.array().min(1, 'Please choose user to assign').required('Email is Required')
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

    const qGetUser = useQuery('qGetUser', () => ticketsServices.getUser());

    const dd = useMemo(() => _.map(qGetUser.data?.data?.data, (it) => ({ email: it.email, name: it.name })), [qGetUser.data]);

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
                            options={dd}
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
                                    error={Boolean(formik.errors.emails)}
                                    helperText={
                                        Boolean(formik.errors.emails)
                                            ? formik.errors.emails
                                            : formik.values.type === 2 && 'Maximum 3 supporter'
                                    }
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

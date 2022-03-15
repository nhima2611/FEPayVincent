import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Grid, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import FEDropDown from 'views/create/FEDropDown';
import { district, level, province, ward } from '../action-limit/data';
import * as yup from 'yup';
import SelectDropDown from './SelectDropDown';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const validationSchema = yup.object({
    invoiceNumber: yup.string().required('Invoice Number is Required'),
    customerName: yup.string().required('Customer Name is Required'),
    customerEmail: yup.string().email('Enter a valid email').required('Customer Email is Required'),
    customerPhone: yup.string().min(10, 'Phone number should be of minimum 10 characters').required('Customer Phone is Required'),
    customerAddress: yup.string().required('Customer Address is Required'),
    orderStatus: yup.string().required('Order Status is required')
});
export default function FilterSelectLimitation() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const formik = useFormik({
        initialValues: {
            invoiceNumber: '',
            customerName: '',
            customerEmail: '',
            customerPhone: '',
            customerAddress: '',
            orderStatus: 'pending'
        },
        validationSchema,
        onSubmit: (values) => {
            if (values) {
                setOpen(true);
            }
        }
    });
    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12} md={2.5}>
                    <SelectDropDown formik={formik} title="Province" data={province} />
                </Grid>
                <Grid item xs={12} md={2.5}>
                    <SelectDropDown formik={formik} title="District" data={district} />
                </Grid>
                <Grid item xs={12} md={2.5}>
                    <SelectDropDown formik={formik} title="Ward" data={ward} />
                </Grid>
                <Grid item xs={12} md={2.5}>
                    <SelectDropDown formik={formik} title="Level" data={level} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button
                        variant="contained"
                        sx={{ display: 'flex', mt: 3, background: '#008345', '&:hover': { background: '#008345' } }}
                    >
                        Apply
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

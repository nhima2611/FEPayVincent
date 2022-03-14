import React, { useEffect, useState } from 'react';

// material-ui
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Divider,
    FormHelperText,
    Grid,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';

// project imports
import AddItemPage from './CreateInvoice/AddItemPage';
import { gridSpacing } from 'store/constant';
import InputLabel from 'ui-component/extended/Form/InputLabel';
import MainCard from 'ui-component/cards/MainCard';

// third-party
import * as yup from 'yup';
import ProductsPage from './CreateInvoice/ProductsPage';
import TotalCard from './CreateInvoice/TotalCard';
import { useFormik } from 'formik';
import FEDropDown from './FEDropDown';
import FETextField from './FETextField';
import { issueType, requestedBy, transactionType } from '../constant';

// yup validation-schema
const validationSchema = yup.object({
    invoiceNumber: yup.string().required('Invoice Number is Required'),
    customerName: yup.string().required('Customer Name is Required'),
    customerEmail: yup.string().email('Enter a valid email').required('Customer Email is Required'),
    customerPhone: yup.string().min(10, 'Phone number should be of minimum 10 characters').required('Customer Phone is Required'),
    customerAddress: yup.string().required('Customer Address is Required'),
    orderStatus: yup.string().required('Order Status is required')
});

// ==============================|| CREATE INVOICE ||============================== //

function CreateInvoice() {
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

    // array of products
    const initialProducsData = [
        {
            id: 1,
            product: 'Logo Design',
            description: 'lorem ipsum dolor sit amat, connecter adieu siccing eliot',
            quantity: 6,
            amount: 200.0,
            total: 1200.0
        },
        {
            id: 2,
            product: 'Landing Page',
            description: 'lorem ipsum dolor sit amat, connecter adieu siccing eliot',
            quantity: 7,
            amount: 100.0,
            total: 700.0
        },
        {
            id: 3,
            product: 'Admin Template',
            description: 'lorem ipsum dolor sit amat, connecter adieu siccing eliot',
            quantity: 5,
            amount: 150.0,
            total: 750.0
        }
    ];

    const [allAmounts, setAllAmounts] = useState({
        subTotal: 0,
        appliedTaxValue: 0.1,
        appliedDiscountValue: 0.05,
        taxesAmount: 0,
        discountAmount: 0,
        totalAmount: 0
    });
    const [productsData, setProductsData] = useState(initialProducsData);
    const [open, setOpen] = useState(false);
    const [valueBasic, setValueBasic] = React.useState<Date | null>(new Date());
    const [addItemClicked, setAddItemClicked] = useState<boolean>(false);

    // for calculating cost of all orders
    const getTotalAmounts = () => {
        const amounts = {
            subTotal: 0,
            appliedTaxValue: 0.1,
            appliedDiscountValue: 0.05,
            taxesAmount: 0,
            discountAmount: 0,
            totalAmount: 0
        };
        productsData.forEach((item) => {
            amounts.subTotal += item.total;
        });
        amounts.taxesAmount = amounts.subTotal * amounts.appliedTaxValue;
        amounts.discountAmount = (amounts.subTotal + amounts.taxesAmount) * amounts.appliedDiscountValue;
        amounts.totalAmount = amounts.subTotal + amounts.taxesAmount - amounts.discountAmount;
        setAllAmounts(amounts);
    };

    // calculates costs when order-details change
    useEffect(() => {
        getTotalAmounts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsData]);

    // to delete row in order details
    const deleteProductHandler = (id: number) => {
        setProductsData(productsData.filter((item) => item.id !== id));
    };

    // Dialog Handler
    const handleDialogOk = () => {
        setOpen(false);
        formik.resetForm();
    };

    // add item handler
    const handleAddItem = (addingData: any) => {
        setProductsData([
            ...productsData,
            {
                id: addingData.id,
                product: addingData.name,
                description: addingData.desc,
                quantity: addingData.selectedQuantity,
                amount: addingData.amount,
                total: addingData.totalAmount
            }
        ]);

        setAddItemClicked(false);
    };

    return (
        <MainCard title="Create Ticket">
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={3}>
                        <FEDropDown formik={formik} title="Transaction Type" data={transactionType} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FEDropDown formik={formik} title="Issue Type" data={issueType} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FEDropDown formik={formik} title="Sub Issue Type" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FEDropDown formik={formik} title="Requested By" data={requestedBy} />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FETextField formik={formik} title="REF Number" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FETextField formik={formik} title="Transaction Date" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FETextField formik={formik} title="Transaction Amount" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FETextField formik={formik} title="Contract Number" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FETextField formik={formik} title="Product Type" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FETextField formik={formik} title="Requester's National ID" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FETextField formik={formik} title="Requester's Phone Number" />
                    </Grid>
                    <Grid item xs={12} md={3} />

                    <Grid item xs={12} md={3}>
                        <FETextField formik={formik} title="REF Number" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FETextField formik={formik} title="Right Amount" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FETextField formik={formik} title="Right Contract Number" />
                    </Grid>

                    <Grid item xs={12}>
                        <Stack>
                            <InputLabel sx={{ color: '#4C4C4C', fontWeight: 'bold', marginBottom: 1 }}>Description</InputLabel>
                            <TextField
                                fullWidth
                                id="customerAddress"
                                name="customerAddress"
                                defaultValue="I acknowledge terms and conditions."
                                multiline
                                rows={4}
                                placeholder="Enter Description"
                            />
                        </Stack>
                    </Grid>

                    <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }} xs={12}>
                        <Button variant="contained" sx={{ background: '#B3B3B3', fontSize: 12 }}>
                            Cancel
                        </Button>
                        <Button variant="contained" sx={{ marginX: 1, fontSize: 12 }}>
                            Save as Draft
                        </Button>
                        <Button sx={{ background: '#27AE60', fontSize: 12 }} variant="contained" type="submit">
                            Submit
                        </Button>
                    </Grid>

                    {/* <Grid item xs={12} md={4}>
                            <Stack>
                                <InputLabel required>Customer Name</InputLabel>
                                <TextField
                                    fullWidth
                                    id="customerName"
                                    name="customerName"
                                    value={formik.values.customerName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                                    helperText={formik.touched.customerName && formik.errors.customerName}
                                    placeholder="Alex Z."
                                />
                            </Stack>
                        </Grid> */}
                    {/* <Grid item xs={12} md={4}>
                            <Stack>
                                <InputLabel required>Customer Email</InputLabel>
                                <TextField
                                    type="email"
                                    fullWidth
                                    id="customerEmail"
                                    name="customerEmail"
                                    value={formik.values.customerEmail}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.customerEmail && Boolean(formik.errors.customerEmail)}
                                    helperText={formik.touched.customerEmail && formik.errors.customerEmail}
                                    placeholder="alex@company.com"
                                />
                            </Stack>
                        </Grid> */}
                    {/* <Grid item xs={12} md={4}>
                            <Stack>
                                <InputLabel required>Customer Contact Numer</InputLabel>
                                <TextField
                                    type="number"
                                    fullWidth
                                    id="customerPhone"
                                    name="customerPhone"
                                    value={formik.values.customerPhone}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.customerPhone && Boolean(formik.errors.customerPhone)}
                                    helperText={formik.touched.customerPhone && formik.errors.customerPhone}
                                    onChange={formik.handleChange}
                                    placeholder="+ 00 00000 00000"
                                />
                            </Stack>
                        </Grid> */}
                    <Grid item xs={12}>
                        <Stack>
                            <InputLabel required>Customer Address</InputLabel>
                            <TextField
                                fullWidth
                                id="customerAddress"
                                name="customerAddress"
                                value={formik.values.customerAddress}
                                onBlur={formik.handleBlur}
                                error={formik.touched.customerAddress && Boolean(formik.errors.customerAddress)}
                                helperText={formik.touched.customerAddress && formik.errors.customerAddress}
                                onChange={formik.handleChange}
                                multiline
                                placeholder="Enter Address"
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack>
                            <InputLabel required>Invoice Date</InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    inputFormat="dd/MM/yyyy"
                                    renderInput={(props) => <TextField fullWidth {...props} />}
                                    value={valueBasic}
                                    onChange={(newValue: Date | null) => {
                                        setValueBasic(newValue);
                                    }}
                                />
                            </LocalizationProvider>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
}

export default CreateInvoice;

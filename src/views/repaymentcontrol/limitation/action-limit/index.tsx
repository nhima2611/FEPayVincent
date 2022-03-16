import { Box, Button, Dialog, Grid, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material';
import { styled, Theme, useTheme } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';
import { IconPlus, IconSearch } from '@tabler/icons';
import { useFormik } from 'formik';
import { map } from 'lodash';
import React, { createRef, useImperativeHandle, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import FEDropDown from 'views/tickets/create/FEDropDown';
import FETextField from 'views/tickets/create/FETextField';
import * as yup from 'yup';
import { partner, productName, subPartner } from './data';

const validationSchema = yup.object({
    invoiceNumber: yup.string().required('Invoice Number is Required'),
    customerName: yup.string().required('Customer Name is Required'),
    customerEmail: yup.string().email('Enter a valid email').required('Customer Email is Required'),
    customerPhone: yup.string().min(10, 'Phone number should be of minimum 10 characters').required('Customer Phone is Required'),
    customerAddress: yup.string().required('Customer Address is Required'),
    orderStatus: yup.string().required('Order Status is required')
});

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
const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    height: 36,
    marginLeft: 16,
    marginRight: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: 100,
        // marginLeft: 4,
        background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : '#fff'
    }
}));

function getStyles(name: string, provinceName: readonly string[], theme: Theme) {
    return {
        fontWeight: provinceName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
}

export const refActionLimitation = createRef();
const ActionLimitation = ({ onClickTransfer, urlAddTicket }) => {
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

    const theme = useTheme();
    const [toggleTransfer, setToggleTransfer] = useState(false);

    useImperativeHandle(
        refActionLimitation,
        () => ({
            toggleTransfer: () => setToggleTransfer(!toggleTransfer)
        }),
        []
    );
    return (
        <Box>
            <Box sx={{ display: 'flex' }}>
                {map([], (icon, index) => (
                    <Button
                        onClick={() => {
                            switch (index) {
                                case 0:
                                    onClickTransfer();
                                    break;

                                default:
                                    break;
                            }
                        }}
                        key={index}
                        sx={{ minWidth: 32, padding: 0, marginX: 1, mb: 1 }}
                    >
                        <img src={icon} />
                    </Button>
                ))}

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{}}>
                    <OutlineInputStyle
                        id="input-search-header"
                        // value={'value'}
                        // onChange={(e) => setValue(e.target.value)}
                        placeholder="Search"
                        startAdornment={
                            <InputAdornment position="start">
                                <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                            </InputAdornment>
                        }
                        aria-describedby="search-helper-text"
                        inputProps={{ 'aria-label': 'weight' }}
                        sx={{ height: 36 }}
                    />
                </Box>

                <Button
                    variant="outlined"
                    sx={{ borderColor: '#E5E5E5', color: '#008345', borderRadius: 2, height: 36, fontSize: 12, fontWeight: 'bold' }}
                    startIcon={<IconPlus color="#008345" size={18} />}
                    onClick={handleClickOpen}
                >
                    Add New
                </Button>
            </Box>

            {open && (
                <div style={{}}>
                    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
                        <MainCard open={open} onClose={handleClose} sx={{ marginBottom: '-11px !important', marginTop: '-12px' }}>
                            <form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} mb={3}>
                                        <h3 style={{ color: '#27AE60' }}> Add New Limitation</h3>
                                        <p>
                                            Limitation number: <strong>11122</strong>
                                        </p>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <FEDropDown formik={formik} title="Partner" data={partner} />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <FEDropDown formik={formik} title="Sub-Partner" data={subPartner} />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <FETextField formik={formik} title="POS#" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack>
                                            <InputLabel sx={{ color: '#4C4C4C', fontWeight: 'bold', marginBottom: 1 }}>
                                                Description
                                            </InputLabel>
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
                                    <Grid container spacing={2} pt={4}>
                                        <Grid item xs={12} md={2.5}>
                                            <FEDropDown formik={formik} title="Product" data={productName} />
                                        </Grid>
                                        <Grid item xs={12} md={2.5}>
                                            <FETextField formik={formik} title="Transaction Limitation" />
                                        </Grid>
                                        <Grid item xs={12} md={2.5}>
                                            <FETextField formik={formik} title="Daily Limitation" />
                                        </Grid>
                                        <Grid item xs={12} md={2.5}>
                                            <FETextField formik={formik} title="Monthly Limitation" />
                                        </Grid>

                                        <Grid item xs={12} md={2}>
                                            <FETextField formik={formik} title="Duration" />
                                        </Grid>
                                    </Grid>

                                    <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }} xs={12}>
                                        <Button variant="contained" sx={{ background: '#B3B3B3', fontSize: 12 }} onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button variant="contained" sx={{ marginX: 1, fontSize: 12 }}>
                                            Save as Draft
                                        </Button>
                                        <Button sx={{ background: '#27AE60', fontSize: 12 }} variant="contained" type="submit">
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </MainCard>
                    </Dialog>
                </div>
            )}
        </Box>
    );
};

export default ActionLimitation;

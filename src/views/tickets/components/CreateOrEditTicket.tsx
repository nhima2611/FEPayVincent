import { DatePicker, LocalizationProvider } from '@mui/lab';
// material-ui
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Box, Button, Grid, IconButton, Stack, styled, TextField, Typography } from '@mui/material';
import { IconUpload, IconX } from '@tabler/icons';
import { issueType, productTypeRightContractNumberType, requestedBy, subIssueType, transactionType } from 'constants/tickets';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import InputLabel from 'ui-component/extended/Form/InputLabel';
// third-party
import * as yup from 'yup';
import FEDropDown from 'components/forms/FEDropDown';
import FETextField from 'components/forms/FETextField';

// yup validation-schema
const validationSchema = yup.object({
    transaction_type: yup.string().required('Transaction Type is Required'),
    issue_type: yup.string().required('Issue Type is Required'),
    sub_issue_type: yup.number().when('issue_type', { is: 3, then: yup.number().required('Sub Issue Type is Required') }),
    right_amount: yup.string().when('issue_type', {
        is: 2,
        then: yup.number().typeError('Right Amount must be a number').required('Right Amount Number is Required')
    }),
    requested_by: yup.string().required('Requested By is Required'),
    ref_number: yup.string().required('Ref Number is Required'),
    transaction_date: yup.string().required('Transaction Date is Required'),
    transaction_amount: yup.number().typeError('Transaction Amount must be a number').required('Transaction Amount is Required'),
    contract_number: yup.string().required('Contract Number is Required'),
    wrong_transaction: yup.string().required('Wrong Transaction is Required'),
    right_contract_number: yup.string().required('Right Contract Number is Required'),
    right_product_type: yup.number().when('issue_type', { is: 3, then: yup.number().required('Right Product Type is Required') }),
    requester_national_id: yup.number().typeError("Requested's Nation ID must be a number").required("Requested's Nation ID is Required"),
    requester_phone: yup
        .number()
        .typeError("Requester's Phone Number must be a number")
        .min(10, 'Phone number should be of minimum 10 characters')
        .required("Requester's Phone Number is Required")
});

// ==============================|| CREATE TICKET ||============================== //

interface Props {
    onSubmit: (values: any) => void;
    onCancel?: () => void;
    data?: any;
}

export const initialValues = {
    transaction_type: 1,
    issue_type: 1,
    sub_issue_type: 0,
    requested_by: 1,
    ref_number: '',
    transaction_date: new Date(),
    transaction_amount: '',
    contract_number: '',
    wrong_transaction: '',
    right_contract_number: '',
    right_amount: '',
    right_product_type: 0,
    requester_national_id: '',
    requester_phone: '',
    status: null,
    description: '',
    attachments: []
};

const CreateOrEditTicket = ({ onSubmit, onCancel, data }: Props) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (val) => onSubmit(val)
    });

    useEffect(() => {
        if (data) {
            const d: any = _.pickBy(data, (key, value) => _.keys(initialValues).includes(value));
            formik.setValues(d);
        }
    }, [data]);
    console.log(formik);

    useEffect(() => {
        if (formik.values.issue_type !== 3) {
            formik.setFieldValue('sub_issue_type', 0);
            formik.setFieldValue('right_product_type', 0);
        }
        if (formik.values.issue_type !== 2) {
            formik.setFieldValue('right_amount', '');
        }
    }, [formik.values.issue_type]);

    const handleSubmit = ({ status }) => {
        if (!formik.isValid) return;
        formik.setFieldValue('status', status);
        formik.setFieldValue('transaction_date', moment(formik.values.transaction_date).format('DD/MM/YYYY'));
    };

    const onDropFile = (files: any) => {
        formik.setFieldValue('attachments', [...files, ...formik.values.attachments]);
    };

    const onRemoveItem = (index) => {
        const dd = formik.values.attachments.filter((it: any, indexFile: number) => indexFile !== index);
        formik.setFieldValue('attachments', dd);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop: onDropFile, maxFiles: 5 });

    return (
        <MainCard title={_.isEmpty(data) ? 'Create Ticket' : 'Edit Ticket'}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={3}>
                        <FEDropDown name="transaction_type" formik={formik} title="Transaction Type" data={transactionType} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FEDropDown name="issue_type" formik={formik} title="Issue Type" data={issueType} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FEDropDown
                            disabled={formik.values.issue_type !== 3}
                            name="sub_issue_type"
                            formik={formik}
                            title="Sub Issue Type"
                            data={subIssueType}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FEDropDown name="requested_by" formik={formik} title="Requested By" data={requestedBy} />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FETextField formik={formik} title="REF Number" name="ref_number" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Stack>
                            <InputLabel sx={{ color: '#4C4C4C', fontWeight: 'bold' }}>Transaction Date</InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    inputFormat="dd/MM/yyyy"
                                    renderInput={(props) => <TextField fullWidth {...props} />}
                                    value={formik.values.transaction_date}
                                    onChange={(val) => formik.setFieldValue('transaction_date', val)}
                                />
                            </LocalizationProvider>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FETextField formik={formik} title="Transaction Amount" name="transaction_amount" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FETextField formik={formik} title="Contract Number" name="contract_number" />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FETextField formik={formik} title="Product Type of Wrong Transaction" name="wrong_transaction" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FETextField formik={formik} title="Right Contract Number" name="right_contract_number" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FETextField formik={formik} title="Right Amount" name="right_amount" disabled={formik.values.issue_type !== 2} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FEDropDown
                            disabled={formik.values.issue_type !== 3}
                            name="right_product_type"
                            formik={formik}
                            title="Product Type of Right Contract #"
                            data={productTypeRightContractNumberType}
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FETextField formik={formik} title="Requester's National ID" name="requester_national_id" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FETextField formik={formik} title="Requester's Phone Number" name="requester_phone" />
                    </Grid>

                    <Grid item xs={12}>
                        <FETextField
                            formik={formik}
                            title="Description"
                            multiline
                            rows={4}
                            placeholder="Enter Description"
                            name="description"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <BoxStyle
                            sx={{ padding: 3, backgroundColor: 'rgba(39, 174, 96, .15)', cursor: 'pointer' }}
                            {...getRootProps({ className: 'dropzone' })}
                        >
                            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                                <Input id="contained-button-file" {...getInputProps()} />
                                <IconUpload />
                                <Typography>Browse or Drop file here</Typography>
                            </Stack>
                        </BoxStyle>
                        {formik.values.attachments?.map((file: any, index: number) => (
                            <Stack key={index} direction="row" alignItems="center">
                                <li style={{ margin: '8px 4px' }}>
                                    {file.path || file.name} - {file.size} bytes
                                </li>
                                <IconButton onClick={() => onRemoveItem(index)}>
                                    <IconX />
                                </IconButton>
                            </Stack>
                        ))}
                    </Grid>

                    <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }} xs={12}>
                        <Button variant="contained" sx={{ background: '#999999' }} onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ marginX: 1, background: '#2F80ED' }}
                            type="submit"
                            onClick={() => handleSubmit({ status: 0 })}
                        >
                            Save as Draft
                        </Button>
                        <Button
                            sx={{ background: '#27AE60' }}
                            variant="contained"
                            type="submit"
                            onClick={() => handleSubmit({ status: 1 })}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default CreateOrEditTicket;

const BoxStyle = styled(Box)({
    backgroundImage: `url(
        "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='14' ry='14' stroke='%23CCCCCCFF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e"
        )`,
    borderRadius: 14
});

const Input = styled('input')({
    display: 'none'
});

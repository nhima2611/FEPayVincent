// assets
import faker from '@faker-js/faker';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Grid, Typography } from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';
import FEDatePickerField from 'components/forms/FEDatePickerField';
import FEDateRangePickerField from 'components/forms/FEDateRangePickerField';
import FESelect from 'components/forms/FESelect';
import FETextField from 'components/forms/FETextField';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
// third party
import * as Yup from 'yup';

// ==============================|| CREATE INVOICE ||============================== //

interface IFormProps {
    name: string;
    email: string;
    phone: string;
    code: string;
    address: string;
    address2: string;
    ward: string;
    district: string;
    province: string;
    contract_number: number;
    contract_from: Date;
    contract_to: Date;
    sign_contract_date: Date;
    created_contract_date: Date;
}

const CreatePartnerPage = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const initialValues: IFormProps = {
        name: '',
        email: '',
        phone: '',
        code: '',
        address: '',
        address2: '',
        ward: '',
        district: '',
        province: '',
        contract_number: 0,
        sign_contract_date: new Date(),
        contract_from: new Date(),
        contract_to: new Date(),
        created_contract_date: new Date()
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
                name: Yup.string().max(255).required('Name is required'),
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                phone: Yup.string()
                    .min(10, 'Phone must be 10 characters')
                    .max(10, 'Phone must be 10 characters')
                    .trim()
                    .required('Phone is required')
                    .matches(/^\d+$/, 'Phone is not in correct format'),
                code: Yup.string().required('Code is required'),
                sub_partners: Yup.array().of(Yup.number()).min(1, 'Select at least one item')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    if (scriptedRef.current) {
                        console.log(values);

                        setStatus({ success: true });
                        setSubmitting(false);
                    }
                } catch (err: any) {
                    console.error(err);
                    if (scriptedRef.current) {
                        setStatus({ success: false });
                        setSubmitting(false);
                    }
                }
            }}
        >
            {(formik) => (
                <form noValidate onSubmit={formik.handleSubmit} {...others}>
                    <MainCard
                        boxShadow
                        shadow="0px 4px 4px rgba(0, 0, 0, 0.05)"
                        sx={{
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
                            border: '1px solid #E5E5E5 !important',
                            mb: 3
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h3">
                                    {/* <FormattedMessage id="information" /> */}
                                    Add New Partner
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md>
                                        <FETextField formik={formik} label="Partner" name="name" />
                                    </Grid>
                                    <Grid item xs={12} md>
                                        <FETextField formik={formik} label="Contract Number" name="contract_number" />
                                    </Grid>
                                    <Grid item xs={12} md>
                                        <FEDatePickerField formik={formik} label="Create Contract Date" name="created_contract_date" />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FEDateRangePickerField
                                            formik={formik}
                                            label="Contract Duration"
                                            nameFrom="contract_from"
                                            nameTo="contract_to"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md>
                                        <FEDatePickerField formik={formik} label="Sign Contract Date" name="sign_contract_date" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FESelect
                                    formik={formik}
                                    label="City"
                                    name="province"
                                    dataSource={[
                                        { id: 1, name: 'HCM' },
                                        { id: 2, name: 'HN' }
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FESelect
                                    formik={formik}
                                    label="District"
                                    name="district"
                                    dataSource={[
                                        { id: 1, name: 'HCM' },
                                        { id: 2, name: 'HN' }
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FESelect
                                    formik={formik}
                                    label="Ward"
                                    name="ward"
                                    dataSource={[
                                        { id: 1, name: 'HCM' },
                                        { id: 2, name: 'HN' }
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FETextField
                                    formik={formik}
                                    label="Address"
                                    name="address"
                                    inputProps={{
                                        helperText: '(Street address, P.O box, Apartment, Floor, Unit, Building, etc)'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FETextField formik={formik} label="Street" name="address2" />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h3">
                                    {/* <FormattedMessage id="information" /> */}
                                    Main User information (*)
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md>
                                        <FETextField formik={formik} label="Full Name" name="name" />
                                    </Grid>
                                    <Grid item xs={12} md>
                                        <FETextField formik={formik} label="Email" name="email" />
                                    </Grid>
                                    <Grid item xs={12} md>
                                        <FETextField formik={formik} label="Phone" name="phone" />
                                    </Grid>
                                    <Grid item xs={12} md>
                                        <FETextField formik={formik} label="Password" name="code" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    disabled={formik.isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ borderRadius: '8px' }}
                                    startIcon={<SaveIcon />}
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </MainCard>
                </form>
            )}
        </Formik>
    );
};

export default CreatePartnerPage;

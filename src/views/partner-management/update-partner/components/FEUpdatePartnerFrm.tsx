// assets
import faker from '@faker-js/faker';
import { Grid, Typography } from '@mui/material';
import FEDatePickerField from 'components/forms/FEDatePickerField';
import FEDateRangePickerField from 'components/forms/FEDateRangePickerField';
import FESelect from 'components/forms/FESelect';
import FETextField from 'components/forms/FETextField';
import ToolbarUpdate from 'components/ToolbarUpdate';
import { FormikHelpers, useFormik } from 'formik';
import React, { useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
// third party
import * as Yup from 'yup';
import FETableUserOfPartner from './FETableUserOfPartner';

// ==============================|| CREATE PARTNER ||============================== //

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
    fullname: string;
    password: string;
    [name: string]: any;
}
const initialValues: IFormProps = {
    name: '',
    email: '',
    phone: '',
    code: faker.internet.password(),
    address: '',
    address2: '',
    ward: '',
    district: '',
    province: '',
    contract_number: 0,
    sign_contract_date: new Date(),
    contract_from: new Date(),
    contract_to: new Date(),
    created_contract_date: new Date(),
    fullname: '',
    password: '',
    status: 1,
    partner_id: 1
};
interface Props {
    onSubmit: (values: IFormProps, formikConf: FormikHelpers<IFormProps>) => void | Promise<any>;
    dataInitial?: any;
    onChangeProvince: (item) => void;
    onChangeDistrict: (item) => void;
    onChangeWard: (item) => void;
    cities: any[];
    wards: any[];
    districts: any[];
    isLoading: boolean;
    isEdit: boolean;
}
const FEUpdatePartnerFrm = ({
    onSubmit,
    dataInitial,
    onChangeProvince,
    onChangeDistrict,
    onChangeWard,
    cities = [],
    wards = [],
    districts = [],
    isLoading,
    isEdit
}: Props) => {
    const formik = useFormik<IFormProps>({
        initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required('Partner is required'),
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            phone: Yup.string()
                .min(10, 'Phone must be 10 characters')
                .max(10, 'Phone must be 10 characters')
                .trim()
                .required('Phone is required')
                .matches(/^\d+$/, 'Phone is not in correct format'),
            code: Yup.string(),
            address: Yup.string().required('Address is required'),
            address2: Yup.string().required('Street is required'),
            ward: Yup.string().required('Ward is required'),
            district: Yup.string().required('District is required'),
            province: Yup.string().required('City is required'),
            contract_number: Yup.number().required('Contract Number is required'),
            sign_contract_date: Yup.date().required(),
            contract_from: Yup.date().required(),
            contract_to: Yup.date().required(),
            created_contract_date: Yup.date().required(),
            fullname: isEdit ? Yup.string() : Yup.string().required('Fullname is required'),
            password: isEdit ? Yup.string() : Yup.string().max(255).required('Pasword is required')
        }),
        onSubmit,
        onReset: (props) => {
            console.log(props);
        }
    });

    useEffect(() => {
        if (dataInitial) {
            formik.setValues({ ...formik.values, ...dataInitial });
        }
    }, [dataInitial]);
    return (
        <>
            {Boolean(isLoading) ? (
                <div>Loading</div>
            ) : (
                <form
                    onSubmit={(e) => {
                        formik.handleSubmit(e);
                        console.log(formik.errors);
                    }}
                >
                    <ToolbarUpdate loading={formik.isSubmitting} />
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
                                    {Boolean(isEdit) ? 'Partner Details - Edit' : 'Add New Partner'}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md>
                                        <FETextField formik={formik} title="Partner" name="name" inputProps={{ disabled: isEdit }} />
                                    </Grid>
                                    <Grid item xs={12} md>
                                        <FETextField
                                            formik={formik}
                                            title="Contract Number"
                                            name="contract_number"
                                            inputProps={{ disabled: isEdit }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md>
                                        <FEDatePickerField
                                            formik={formik}
                                            label="Create Contract Date"
                                            name="created_contract_date"
                                            inputProps={{ disabled: isEdit }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FEDateRangePickerField
                                            formik={formik}
                                            label="Contract Duration"
                                            nameFrom="contract_from"
                                            nameTo="contract_to"
                                            inputProps={{ disabled: isEdit }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md>
                                        <FEDatePickerField
                                            formik={formik}
                                            label="Sign Contract Date"
                                            name="sign_contract_date"
                                            inputProps={{ disabled: isEdit }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FESelect
                                    formik={formik}
                                    label="City"
                                    name="province"
                                    dataSource={cities}
                                    handleSelect={(item) => {
                                        if (item) {
                                            formik.setFieldValue('province', item.code);
                                            formik.setFieldValue('district', '');
                                            formik.setFieldValue('ward', '');
                                            onChangeProvince(item);
                                        }
                                    }}
                                    selectProps={{ notAllowSelectNull: true, value: formik.values.province }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FESelect
                                    formik={formik}
                                    label="District"
                                    name="district"
                                    dataSource={districts}
                                    handleSelect={(item) => {
                                        if (item) {
                                            formik.setFieldValue('district', item.code);
                                            formik.setFieldValue('ward', '');
                                            onChangeDistrict(item);
                                        }
                                    }}
                                    selectProps={{ notAllowSelectNull: true, value: formik.values.district }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FESelect
                                    formik={formik}
                                    label="Ward"
                                    name="ward"
                                    dataSource={wards}
                                    handleSelect={(item) => {
                                        if (item) {
                                            formik.setFieldValue('ward', item.code);
                                            onChangeWard(item);
                                        }
                                    }}
                                    selectProps={{ notAllowSelectNull: true, value: formik.values.ward }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FETextField
                                    formik={formik}
                                    title="Address"
                                    name="address"
                                    inputProps={{
                                        helperText: '(Street address, P.O box, Apartment, Floor, Unit, Building, etc)'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FETextField formik={formik} title="Street" name="address2" />
                            </Grid>

                            {!Boolean(isEdit) && (
                                <>
                                    <Grid item xs={12}>
                                        <Typography variant="h3">Main User information (*)</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md>
                                                <FETextField formik={formik} title="Full Name" name="fullname" />
                                            </Grid>
                                            <Grid item xs={12} md>
                                                <FETextField formik={formik} title="Email" name="email" />
                                            </Grid>
                                            <Grid item xs={12} md>
                                                <FETextField formik={formik} title="Phone" name="phone" />
                                            </Grid>
                                            <Grid item xs={12} md>
                                                <FETextField formik={formik} title="Password" name="password" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                            {Boolean(isEdit && dataInitial) && (
                                <>
                                    <Grid item xs={12}>
                                        <Typography variant="h3">User List</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FETableUserOfPartner rows={_.get(dataInitial, 'users', [])} />
                                    </Grid>
                                </>
                            )}
                            {/* <Grid item xs={12}>
                    <Button
                        disabled={formik.isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: '8px' }}
                    >
                        Save
                    </Button>
                </Grid> */}
                        </Grid>
                    </MainCard>
                </form>
            )}
        </>
    );
};

export default FEUpdatePartnerFrm;

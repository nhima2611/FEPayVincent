// assets
import { Box, Button, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FEDatePickerField from 'components/forms/FEDatePickerField';
import FEDateRangePickerField from 'components/forms/FEDateRangePickerField';
import FESelect from 'components/forms/FESelect';
import FETextField from 'components/forms/FETextField';
import ToolbarUpdate from 'components/ToolbarUpdate';
import { FormikHelpers, useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    contract_number: string;
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
    code: '',
    address: '',
    address2: '',
    ward: '',
    district: '',
    province: '',
    contract_number: '',
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
    const theme = useTheme();
    const navi = useNavigate();
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
            code: Yup.string().required('Code is required'),
            address: Yup.string().required('Address is required'),
            address2: Yup.string().required('Street is required'),
            ward: Yup.string().required('Ward is required'),
            district: Yup.string().required('District is required'),
            province: Yup.string().required('City is required'),
            contract_number: Yup.string().required('Contract Number is required'),
            sign_contract_date: Yup.date().required(),
            contract_from: Yup.date().required(),
            contract_to: Yup.date().required(),
            created_contract_date: Yup.date().required(),
            fullname: isEdit ? Yup.string() : Yup.string().required('Fullname is required')
            // password: isEdit ? Yup.string() : Yup.string().max(255).required('Pasword is required')
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
                                <Typography variant="h3" sx={{ color: theme.palette.primary.main }}>
                                    {/* <FormattedMessage id="information" /> */}
                                    {Boolean(isEdit) ? 'Partner Details - Edit' : 'Add New Partner'}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    {Boolean(isEdit) && (
                                        <Grid item xs={12}>
                                            <MainCard
                                                sx={{
                                                    border: '1px solid #E5E5E5 !important'
                                                    // my: 3
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        bgcolor: 'background.paper',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <Typography sx={{ color: '#4C4C4C', fontWeight: 700 }}>
                                                        Partner: {_.get(dataInitial, 'name', 'N/A')}
                                                    </Typography>
                                                    <Typography
                                                        sx={{ color: '#4C4C4C', fontWeight: 700, alignItems: 'center', display: 'flex' }}
                                                    >
                                                        Sub-Partner: {_.get(dataInitial, 'count_subPartner', 'N/A')}
                                                        <Button
                                                            color="secondary"
                                                            sx={{ ml: 2, borderRadius: 20 }}
                                                            size="small"
                                                            variant="outlined"
                                                            onClick={(e) => navi(`/sub-partner?partner_id=${_.get(dataInitial, 'id', '')}`)}
                                                        >
                                                            View Detail
                                                        </Button>
                                                    </Typography>
                                                    <Typography sx={{ color: '#4C4C4C', fontWeight: 700 }}>
                                                        POS#: {_.get(dataInitial, 'count_pos', 'N/A')}
                                                    </Typography>
                                                </Box>
                                            </MainCard>
                                        </Grid>
                                    )}
                                    <Grid item xs={12} md>
                                        <FETextField formik={formik} title="Code" name="code" disabled={isEdit} />
                                    </Grid>
                                    <Grid item xs={12} md sx={{ display: isEdit ? 'none' : 'initial' }}>
                                        <FETextField formik={formik} title="Partner" name="name" disabled={isEdit} />
                                    </Grid>
                                    <Grid item xs={12} md>
                                        <FETextField formik={formik} title="Contract Number" name="contract_number" disabled={isEdit} />
                                    </Grid>
                                    <Grid xs={12} item>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md>
                                                <FEDatePickerField
                                                    formik={formik}
                                                    label="Create Contract Date"
                                                    name="created_contract_date"
                                                    inputProps={{ disabled: isEdit }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md>
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
                                <FETextField formik={formik} title="Address" name="address" multiline rows={4} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FETextField formik={formik} title="Street" name="address2" multiline rows={4} />
                            </Grid>

                            {!Boolean(isEdit) && (
                                <>
                                    <Grid item xs={12}>
                                        <Typography variant="h3" sx={{ color: theme.palette.primary.main }}>
                                            Main User information (*)
                                        </Typography>
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
                                            {/* <Grid item xs={12} md>
                                                <FETextField formik={formik} title="Password" name="password" />
                                            </Grid> */}
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                            {Boolean(isEdit && dataInitial) && (
                                <>
                                    <Grid item xs={12}>
                                        <Typography variant="h3" sx={{ color: theme.palette.primary.main }}>
                                            User List
                                        </Typography>
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

export default React.memo(FEUpdatePartnerFrm);

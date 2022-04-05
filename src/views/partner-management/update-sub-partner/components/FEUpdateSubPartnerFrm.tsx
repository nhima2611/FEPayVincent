// assets
import { Grid, Typography } from '@mui/material';
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

// ==============================|| CREATE PARTNER ||============================== //

interface IFormProps {
    name: string;
    email: string;
    phone: string;
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
    presentative: string;
    pic_email: string;
    pic_phone: string;
    national_id: string;
    status: number;
    [name: string]: any;
}
const initialValues: IFormProps = {
    email: '',
    name: '',
    phone: '',
    pic_email: '',
    pic_phone: '',
    contract_number: '',
    created_contract_date: new Date(),
    contract_from: new Date(),
    contract_to: new Date(),
    sign_contract_date: new Date(),
    status: 0,
    presentative: '',
    address: '',
    address2: '',
    ward: '',
    district: '',
    province: '',
    national_id: ''
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
const FEUpdateSubPartnerFrm = ({
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
            name: Yup.string().required('Sub Partner is required'),
            address: Yup.string().required('Address is required'),
            address2: Yup.string().required('Street is required'),
            ward: Yup.string().required('Ward is required'),
            district: Yup.string().required('District is required'),
            province: Yup.string().required('City is required'),
            contract_number: Yup.string().required('Contract Number is required'),
            sign_contract_date: isEdit ? Yup.date() : Yup.date().required(),
            contract_from: isEdit ? Yup.date() : Yup.date().required(),
            contract_to: isEdit ? Yup.date() : Yup.date().required(),
            created_contract_date: isEdit ? Yup.date() : Yup.date().required(),
            presentative: Yup.string().required('Fullname is required'),
            pic_email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            pic_phone: Yup.string()
                .min(10, 'Phone must be 10 characters')
                .max(10, 'Phone must be 10 characters')
                .trim()
                .required('Phone is required')
                .matches(/^\d+$/, 'Phone is not in correct format'),
            national_id: Yup.string().required('National ID is required')
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
                                    {Boolean(isEdit) ? 'Sub-Partner Details - Edit' : 'Add New Sub-Partner'}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md sx={{ display: isEdit ? 'none' : 'initial' }}>
                                        <FETextField formik={formik} title="Sub-Partner" name="name" disabled={isEdit} />
                                    </Grid>
                                    <Grid item xs={12} md>
                                        <FETextField formik={formik} title="Contract Number" name="contract_number" disabled={isEdit} />
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
                                <FETextField formik={formik} title="Address" name="address" multiline rows={4} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FETextField formik={formik} title="Street" name="address2" multiline rows={4} />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h3" sx={{ color: theme.palette.primary.main }}>
                                    PIC information (*)
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md>
                                        <FETextField formik={formik} title="Full Name" name="presentative" />
                                    </Grid>
                                    <Grid item xs={12} md>
                                        <FETextField formik={formik} title="Email" name="pic_email" />
                                    </Grid>
                                    <Grid item xs={12} md>
                                        <FETextField formik={formik} title="Phone" name="pic_phone" />
                                    </Grid>
                                    <Grid item xs={12} md>
                                        <FETextField formik={formik} title="National ID" name="national_id" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </MainCard>
                </form>
            )}
        </>
    );
};

export default React.memo(FEUpdateSubPartnerFrm);

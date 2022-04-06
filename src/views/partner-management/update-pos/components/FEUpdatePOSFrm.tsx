// assets
import { Grid, InputAdornment, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FESelect from 'components/forms/FESelect';
import FETextField from 'components/forms/FETextField';
import ToolbarUpdate from 'components/ToolbarUpdate';
import { FormikHelpers, useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
// third party
import * as Yup from 'yup';
import FETableDeviceOfPOS from './FETableDeviceOfPOS';

// ==============================|| CREATE PARTNER ||============================== //

interface IFormProps {
    sub_partner_id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    address2: string;
    presentative: string;
    ward: string;
    district: string;
    province: string;
    status: number;
    [name: string]: any;
}
const initialValues: IFormProps = {
    sub_partner_id: '',
    email: '',
    name: '',
    phone: '',
    status: 0,
    presentative: '',
    address: '',
    address2: '',
    ward: '',
    district: '',
    province: ''
};
interface Props {
    onSubmit: (values: IFormProps, formikConf: FormikHelpers<IFormProps>) => void | Promise<any>;
    dataInitial?: any;
    onChangeProvince: (item) => void;
    onChangeDistrict: (item) => void;
    onChangeWard: (item) => void;
    subPartners: any[];
    cities: any[];
    wards: any[];
    districts: any[];
    isLoading: boolean;
    isEdit: boolean;
}
const FEUpdatePOSFrm = ({
    onSubmit,
    dataInitial,
    onChangeProvince,
    onChangeDistrict,
    onChangeWard,
    subPartners = [],
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
            name: Yup.string().required('POS is required'),
            address: Yup.string().required('Address is required'),
            address2: Yup.string().required('Street is required'),
            ward: Yup.string().required('Ward is required'),
            district: Yup.string().required('District is required'),
            province: Yup.string().required('City is required'),
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            phone: Yup.string()
                .min(10, 'Phone must be 10 characters')
                .max(10, 'Phone must be 10 characters')
                .trim()
                .required('Phone is required')
                .matches(/^\d+$/, 'Phone is not in correct format'),
            sub_partner_id: Yup.string().required('Sub-Partner is required'),
            presentative: Yup.string().required('Fullname is required')
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
                                    {Boolean(isEdit) ? 'POS Details - Edit' : 'Add New POS'}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <FESelect
                                            formik={formik}
                                            label="Sub-Partner"
                                            name="sub_partner_id"
                                            dataSource={subPartners}
                                            selectProps={{ notAllowSelectNull: true, value: formik.values.sub_partner_id }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FETextField formik={formik} title="POS Name" name="name" />
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
                                        <FETextField formik={formik} title="Email" name="email" />
                                    </Grid>
                                    <Grid item xs={12} md>
                                        <FETextField formik={formik} title="Phone" name="phone" />
                                    </Grid>
                                </Grid>
                            </Grid>

                            {Boolean(isEdit && dataInitial) && (
                                <>
                                    <Grid item xs={12}>
                                        <Typography variant="h3" sx={{ color: theme.palette.primary.main }}>
                                            Device List
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FETableDeviceOfPOS rows={_.get(dataInitial, 'devices', [])} />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </MainCard>
                </form>
            )}
        </>
    );
};

export default React.memo(FEUpdatePOSFrm);

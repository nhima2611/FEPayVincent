// assets
import faker from '@faker-js/faker';
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FESelect from 'components/forms/FESelect';
import FETextField from 'components/forms/FETextField';
import ToolbarUpdate from 'components/ToolbarUpdate';
import { FormikHelpers, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
// third party
import * as Yup from 'yup';

// ==============================|| CREATE PARTNER ||============================== //

interface IFormProps {
    fullname: string;
    password: string;
    email: string;
    phone: string;
    position: string;
    group_id: string;
    sub_group_id: string;
    role: string;
    [name: string]: any;
}
const initialValues: IFormProps = {
    fullname: '',
    email: '',
    phone: '',
    position: 'Staff',
    group_id: '0',
    sub_group_id: '0',
    role: '',
    password: faker.internet.password()
};
interface Props {
    onSubmit: (values: IFormProps, formikConf: FormikHelpers<IFormProps>) => void | Promise<any>;
    onChangeGroup: (item: any) => void;
    groups: any[];
    subGroups: any[];
    roles: any[];
    dataInitial?: any;
    isLoading: boolean;
    isEdit: boolean;
    isPartner: boolean;
}
const FEUpdateUserFrm = ({ onSubmit, dataInitial, isLoading, isEdit, groups, roles, subGroups, onChangeGroup, isPartner }: Props) => {
    const theme = useTheme();
    const [resetKey, setResetKey] = useState(v4());
    const formik = useFormik<IFormProps>({
        initialValues,
        validationSchema: Yup.object({
            fullname: Yup.string().required('Partner is required'),
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            phone: Yup.string()
                .min(10, 'Phone must be 10 characters')
                .max(10, 'Phone must be 10 characters')
                .trim()
                .required('Phone is required')
                .matches(/^\d+$/, 'Phone is not in correct format'),
            position: Yup.string().required('Position is required'),
            group_id: Yup.string().required('Group is required'),
            sub_group_id: Yup.string().required('Sub-Group is required'),
            role: Yup.string().required('Role is required')
        }),
        onSubmit,
        onReset: (props) => {}
    });

    useEffect(() => {
        if (dataInitial) {
            formik.setValues({ ...formik.values, ...dataInitial });
        }
    }, [dataInitial, resetKey]);

    return (
        <>
            {Boolean(isLoading) ? (
                <div>Loading</div>
            ) : (
                // <div>Loading</div>
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
                                    {Boolean(isEdit) ? 'User Details - Edit' : 'Add New User'} {Boolean(isPartner) ? ' Of Partner' : ''}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <FETextField formik={formik} title="Full Name" name="fullname" />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FETextField formik={formik} title="Email" name="email" />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FETextField formik={formik} title="Phone" name="phone" />
                                    </Grid>
                                    {!Boolean(isPartner) && (
                                        <>
                                            <Grid item xs={12} md={3}>
                                                <FESelect
                                                    formik={formik}
                                                    label="Position"
                                                    name="position"
                                                    dataSource={[
                                                        { id: 'Manager', name: 'Manager' },
                                                        { id: 'Staff', name: 'Staff' }
                                                    ]}
                                                    selectProps={{ notAllowSelectNull: true, value: formik.values.position }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <FESelect
                                                    formik={formik}
                                                    label="Role"
                                                    name="role"
                                                    dataSource={roles}
                                                    selectProps={{ notAllowSelectNull: true, value: formik.values.role }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <FESelect
                                                    formik={formik}
                                                    label="Group"
                                                    name="group_id"
                                                    dataSource={groups}
                                                    handleSelect={(item) => {
                                                        if (item) {
                                                            formik.setFieldValue('group_id', item.id);
                                                            formik.setFieldValue('sub_group_id', '');
                                                            onChangeGroup(item);
                                                        }
                                                    }}
                                                    selectProps={{ notAllowSelectNull: true, value: formik.values.group_id }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <FESelect
                                                    formik={formik}
                                                    label="Sub-Group"
                                                    name="sub_group_id"
                                                    dataSource={subGroups}
                                                    selectProps={{ notAllowSelectNull: true, value: formik.values.sub_group_id }}
                                                />
                                            </Grid>
                                        </>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </MainCard>
                </form>
            )}
        </>
    );
};

export default React.memo(FEUpdateUserFrm);

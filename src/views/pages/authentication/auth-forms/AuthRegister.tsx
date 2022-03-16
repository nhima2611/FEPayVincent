// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import React, { useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import toastService from 'services/core/toast.service';
import { StringColorProps } from 'types';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
// third party
import * as Yup from 'yup';

// ===========================|| REGISTER ||=========================== //

const recaptchaRef: any = React.createRef();

const FirebaseRegister = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const [showPassword, setShowPassword] = React.useState(false);
    const { register } = useAuth();

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState<StringColorProps>();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    const changePassword = (value: string) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    return (
        <>
            <Formik
                initialValues={{
                    parent_id: 0,
                    name: 'Nguyen Quang',
                    email: 'nguyenvanquang2k.00@gmail.com',
                    code: '454621',
                    password: '123456',
                    confirm_password: '123456',
                    phone: '0916497870',
                    submit: null,
                    token: null
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('Name is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                    phone: Yup.string()
                        .min(10, 'Phone must be 10 characters')
                        .max(10, 'Phone must be 10 characters')
                        .trim()
                        .required('Phone is required')
                        .matches(/^\d+$/, 'Phone is not in correct format'),
                    code: Yup.number().required('Code is required'),

                    confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
                    token: Yup.string().required().nullable()
                })}
                // onSubmit={() => {}}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        register(_.omit(values, ['submit', 'confirm_password', 'token']))
                            .then((res) => {})
                            .catch((err) => {
                                toastService.showError({
                                    title: err.status,
                                    text: err.message,
                                    position: 'center-start'
                                });
                            });

                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                    } catch (err: any) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-name-register">Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-name-register"
                                value={values.name}
                                name="name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.name && errors.name && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.name}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-phone-register">Phone Number</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-phone-register"
                                type="text"
                                value={values.phone}
                                name="phone"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.phone && errors.phone && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.phone}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}
                        <FormControl
                            fullWidth
                            error={Boolean(touched.confirm_password && errors.confirm_password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-confirm_password-register">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-confirm_password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.confirm_password}
                                name="confirm_password"
                                label="Confirm Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    // changePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm_password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.confirm_password && errors.confirm_password && (
                                <FormHelperText error id="standard-weight-helper-text-confirm_password-register">
                                    {errors.confirm_password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.code && errors.code)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-code-register">Code</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-code-register"
                                type="text"
                                value={values.code}
                                name="code"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.code && errors.code && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.code}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.token && errors.token)} sx={{ ...theme.typography.customInput }}>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                onExpired={() => (recaptchaRef.current as any)?.reset()}
                                sitekey={process.env.REACT_APP_SITE_KEY!}
                                onChange={(value: any) => {
                                    setValues({ ...values, token: value });
                                }}
                                size="normal"
                                style={{ margin: '0 auto', display: 'table' }}
                            />
                        </FormControl>

                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ my: 2 }}>
                            <AnimateButton>
                                <Button
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ borderRadius: '8px' }}
                                >
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseRegister;

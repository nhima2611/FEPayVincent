// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import useAuth from 'hooks/useAuth';
// project imports
import useConfig from 'hooks/useConfig';
import useScriptRef from 'hooks/useScriptRef';
import React from 'react';
// third party
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from 'react-router-dom';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';

// ============================|| FIREBASE - LOGIN ||============================ //

const recaptchaRef: any = React.createRef();

const AuthLogin = ({ loginProp, ...others }: { loginProp?: number }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const { borderRadius } = useConfig();
    const [checked, setChecked] = React.useState(true);

    const { login } = useAuth();

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    return (
        <>
            <Formik
                initialValues={{
                    email: 'admin@gmail.com',
                    password: '123456',
                    token: null,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                    // token: Yup.string().required().nullable()
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        await login(values.email, values.password);

                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                    } catch (err: any) {
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
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email Address / Username"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
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
                                label="Password"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to={loginProp ? `/pages/forgot-password/forgot-password${loginProp}` : '/forgot'}
                                color="secondary"
                                sx={{ textDecoration: 'none' }}
                            >
                                Forgot Password?
                            </Typography>
                        </Stack>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                        {/* <FormControl fullWidth error={Boolean(touched.token && errors.token)} sx={{ ...theme.typography.customInput }}>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                onExpired={() => (recaptchaRef.current as any)?.reset()}
                                sitekey="6Lcb7MgeAAAAAB8bZdGoCps1MMat1mluOYSZFZeI"
                                onChange={(value: any) => {
                                    setValues({ ...values, token: value });
                                }}
                                size="normal"
                                style={{ margin: '0 auto', display: 'table' }}
                            />
                        </FormControl> */}
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
                                    Sign in
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;

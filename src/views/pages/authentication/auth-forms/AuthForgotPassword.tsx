// material-ui
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReplayIcon from '@mui/icons-material/Replay';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import {
    Alert,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    OutlinedInput,
    Stepper,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import React, { useState } from 'react';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import toastService from 'services/core/toast.service';
import Swal from 'sweetalert2';
import { StringColorProps } from 'types';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import * as Yup from 'yup';

// ========================|| FORGOT PASSWORD ||======================== //

const AuthForgotPassword = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const nativation = useNavigate();

    const [activeStep, setActiveStep] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorAlerts, setErrorAlerts] = useState<any>(null);
    const [verify, setVerify] = useState<number>(0);
    const [emailState, setEmail] = useState<string>('');

    const { resetPassword, forgotPassword, verifyCode } = useAuth();
    const onSubmitStep1 = (email: string) => {
        setLoading(true);
        setErrorAlerts(null);
        try {
            forgotPassword(email)
                .then((res) => {
                    setLoading(false);
                    if (!res.data.success) {
                        setErrorAlerts(
                            <Alert severity="error" className="mb-4">
                                {res.data.message} !
                            </Alert>
                        );
                    } else {
                        toastService.toast('success', 'Check mail for verify code', 'top');
                        setVerify(res.data.verify_code);
                        setEmail(email);
                        if (activeStep !== 1) {
                            setActiveStep(1);
                        }
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    setErrorAlerts(
                        <Alert severity="error" className="mb-4">
                            {err.data.message} !
                        </Alert>
                    );
                });
        } catch (err: any) {
            setLoading(false);
            setErrorAlerts(
                <Alert severity="error" className="mb-4">
                    {err.message} !
                </Alert>
            );
        }
    };
    const onSubmitStep2 = (code: number) => {
        setLoading(true);
        setErrorAlerts(null);
        try {
            verifyCode({ email: emailState, verify_code: code })
                .then((res) => {
                    setLoading(false);
                    if (!res.data.success) {
                        setErrorAlerts(
                            <Alert severity="error" className="mb-4">
                                {res.data.message} !
                            </Alert>
                        );
                    } else {
                        toastService.toast('success', res.data.message, 'top');
                        setVerify(code);
                        setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    setErrorAlerts(
                        <Alert severity="error" className="mb-4">
                            {err.message} !
                        </Alert>
                    );
                });
        } catch (err: any) {
            setLoading(false);
            setErrorAlerts(
                <Alert severity="error" className="mb-4">
                    {err.message} !
                </Alert>
            );
        }
    };
    const onSubmitStep3 = (data: { password: string; confirm_password: string }) => {
        setLoading(true);
        setErrorAlerts(null);
        try {
            resetPassword({ ...data, verify_code: verify, email: emailState })
                .then((res) => {
                    setLoading(false);
                    if (!res.data.success) {
                        setErrorAlerts(
                            <Alert severity="error" className="mb-4">
                                {res.message} !
                            </Alert>
                        );
                    } else {
                        toastService
                            .showSuccess({
                                toast: false,
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                icon: 'success',
                                title: 'Successfully',
                                text: res.data.message,
                                didOpen: (toast) => {
                                    toast.addEventListener('mouseenter', Swal.stopTimer);
                                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                                }
                            })
                            .then((value) => {
                                nativation(`/login`);
                            });
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    setErrorAlerts(
                        <Alert severity="error" className="mb-4">
                            {err.message} !
                        </Alert>
                    );
                });
        } catch (err: any) {
            setLoading(false);
            setErrorAlerts(
                <Alert severity="error" className="mb-4">
                    {err.message} !
                </Alert>
            );
        }
    };
    const reSubmitStep1 = () => onSubmitStep1(emailState);

    const renderStep = (step: number) => {
        switch (step) {
            case 0:
                return <Step1 loading={loading} onSubmit={onSubmitStep1} />;
            case 1:
                return <Step2 loading={loading} onSubmit={onSubmitStep2} reSubmitStep1={reSubmitStep1} />;
            case 2:
                return <Step3 loading={loading} onSubmit={onSubmitStep3} />;
            default:
                return <></>;
        }
    };
    return (
        <>
            {errorAlerts}
            <Stepper activeStep={activeStep} />
            <>{renderStep(activeStep)}</>
        </>
    );
};

const Step1 = ({ onSubmit, loading }: { onSubmit: (res) => void; loading: boolean }) => {
    const theme = useTheme();
    return (
        <Formik
            initialValues={{
                email: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
            })}
            onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                onSubmit(_.get(values, 'email'));
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-forgot">Email Address / Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-forgot"
                            type="email"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Email Address / Username"
                        />
                        {touched.email && errors.email && (
                            <FormHelperText error id="standard-weight-helper-text-email-forgot">
                                {errors.email}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <LoadingButton
                                disableElevation
                                disabled={loading}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="primary"
                                endIcon={<ArrowForwardIcon />}
                                loading={loading}
                                loadingPosition="end"
                            >
                                Send Mail
                            </LoadingButton>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

const Step2 = ({ onSubmit, loading, reSubmitStep1 }: { onSubmit: (res) => void; loading: boolean; reSubmitStep1: () => void }) => {
    const theme = useTheme();
    return (
        <Formik
            initialValues={{
                verify: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                verify: Yup.string()
                    .required('Verify code is required')
                    .max(5, 'Verify code must be at most 5 characters')
                    .min(5, 'Verify code must be at most 5 characters')
                    .length(5, 'Verify code must be at most 5 characters')
            })}
            onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                onSubmit(_.get(values, 'verify'));
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <FormControl fullWidth error={Boolean(touched.verify && errors.verify)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-verify-forgot">Verify Code</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-verify-forgot"
                            type="text"
                            value={values.verify}
                            name="verify"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Verify Code"
                            inputProps={{ maxLength: 5 }}
                            placeholder="xxxxx"
                            endAdornment={
                                <Countdown
                                    date={Date.now() + 60000 * 5}
                                    renderer={({ minutes, seconds, completed, formatted }) => (
                                        <>
                                            {!Boolean(loading) && (
                                                <div>
                                                    {/* {zeroPad(minutes)}:{zeroPad(seconds) */}
                                                    {Boolean(completed) ? (
                                                        <Button onClick={(e) => reSubmitStep1()}>
                                                            {' '}
                                                            <ReplayIcon /> Resend
                                                        </Button>
                                                    ) : (
                                                        `${formatted.minutes}:${formatted.seconds}`
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                />
                            }
                        />
                        {touched.verify && errors.verify && (
                            <FormHelperText error id="standard-weight-helper-text-verify-forgot">
                                {errors.verify}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormHelperText>
                        Email didn&apos;t arrive.{' '}
                        <Link onClick={(e) => reSubmitStep1()} color="secondary" sx={{ cursor: 'pointer' }}>
                            Resend!
                        </Link>
                    </FormHelperText>
                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <LoadingButton
                                disableElevation
                                disabled={loading}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="primary"
                                endIcon={<ArrowForwardIcon />}
                                loading={loading}
                                loadingPosition="end"
                            >
                                Next
                            </LoadingButton>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

const Step3 = ({ onSubmit, loading }: { onSubmit: (res) => void; loading: boolean }) => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = React.useState(false);

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
    return (
        <Formik
            initialValues={{
                password: '',
                confirm_password: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                password: Yup.string().max(255).required('Password is required'),
                confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
            })}
            onSubmit={(values) => {
                onSubmit(_.omit(values, 'submit'));
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
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
                                        <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
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

                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <LoadingButton
                                disableElevation
                                disabled={loading}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="primary"
                                loading={loading}
                                loadingPosition="end"
                            >
                                Submit
                            </LoadingButton>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default React.memo(AuthForgotPassword);

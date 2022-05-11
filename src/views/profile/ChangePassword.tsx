// material-ui
import { useTheme } from '@mui/material/styles';
import { Alert, AlertTitle, Button, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import toastService from 'services/core/toast.service';
import Swal from 'sweetalert2';
// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import React, { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';

// ==============================|| PROFILE 1 - CHANGE PASSWORD ||============================== //

const ChangePassword = () => {
    const nativation = useNavigate();
    const { user, changePassword } = useAuth();
    const theme = useTheme();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [Email, setEmail] = useState(user?.email);
    const isValidPasswordRegex = /^[a-z]+$/;
    const [valid, setValid] = useState(false);
    const validatePassword = (value) => {
        if (!isValidPasswordRegex.test(value)) {
            setValid(false);
        } else {
            setValid(true);
        }
    };
    useEffect(() => {
        // Update the document title using the browser API
    }, [currentPassword, newPassword, newPasswordConfirm]);
    const clearFunction = () => {
        setCurrentPassword('');
        setNewPassword('');
        setNewPasswordConfirm('');
    };
    const handleSubmit = () => {
        changePassword({
            current_password: currentPassword,
            new_password: newPassword,
            new_password_confirm: newPasswordConfirm,
            email: Email as any
        }).then((result) => {
            if (result.data.error === 0) {
                toastService
                    .showSuccess({
                        toast: false,
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        icon: 'success',
                        title: result.data.message,

                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer);
                            toast.addEventListener('mouseleave', Swal.resumeTimer);
                        }
                    })
                    .then((value) => {
                        setCurrentPassword('');
                        setNewPassword('');
                        setNewPasswordConfirm('');
                        window.location.reload();
                    });
            } else if (result.data.error === 1) {
                toastService.showError({
                    toast: false,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    icon: 'error',
                    title: result.data.message,

                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer);
                        toast.addEventListener('mouseleave', Swal.resumeTimer);
                    }
                });
            } else if (result.data.error === 2) {
                toastService.showError({
                    toast: false,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    icon: 'error',
                    title: result.data.message,

                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer);
                        toast.addEventListener('mouseleave', Swal.resumeTimer);
                    }
                });
            } else {
                toastService.showError({
                    toast: false,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    icon: 'error',
                    title: result.data.message,

                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer);
                        toast.addEventListener('mouseleave', Swal.resumeTimer);
                    }
                });
            }
        });
    };
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard title="Change Password">
                    <form noValidate autoComplete="off">
                        <Grid container spacing={gridSpacing} sx={{ mb: 1.75 }}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    required
                                    type="password"
                                    id="outlined-basic7"
                                    onChange={(e) => {
                                        setCurrentPassword(e.target.value);
                                    }}
                                    value={currentPassword}
                                    name="current_password"
                                    fullWidth
                                    label="Current Password"
                                />
                                {currentPassword.length === 0 && <p style={{ color: 'red' }}>This field is required</p>}
                                {currentPassword.length > 0 && currentPassword.length < 8 && (
                                    <p style={{ color: 'red' }}>This field must have more than 7 characters </p>
                                )}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    type="password"
                                    required
                                    id="outlined-basic8"
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                    }}
                                    value={newPassword}
                                    name="new_password"
                                    fullWidth
                                    label="New Password"
                                />
                                {newPassword.length === 0 && <p style={{ color: 'red' }}>This field is required</p>}
                                {newPassword.length > 0 && newPassword.length < 8 && (
                                    <p style={{ color: 'red' }}>This field must have more than 7 characters </p>
                                )}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    type="password"
                                    required
                                    id="outlined-basic9"
                                    onChange={(e) => {
                                        setNewPasswordConfirm(e.target.value);
                                    }}
                                    value={newPasswordConfirm}
                                    name="new_password_confirm"
                                    fullWidth
                                    label="Confirm Password"
                                />
                                {newPasswordConfirm.length === 0 && <p style={{ color: 'red' }}>This field is required</p>}
                                {newPasswordConfirm.length > 0 && newPasswordConfirm.length < 8 && (
                                    <p style={{ color: 'red' }}>This field must have more than 7 characters </p>
                                )}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <input type="hidden" id="outlined-basic10" value={Email} name="email" />
                            </Grid>
                        </Grid>

                        <Grid spacing={2} container justifyContent="flex-end" sx={{ mt: 3 }}>
                            <Grid item>
                                <AnimateButton>
                                    <Button onClick={handleSubmit} variant="contained">
                                        Change Password
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item>
                                <Button onClick={clearFunction} sx={{ color: theme.palette.error.main }}>
                                    Clear
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default ChangePassword;

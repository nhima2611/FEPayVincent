import { FormControl, FormHelperText, InputLabel, TextField, TextFieldProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FormikProps } from 'formik';
import React from 'react';

interface Props {
    formik: FormikProps<any>;
    label: string;
    name: string;
    required?: boolean;
    type?: React.HTMLInputTypeAttribute | undefined;
    inputProps?: TextFieldProps;
}

const FETextField = ({
    formik: { errors, handleBlur, handleChange, touched, values, setValues },
    type,
    label,
    name,
    required,
    inputProps
}: Props) => {
    const theme = useTheme();

    return (
        <>
            <InputLabel sx={{ color: '#4C4C4C', fontWeight: 'bold' }} required={required} htmlFor={name}>
                {label}
            </InputLabel>
            <FormControl fullWidth error={Boolean(touched[`${name}`] && errors[`${name}`])} sx={{ ...theme.typography.customInput }}>
                {/* <InputLabel required={required} htmlFor={name} shrink>
                    {label}
                </InputLabel> */}
                <TextField
                    {...inputProps}
                    id={name}
                    value={values[`${name}`]}
                    name={name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type={type || 'text'}
                    inputProps={{
                        style: {
                            borderRadius: 8,
                            border: '1px solid',
                            borderColor: '#e5e5e5',
                            padding: `0px 0px !important`
                        }
                    }}
                />
                {touched[`${name}`] && errors[`${name}`] && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                        {errors[`${name}`]}
                    </FormHelperText>
                )}
            </FormControl>
        </>
    );
};

export default FETextField;

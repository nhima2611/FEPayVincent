import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { FormControl, FormHelperText, InputLabel, TextField, TextFieldProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FormikProps } from 'formik';
import React, { useState } from 'react';

interface Props {
    formik: FormikProps<any>;
    label: string;
    name: string;
    required?: boolean;
    inputProps?: TextFieldProps;
}

const FEDatePickerField = ({
    formik: { errors, handleBlur, handleChange, touched, values, setValues },
    label,
    name,
    required,
    inputProps
}: Props) => {
    const theme = useTheme();

    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <InputLabel sx={{ color: '#4C4C4C', fontWeight: 'bold' }} required={required} htmlFor={name}>
                {label}
            </InputLabel>
            <FormControl fullWidth error={Boolean(touched[`${name}`] && errors[`${name}`])} sx={{ ...theme.typography.customInput }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        value={values[`${name}`]}
                        onChange={(newValue) => {
                            values[`${name}`] = newValue;
                            setValues({ ...values });
                        }}
                        allowSameDateSelection
                        renderInput={(params) => <TextField {...params} id={name} name={name} onClick={(e) => setOpen(true)} />}
                    />
                </LocalizationProvider>
                {touched[`${name}`] && errors[`${name}`] && (
                    <FormHelperText error id={`${name}--error`}>
                        {errors[`${name}`]}
                    </FormHelperText>
                )}
            </FormControl>
        </>
    );
};

export default FEDatePickerField;

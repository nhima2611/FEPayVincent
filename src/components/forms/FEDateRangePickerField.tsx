import { DateRange, DateRangePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Box, FormControl, FormHelperText, InputLabel, TextField, TextFieldProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FormikProps } from 'formik';
import React from 'react';

interface Props {
    formik: FormikProps<any>;
    label: string;
    nameFrom: string;
    nameTo: string;
    required?: boolean;
    inputProps?: TextFieldProps;
}

const FEDateRangePickerField = ({
    formik: { errors, handleBlur, handleChange, touched, values, setValues },
    label,
    nameFrom,
    nameTo,
    required,
    inputProps
}: Props) => {
    const theme = useTheme();
    const [value, setValue] = React.useState<Date | null>(null);

    return (
        <>
            <InputLabel sx={{ color: '#4C4C4C', fontWeight: 'bold' }} required={required} htmlFor={nameFrom}>
                {label}
            </InputLabel>
            <FormControl
                fullWidth
                error={Boolean(touched[`${nameFrom}`] && errors[`${nameFrom}`])}
                sx={{ ...theme.typography.customInput }}
            >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                        value={[values[`${nameFrom}`], values[`${nameTo}`]] as DateRange<Date>}
                        onChange={(newValue) => {
                            if (!inputProps?.disabled) {
                                values[`${nameFrom}`] = newValue[0];
                                values[`${nameTo}`] = newValue[1];
                                setValues({ ...values });
                            }
                        }}
                        readOnly={inputProps?.disabled}
                        showToolbar
                        renderInput={(startProps, endProps) => (
                            <>
                                <TextField {...startProps} label={null} sx={{ textAlign: 'center' }} fullWidth />
                                <Box sx={{ mx: 1 }}> to </Box>
                                <TextField {...endProps} label={null} sx={{ textAlign: 'center' }} fullWidth />
                                {/* <TextField
                                    {...startProps}
                                    {...inputProps}
                                    type="text"
                                    label={null}
                                    id={nameFrom}
                                    value={`${values[`${nameFrom}`]} - ${values[`${nameTo}`]}`}
                                    name={nameFrom}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                /> */}
                            </>
                        )}
                    />
                </LocalizationProvider>
                {touched[`${nameFrom}`] && errors[`${nameFrom}`] && (
                    <FormHelperText error id={`${nameFrom}--error`}>
                        {errors[`${nameFrom}`]}
                    </FormHelperText>
                )}
            </FormControl>
        </>
    );
};

export default FEDateRangePickerField;

import { InputLabel, Stack, TextField } from '@mui/material';

const FETextField = ({ formik, title, disabled = false, name = '', ...rest }) => {
    return (
        <Stack spacing={1}>
            <InputLabel sx={{ color: disabled ? '#CCCCCC' : '#4C4C4C', fontWeight: 700 }}>{title}</InputLabel>
            <TextField
                fullWidth
                name={name}
                value={formik.values[name]}
                onBlur={formik.handleBlur}
                error={formik.touched[name] && Boolean(formik.errors[name])}
                helperText={formik.touched[name] && formik.errors[name]}
                onChange={formik.handleChange}
                disabled={disabled}
                {...rest}
            />
        </Stack>
    );
};

export default FETextField;

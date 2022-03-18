import { FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { map } from 'lodash';

interface Props {
    formik: any;
    title: string;
    data?: any;
    name?: string;
    disabled?: boolean;
}
const FEDropDown = ({ formik, title = '', data = {}, name = '', disabled }: Props) => {
    return (
        <Stack spacing={1}>
            <InputLabel sx={{ color: disabled ? '#CCCCCC' : '#4C4C4C', fontWeight: 700 }}>{title}</InputLabel>
            <Select
                id={name}
                name={name}
                defaultValue={formik.values[name]}
                value={formik.values[name]}
                onChange={formik.handleChange}
                disabled={disabled}
            >
                {map(data, (key, value) => (
                    <MenuItem key={value} value={_.toNumber(value)}>
                        {key}
                    </MenuItem>
                ))}
            </Select>
            {formik.errors[name] && <FormHelperText error>{formik.errors[name]}</FormHelperText>}
        </Stack>
    );
};

export default FEDropDown;

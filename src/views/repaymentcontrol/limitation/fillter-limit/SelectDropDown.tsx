import { FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { map } from 'lodash';
import React from 'react';

interface Props {
    formik: any;
    title: string;
    data?: any[];
}
const SelectDropDown = ({ formik, title = '', data = [] }: Props) => {
    return (
        <Stack>
            <InputLabel sx={{ color: '#4C4C4C', fontWeight: 'bold', marginBottom: 1 }}>{title}</InputLabel>
            <Select
                style={{ height: 36, fontSize: 12, color: 'red !important' }}
                id="orderStatus"
                name="orderStatus"
                defaultValue={formik.values.orderStatus}
                value={formik.values.orderStatus}
                onChange={formik.handleChange}
            >
                {map(data, (item, index) => (
                    <MenuItem key={index} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </Select>
            {formik.errors.orderStatus && <FormHelperText error>{formik.errors.orderStatus}</FormHelperText>}
        </Stack>
    );
};

export default SelectDropDown;

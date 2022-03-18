import { SelectProps } from '@mui/material';
import FEMultipleSelect, { FEMultipleSelectHandlerProps } from 'components/forms/FEMultipleSelect';
import { FormikProps } from 'formik';
import React from 'react';

interface Props {
    formik: FormikProps<any>;
    name: string;
    required?: boolean;
    selectProps?: SelectProps & FEMultipleSelectHandlerProps;
}

const FEMultipleSelectSubPartner = ({
    formik: { errors, handleBlur, handleChange, touched, values, setValues },
    name,
    required,
    selectProps
}: Props) => {
    return (
        <FEMultipleSelect
            name={name}
            helperText={errors[`${name}`]}
            error={touched[`${name}`] && errors[`${name}`]}
            selectProps={{
                ...selectProps,
                sx: { height: 300 },
                label: 'Sub-Partners'
            }}
            api="/v1/partners/subPartners?order_by=created_at&sorted_by=desc&status=1"
        />
    );
};

export default FEMultipleSelectSubPartner;

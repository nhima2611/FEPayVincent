import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FormikProps } from 'formik';
import React from 'react';
import { useAsync } from 'react-use';
import axiosServices from 'utils/axios';

interface SelectDataSource {
    id: any;
    name: any;
}
export interface TSelectHandlerProps {
    value?: any;
    onSelectValue?: (value?: any) => void;
    required?: boolean;
    notAllowSelectNull?: boolean;
}
interface Props {
    formik: FormikProps<any>;
    label: string;
    name: string;
    required?: boolean;
    selectProps?: SelectProps & TSelectHandlerProps;
    dataSource?: SelectDataSource[];
    api?: string;
    transformFn?: (item: any) => any;
    renderItem?: (item: any, index: number) => any;
    handleSelect?: (value: any) => void;
}

const FESelect = ({
    formik: { errors, handleBlur, handleChange, touched, values, setValues },
    label,
    name,
    required,
    selectProps,
    dataSource,
    api,
    transformFn,
    renderItem,
    handleSelect
}: Props) => {
    const theme = useTheme();
    const { value: data, loading } = useAsync(() => {
        if (api && !_.some(dataSource))
            return axiosServices.get(api).then((result) => {
                if (_.isFunction(transformFn)) return _.map(result.data, transformFn) as SelectDataSource[];
                return result.data as SelectDataSource[];
            });

        return Promise.resolve(dataSource!);
    }, [api, dataSource]);
    return (
        <>
            <InputLabel sx={{ color: selectProps?.disabled ? '#CCCCCC' : '#4C4C4C', fontWeight: '700' }} required={required} htmlFor={name}>
                {label}
            </InputLabel>
            <FormControl fullWidth error={Boolean(touched[`${name}`] && errors[`${name}`])} sx={{ ...theme.typography.customInput }}>
                <Select
                    {...{ ...selectProps, onSelectValue: {} }}
                    value={selectProps?.value}
                    name={name}
                    onChange={(e) => (handleSelect ? handleSelect?.(_.find(data, ['id', e.target.value])) : handleChange(e))}
                    onBlur={(e) => (handleSelect ? handleSelect?.(_.find(data, ['id', e.target.value])) : handleChange(e))}
                    defaultValue=""
                >
                    {!selectProps?.notAllowSelectNull && (
                        <MenuItem value={null as any}>
                            <em>None</em>
                        </MenuItem>
                    )}
                    {_.isFunction(renderItem)
                        ? _.map(data, renderItem)
                        : _.map(data, (item, index) => (
                              <MenuItem value={item.id} key={index}>
                                  {item.name}
                              </MenuItem>
                          ))}
                </Select>
                {touched[`${name}`] && errors[`${name}`] && (
                    <FormHelperText error id={`${name}--error`}>
                        {errors[`${name}`]}
                    </FormHelperText>
                )}
            </FormControl>
        </>
    );
};

export default FESelect;

/* eslint-disable react/destructuring-assignment */
import {
    Checkbox,
    Chip,
    createStyles,
    FormControl,
    FormHelperText,
    InputLabel,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    SelectProps
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import classNames from 'classnames';
import React, { FC } from 'react';
import { useAsync } from 'react-use';
import axiosServices from 'utils/axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const useStyles: any = createStyles((theme: any) => ({
    formControl: {
        margin: 15,
        width: 300
    },
    indeterminateColor: {
        color: '#f50057'
    },
    selectAllText: {
        fontWeight: 500
    },
    selectedAll: {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)'
        }
    }
}));

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    },
    getContentAnchorEl: null,
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center'
    },
    transformOrigin: {
        vertical: 'top',
        horizontal: 'center'
    },
    variant: 'menu'
};

interface SelectDataSource {
    id: any;
    name: any;
}

export interface FEMultipleSelectHandlerProps {
    values?: any[];
    onSelectValues?: (values: any[]) => void;
    required?: boolean;
}

export interface FEMultipleSelectProps {
    selectProps?: SelectProps & FEMultipleSelectHandlerProps;
    dataSource?: SelectDataSource[];
    api?: string;
    error?: boolean | any;
    helperText?: string | any;
    transformFn?: (item: any) => any;
    renderLabel?: (item: any, index: number) => any;
    renderValueLabel?: (item: any, index: any) => any;
    className?: string;
    endAdornment?: React.ReactNode;
    name: string;
    required?: boolean;
}

const FEMultipleSelect: FC<FEMultipleSelectProps> = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const { value: data = [], loading } = useAsync(() => {
        if (props.api && !_.some(props.dataSource))
            return axiosServices.get(props.api).then((result) => {
                if (_.isFunction(props.transformFn)) return _.map(result.data, props.transformFn) as SelectDataSource[];

                return result.data.data as SelectDataSource[];
            });

        return Promise.resolve(props.dataSource!);
    }, [props.api, props.dataSource]);

    const isAllSelected = data.length > 0 && _.get(props.selectProps, 'values.length') === data.length;

    const dataDict = _.keyBy(data, 'id');

    const handleChange = (event: any) => {
        const { value } = event.target;
        if (value[value.length - 1] === 'all') {
            props.selectProps?.onSelectValues?.(_.get(props.selectProps, 'values.length') === data.length ? [] : _.map(data, 'id'));
            return;
        }

        props.selectProps?.onSelectValues?.(value);
    };

    return (
        <FormControl fullWidth error={props.error} sx={{ ...theme.typography.customInput }}>
            <InputLabel required={props.required} htmlFor={props.name}>
                {props.selectProps?.label}
            </InputLabel>
            <Select
                labelId="multiple-select-label"
                multiple
                endAdornment={props.endAdornment}
                className={classNames({ 'select-filled': _.some(props.selectProps?.values) }, props.className)}
                value={_.map(props.selectProps?.values)}
                onChange={handleChange}
                renderValue={(selected: any[]) =>
                    _.map(selected, (id: any, idx: number) => {
                        const selectedValue = _.get(dataDict, id) as any;

                        if (!selectedValue) return null;

                        if (_.isFunction(props.renderValueLabel)) return props.renderValueLabel(selectedValue, idx);

                        return <Chip key={idx} className="mr-2" label={_.get(selectedValue, 'name', '') ?? ''} />;
                    }).filter(Boolean)
                }
                MenuProps={MenuProps as any}
            >
                <MenuItem
                    value="all"
                    classes={{
                        root: isAllSelected ? classes.selectedAll : ''
                    }}
                >
                    <ListItemIcon>
                        <Checkbox
                            classes={{ indeterminate: classes.indeterminateColor }}
                            checked={isAllSelected}
                            indeterminate={
                                _.get(props.selectProps, 'values.length') > 0 && _.get(props.selectProps, 'values.length') < data.length
                            }
                        />
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.selectAllText }} primary="Select All" />
                </MenuItem>
                {_.map(data, (option, idx: number) => {
                    console.log(props.selectProps?.values);
                    return (
                        <MenuItem key={idx} value={option.id}>
                            <ListItemIcon>
                                <Checkbox checked={_.indexOf(props.selectProps?.values, option.id) > -1} />
                            </ListItemIcon>
                            <ListItemText primary={_.isFunction(props.renderLabel) ? props.renderLabel(option, idx) : option.name} />
                        </MenuItem>
                    );
                })}
            </Select>
            <FormHelperText error>{props?.helperText}</FormHelperText>
        </FormControl>
    );
};

export default FEMultipleSelect;

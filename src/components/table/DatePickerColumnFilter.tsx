import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

export const DatePickerColumnFilter = ({ column: { filterValue, setFilter } }) => {
    useEffect(() => {
        if (filterValue === 'Invalid date' || filterValue === undefined) {
            setFilter('');
        }
    }, [filterValue]);

    const [focused, setFocused] = useState(false);
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    const onChange = _.debounce(
        (newValue: Date | null) => {
            setFilter(newValue);
        },
        focused ? 1500 : 0,
        {
            maxWait: 1500
        }
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                inputFormat="dd/MM/yyyy"
                renderInput={({ inputRef, inputProps, InputProps }) => {
                    return (
                        <Stack
                            ref={inputRef}
                            direction="row"
                            alignItems="center"
                            sx={{ border: 1, borderRadius: 2, height: 35, padding: '0px 8px' }}
                        >
                            <input
                                onFocus={onFocus}
                                onBlur={onBlur}
                                style={{ border: 'none', outline: 'none', width: 100 }}
                                value={moment(filterValue).format('DD/MM/YYYY')}
                                disabled
                            />
                            {InputProps?.endAdornment}
                        </Stack>
                    );
                }}
                value={filterValue || ''}
                onChange={onChange}
            />
        </LocalizationProvider>
    );
};

import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { MenuItem, OutlinedInput, Select, Stack } from '@mui/material';
import FETable from 'components/FETable';
import { camelCase, startCase } from 'lodash';
import React, { useEffect } from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { issueType, lastStatusType, productTypes, requestedBy, transactionType } from '../constant';

const TicketList = ({ data = [], pageCount, fetchData, loading, cols = [], onClickRowItem }) => {
    const productsColumns = React.useMemo(
        () =>
            cols[0]
                ? cols.map((key) => {
                      // if (key === "user_id")
                      //   return {
                      //     Header: key,
                      //     accessor: key,
                      //     Cell: ({ value }) => <img src={value} />,
                      //     maxWidth: 70,
                      //   };,
                      const typeSelect = ['last_status', 'transaction_type', 'issue_type', 'product_type', 'requested_by'].includes(key);
                      const dateSelect = ['created_date', 'last_status_date'].includes(key);
                      return {
                          Header: startCase(camelCase(key)),
                          accessor: key,
                          Filter: typeSelect ? SelectColumnFilter : dateSelect ? DatePickerColumnFilter : DefaultColumnFilter
                      };
                  })
                : [],
        [cols]
    );

    const productsData = React.useMemo(() => [...data], [data]);

    return (
        <MainCard content={false} border={false}>
            {loading ? (
                <div>loading...</div>
            ) : (
                <FETable
                    onClickRowItem={onClickRowItem}
                    data={productsData}
                    columns={productsColumns}
                    loading={loading}
                    fetchData={fetchData}
                    pageCount={pageCount}
                />
            )}
        </MainCard>
    );
};

export default TicketList;

const SelectColumnFilter = ({ column: { filterValue, setFilter, id } }) => {
    const dataSelect =
        id === 'last_status'
            ? lastStatusType
            : id === 'transaction_type'
            ? transactionType
            : id === 'issue_type'
            ? issueType
            : id === 'product_type'
            ? productTypes
            : id === 'requested_by'
            ? requestedBy
            : [];

    return (
        <Select
            id="category"
            value={filterValue || ''}
            onChange={(e) => {
                setFilter(e.target.value);
            }}
            sx={{ height: 28, fontSize: 10, borderRadius: 8, width: '100%' }}
        >
            <MenuItem value="">All</MenuItem>
            {_.map(dataSelect, (key, value) => {
                return (
                    <MenuItem key={value} value={value.toString()}>
                        {key || 'N/A'}
                    </MenuItem>
                );
            })}
        </Select>
    );
};

export const DefaultColumnFilter = ({ column: { filterValue, setFilter } }) => {
    const onChange = (e) => {
        setFilter(e.target.value);
    };
    return (
        <OutlinedInput
            value={filterValue || ''}
            onChange={onChange}
            sx={{ height: 28, fontSize: 10, borderRadius: 8 }}
            placeholder="input"
        />
    );
};

export const DatePickerColumnFilter = ({ column: { filterValue, setFilter } }) => {
    useEffect(() => {
        if (filterValue === 'Invalid date') {
            setFilter('');
        }
    }, [filterValue]);

    const [focused, setFocused] = React.useState(false);
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
                renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Stack direction="row" alignItems="center">
                        <input
                            ref={inputRef}
                            {...inputProps}
                            style={{ height: 28, fontSize: 10, borderRadius: 8, border: '1px solid gray', padding: 4 }}
                            onFocus={onFocus}
                            onBlur={onBlur}
                        />
                        {InputProps?.endAdornment}
                    </Stack>
                )}
                value={filterValue || ''}
                onChange={onChange}
            />
        </LocalizationProvider>
    );
};

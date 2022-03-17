import { DatePicker, LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { MenuItem, OutlinedInput, Select, Stack, TextField } from '@mui/material';
import FETable from 'components/FETable';
import { camelCase, startCase } from 'lodash';
import React, { useEffect } from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { getColorAndNameStatus, issueType, lastStatusType, productTypes, requestedBy, transactionType } from 'constants/tickets';

const renderValue = (key: string, value: any) => {
    const isDateType = ['created_date', 'last_status_date'].includes(key);
    const isStatusType = ['last_status'].includes(key);
    const isTransactionType = ['transaction_type'].includes(key);
    const isIssueType = ['issue_type'].includes(key);
    const isProductType = ['product_type'].includes(key);
    const isRequestedByType = ['requested_by'].includes(key);

    if (isDateType) return moment(value).format('DD/MM/YYYY');
    if (isStatusType) return _.get(lastStatusType, [value]);
    if (isTransactionType) return _.get(transactionType, [value]);
    if (isIssueType) return _.get(issueType, [value]);
    if (isProductType) return _.get(productTypes, [value]);
    if (isRequestedByType) return _.get(requestedBy, [value]);
    return value;
};

const TicketList = ({ data = [], loading, cols = [], onClickRowItem }) => {
    const productsColumns = React.useMemo(
        () =>
            cols[0]
                ? cols.map((key) => {
                      const typeSelect = ['last_status', 'transaction_type', 'issue_type', 'product_type', 'requested_by'].includes(key);
                      const dateSelect = ['created_date', 'last_status_date'].includes(key);
                      const isStatusType = ['last_status'].includes(key);

                      return {
                          Header: startCase(camelCase(key)),
                          accessor: key,
                          Cell: ({ value }) => (
                              <div
                                  style={{
                                      color: isStatusType ? getColorAndNameStatus(value)?.color : 'black',
                                      minWidth: 200,
                                      maxHeight: 40,
                                      overflow: 'hidden'
                                  }}
                              >
                                  {renderValue(key, value)}
                              </div>
                          ),
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
                <FETable rowId="ticket_id" showCustomFilter onClickRowItem={onClickRowItem} data={productsData} columns={productsColumns} />
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
            sx={{ height: 35, borderRadius: 8, width: '100%' }}
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
    return <OutlinedInput value={filterValue || ''} onChange={onChange} sx={{ height: 35, borderRadius: 8 }} />;
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
                    <Stack direction="row" alignItems="center" sx={{ border: 1, borderRadius: 2, height: 35, padding: '0px 8px' }}>
                        <input
                            ref={inputRef}
                            {...inputProps}
                            style={{ border: 'none', outline: 'none' }}
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

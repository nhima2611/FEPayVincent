import { DatePickerColumnFilter } from 'components/table/DatePickerColumnFilter';
import { DefaultColumnFilter } from 'components/table/DefaultColumnFilter';
import FETable from 'components/table/FETable';
import { SelectColumnFilter } from 'components/table/SelectColumnFilter';
import { getColorAndNameStatus, issueType, lastStatusType, productTypes, requestedBy, transactionType } from 'constants/tickets';
import { camelCase, startCase } from 'lodash';
import React from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';

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

const dataSelect = (id: string) =>
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

const WaitingList = ({ data = [], loading, cols = [], onClickRowItem }) => {
    const productsColumns = React.useMemo(
        () =>
            cols[0]
                ? cols.map((key) => {
                      const typeSelect = ['last_status', 'transaction_type', 'issue_type', 'product_type', 'requested_by'].includes(key);
                      const dateSelect = ['created_date', 'last_status_date'].includes(key);
                      const isStatusType = ['last_status'].includes(key);
                      const WIDTH_130 = [
                          'contract_id',
                          'ref_number',
                          'created_date',
                          'last_status_date',
                          'last_status',
                          'product_type'
                      ].includes(key);
                      const WIDTH_160 = ['transaction_type'].includes(key);
                      const WIDTH_190 = ['ticket_id', 'issue_type'].includes(key);

                      return {
                          Header: startCase(camelCase(key)),
                          accessor: key,
                          minWidth: WIDTH_130 ? 130 : WIDTH_160 ? 160 : WIDTH_190 ? 190 : 200,
                          Cell: ({ value }) => (
                              <div
                                  style={{
                                      color: isStatusType ? getColorAndNameStatus(value)?.color : 'black',
                                      maxHeight: 65,
                                      overflow: 'hidden'
                                  }}
                              >
                                  {renderValue(key, value)}
                              </div>
                          ),
                          Filter: typeSelect
                              ? (props) => <SelectColumnFilter {...props} dataSelect={dataSelect} />
                              : dateSelect
                              ? DatePickerColumnFilter
                              : DefaultColumnFilter
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
                    hiddenColumns={['id']}
                    rowId="id"
                    showCustomFilter
                    onClickRowItem={onClickRowItem}
                    data={productsData}
                    columns={productsColumns}
                />
            )}
        </MainCard>
    );
};

export default WaitingList;

import FETable from 'components/FETable';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { KanbanItem } from 'types/kanban';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import eventEmitter from 'utils/eventEmitter';

const TicketList = () => {
    const navi = useNavigate();

    const onClickRowItem = (row) => {
        navi(row.id);
    };

    const onDataFilter = (data) => {
        console.log('onDataFilter', data);
    };

    useEffect(() => {
        eventEmitter.addListener('SEARCH_TICKET_LIST', onSearch);

        return () => {
            // eventEmitter.removeListener('SEARCH_TICKET_LIST', () => {});
        };
    }, []);

    const onSearch = ({ value }) => console.log(value);

    return (
        <MainCard content={false} border={false}>
            <FETable headCells={headCells} rows={rows} onClickRowItem={onClickRowItem} onDataFilter={onDataFilter} />
        </MainCard>
    );
};

export default TicketList;

function createData(
    id: string,
    ticketID: number,
    contractID: number,
    refID: number,
    createdDate: any,
    modifiedDate: any,
    status: any,
    partner: string,
    assignee?: string,
    supporter?: string,
    transactionType?: 'Repayment' | 'Disbursement',
    issueType?: 'Cancel transaction' | 'Adjust Amount' | 'Adjust Contract Number' | 'System Issue',
    productType?: 'Loan' | 'Card' | 'Banca',
    requestedBy?: string
) {
    return {
        id,
        ticketID,
        contractID,
        refID,
        createdDate,
        modifiedDate,
        status,
        partner,
        assignee,
        supporter,
        transactionType,
        issueType,
        productType,
        requestedBy
    };
}

const rows: KanbanItem[] = [
    createData(
        '1',
        12345,
        12345,
        12345,
        '25/2/2022',
        '27/2/2022',
        'New',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '2',
        12345,
        12345,
        12345,
        '25/2/2022',
        '27/2/2022',
        'On-Hold',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '3',
        12345,
        12345,
        12345,
        '25/2/2022',
        '27/2/2022',
        'New',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '4',
        12345,
        12345,
        12345,
        '25/2/2022',
        '27/2/2022',
        'New',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '5',
        12345,
        12345,
        12345,
        '25/2/2022',
        '27/2/2022',
        'New',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '11',
        12345,
        12345,
        12345,
        '25/2/2022',
        '27/2/2022',
        'New',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '22',
        12345,
        12345,
        12345,
        '25/2/2022',
        '27/2/2022',
        'New',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '33',
        12345,
        12345,
        12345,
        '25/2/2022',
        '27/2/2022',
        'New',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '44',
        12345,
        12345,
        12345,
        '25/2/2022',
        '27/2/2022',
        'New',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    ),
    createData(
        '55',
        123452,
        1234533,
        123453,
        '25/2/2022',
        '27/2/2022',
        'New',
        'Payoo',
        'Nguyen Tran Thu Trang',
        'Pham Nguyen Huong Giang',
        'Repayment',
        'Adjust Amount',
        'Loan',
        'Tran Thu Anh'
    )
];

// table header
const headCells: any[] = [
    {
        id: 'id',
        numeric: false,
        label: 'ID'
    },
    {
        id: 'ticketID',
        numeric: false,
        label: 'Ticket ID'
    },
    {
        id: 'contractID',
        numeric: true,
        disablePadding: false,
        label: 'Contract ID'
    },
    {
        id: 'ref',
        numeric: true,
        disablePadding: false,
        label: 'Ref#'
    },
    {
        id: 'createdDate',
        numeric: true,
        disablePadding: false,
        label: 'Created Date'
    },
    {
        id: 'ModifiedDate',
        numeric: true,
        disablePadding: false,
        label: 'Modified Date'
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Status',
        type: 'select'
    },
    {
        id: 'Partner',
        numeric: true,
        disablePadding: false,
        label: 'Partner'
    },
    {
        id: 'Assignee',
        numeric: true,
        disablePadding: false,
        label: 'Assignee'
    },
    {
        id: 'Supporter',
        numeric: true,
        disablePadding: false,
        label: 'Supporter'
    },
    {
        id: 'TransactionType',
        numeric: true,
        disablePadding: false,
        label: 'Transaction Type'
    },
    {
        id: 'IssueType',
        numeric: true,
        disablePadding: false,
        label: 'Issue Type'
    },
    {
        id: 'ProductType',
        numeric: true,
        disablePadding: false,
        label: 'Product Type'
    },
    {
        id: 'RequestedBy',
        numeric: true,
        disablePadding: false,
        label: 'Requested By'
    }
];

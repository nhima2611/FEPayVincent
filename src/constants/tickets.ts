import { STATUS, STATUS_NAME } from 'constants/status';

const transactionType = { 1: 'Repayment', 2: 'Disbursement' };

const issueType = {
    1: 'Cancel transaction',
    2: 'Adjust Amount',
    3: 'Adjust Contract Number',
    4: 'System Issue'
};

const subIssueType = {
    1: 'From Loan to Loan',
    2: 'From Loan to Card',
    3: 'From Card to Loan',
    4: 'From Card to Card',
    5: 'From Banca to Loan',
    6: 'From Banca to Card',
    7: 'Ect'
};

const productTypeRightContractNumberType = {
    1: 'Loan',
    2: 'Card'
};

const productTypeWrongContractNumberType = {
    1: 'Loan',
    2: 'Card',
    3: 'Banca'
};

const requestedBy = {
    1: 'By Teller’s mistake',
    2: 'By Customer’s request',
    3: 'By Banca’s team'
};

const productTypes = {
    1: 'Loan',
    2: 'Card',
    3: 'Banca'
};

const actionTicketTypes = {
    0: 'None',
    1: 'Move To Card',
    2: 'Move To Loan'
};

const lastStatusType = {
    0: 'Draft',
    1: 'New',
    2: 'Processing',
    3: 'Reverted',
    4: 'Solved',
    5: 'Rejected',
    6: 'Canceled'
};

const getColorAndNameStatus = (status: number) => {
    let color = '';
    let name = '';
    switch (status) {
        case STATUS.DRAFT:
            color = '#808080';
            name = 'Draft';
            break;
        case STATUS.NEW:
            color = '#2F80ED';
            name = 'New';
            break;
        case STATUS.PROCESSING:
            color = '#BB6BD9';
            name = 'Processing';
            break;
        case STATUS.REVERTED:
            color = '#F8D548';
            name = 'Reverted';
            break;
        case STATUS.SOLVED:
            color = '#27AE60';
            name = 'Solved';
            break;
        case STATUS.REJECTED:
            color = '#FF0015';
            name = 'Rejected';
            break;
        case STATUS.CANCELED:
            color = '#F2994A';
            name = 'Cancel';
            break;
        default:
            color = '#000000';
            name = 'N/A';
            break;
    }
    return { color, name };
};

const columnIdsData = {
    column1: 'column-1',
    column2: 'column-2',
    column3: 'column-3',
    column4: 'column-4',
    column5: 'column-5',
    column6: 'column-6',
    column7: 'column-7'
};

const columnsOrderData: string[] = [
    columnIdsData.column1,
    columnIdsData.column2,
    columnIdsData.column3,
    columnIdsData.column4,
    columnIdsData.column5,
    columnIdsData.column6,
    columnIdsData.column7
];

const columnsData: any[] = [
    {
        id: columnIdsData.column1,
        title: STATUS_NAME.DRAFT,
        type: 0,
        color: '#808080',
        itemIds: [31]
    },
    {
        id: columnIdsData.column2,
        title: STATUS_NAME.NEW,
        type: 1,
        itemIds: [],
        color: '#2F80ED'
    },
    {
        id: columnIdsData.column3,
        title: STATUS_NAME.PROCESSING,
        type: 2,
        itemIds: [],
        color: '#BB6BD9'
    },
    {
        id: columnIdsData.column4,
        title: STATUS_NAME.REVERTED,
        type: 3,
        itemIds: [],
        color: '#F8D548'
    },
    {
        id: columnIdsData.column5,
        title: STATUS_NAME.SOLVED,
        type: 4,
        itemIds: [],
        color: '#27AE60'
    },
    {
        id: columnIdsData.column6,
        title: STATUS_NAME.REJECTED,
        type: 5,
        itemIds: [],
        color: '#FF0015'
    },
    {
        id: columnIdsData.column7,
        title: STATUS_NAME.CANCELED,
        type: 6,
        itemIds: [],
        color: '#F2994A'
    }
];

export {
    transactionType,
    subIssueType,
    issueType,
    requestedBy,
    lastStatusType,
    productTypes,
    getColorAndNameStatus,
    columnsOrderData,
    columnsData,
    actionTicketTypes,
    productTypeRightContractNumberType,
    productTypeWrongContractNumberType,
    columnIdsData
};

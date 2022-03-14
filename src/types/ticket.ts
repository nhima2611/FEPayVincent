import { STATUS } from 'constants/status';

export type TicketItem = {
    ticket_id: number;
    contract_id: number;
    ref_number: number;
    created_date: Date | string;
    last_status_date: Date | string;
    last_status: STATUS;
    last_status_by_user?: string;
    last_status_by_role?: string;
    partner?: string;
    assignee?: string;
    assignee_role?: string;
    supporter?: string;
    description?: string;
    description_by_user?: string;
    description_by_role?: string;
    transaction_type?: 'Repayment' | 'Disbursement';
    issue_type?: 'Cancel transaction' | 'Adjust Amount' | 'Adjust Contract Number' | 'System Issue';
    product_type?: 'Loan' | 'Card' | 'Banca';
    requested_by?: string;
};

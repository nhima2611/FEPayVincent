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
    id?: number;
};

export type TicketDetailModel = {
    assignee: string;
    contract_number: string;
    created_at: Date | string;
    descriptions: any[];
    id: number;
    issue_type: 1 | 2 | 3 | 4;
    partner: string;
    product_type: 1 | 2 | 3;
    product_type_of_right_contact: string;
    ref_number: string;
    requested_by: 1 | 2 | 3;
    requester_national_id: string;
    requester_phone: string;
    right_contract_number: string;
    solved_date: null;
    status: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    sub_issue_type: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    supporter: string;
    transaction_amount: string;
    transaction_type: 1 | 2;
    updated_at: Date | string;
    ticket_logs: any[];
    ticket_id: string;
    attachments: any[];
};

export type AddDescriptionModel = {
    ticket_id: number;
    user_id?: number | string;
    fullname?: string;
    content: string;
};

export type AddAttachmentModel = {
    ticket_id: number;
    attachment: any;
};

export type CreateTicketModel = {
    attachments: any[];
    contract_number: number;
    description: string;
    issue_type: number;
    ref_number: string;
    requested_by: number;
    requester_national_id: number;
    requester_phone: number;
    right_amount: number;
    right_contract_number: number;
    right_product_type: number;
    status: number;
    sub_issue_type: number;
    transaction_amount: number;
    transaction_date: Date;
    transaction_type: number;
    wrong_transaction: number;
};

export interface EditTicketModel extends CreateTicketModel {
    id?: number;
}

export type UpdateStatusAndActionModel = {
    id?: number | string;
    ticket_id?: number;
    status?: number;
    action?: number;
};

export type AssignToModel = {
    ticket_ids: number[];
    emails: string[];
    type: 1 | 2;
};

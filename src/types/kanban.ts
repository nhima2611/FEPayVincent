export interface KanbanStateProps {
    columns: KanbanColumn[];
    columnsOrder: string[];
    comments: KanbanComment[];
    items: any[];
    profiles: KanbanProfile[];
    selectedItem: string | false;
    userStory: KanbanUserStory[];
    userStoryOrder: string[];
    error: object | string | null;
    mode: 'kanban' | 'list';
}

export type KanbanColumn = {
    id: string;
    title: string;
    itemIds: string[];
    color: string;
};

export type KanbanComment = {
    id: string;
    comment: string;
    profileId: string;
};

export type KanbanItem = {
    id: string;
    ticketID: number;
    contractID: number;
    refID: number;
    createdDate: Date | string;
    status: 'Draft' | 'New' | 'Allocated' | 'On-Hold' | 'Solve' | 'Reject' | 'Cancel';
    partner?: string;
    assignee?: string;
    transactionType?: 'Repayment' | 'Disbursement';
    issueType?: 'Cancel transaction' | 'Adjust Amount' | 'Adjust Contract Number' | 'System Issue';
    productType?: 'Loan' | 'Card' | 'Banca';
    requestedBy?: string;
    supporter?: string;
    modifiedDate?: Date | string;
};

export type KanbanProfile = {
    id: string;
    name: string;
    avatar: string;
    time: string;
};

export type KanbanUserStory = {
    acceptance: string;
    assign?: string;
    columnId: string;
    commentIds?: string[];
    description: string;
    dueDate: Date;
    id: string;
    itemIds: string[];
    title: string;
    priority: string;
};

export type LimitationListItem = {
    id: string,
    partner: string,
    pos: string,
    pos_list: string,
    product: string,
    tranx_limit: number,
    daily_limit: number,
    monthly_limit?: number,
    created_by?: string,
    status?: 'Active' | 'Under Review' | 'Canceled' | 'No Start',
    duration?: string
};

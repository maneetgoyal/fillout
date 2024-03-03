export interface FilloutQueryParams {
    limit?: number;
    afterDate?: string;
    beforeDate?: string;
    offset?: number;
    status?: 'in_progress' | 'finished';
    includeEditLink?: boolean;
    sort?: 'asc' | 'desc';
}
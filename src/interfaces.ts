type FilterClauseType = {
  id: string;
  condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
  value: number | string;
};

export interface FilloutQueryParams {
  limit?: number;
  afterDate?: string;
  beforeDate?: string;
  offset?: number;
  status?: 'in_progress' | 'finished';
  includeEditLink?: boolean;
  sort?: 'asc' | 'desc';
  filterClauses?: FilterClauseType[];
}

interface FilloutResponse {
  [key: string]: unknown;
  questions: { id: string; name: string; type: string; value: string }[];
}

export interface FilloutResponseBody {
  pageCount: number;
  totalResponses: number;
  responses: FilloutResponse[];
}

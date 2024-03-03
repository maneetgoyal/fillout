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

type QuestionType =
  | 'Address'
  | 'AudioRecording'
  | 'Calcom'
  | 'Calendly'
  | 'Captcha'
  | 'Checkbox'
  | 'Checkboxes'
  | 'ColorPicker'
  | 'CurrencyInput'
  | 'DatePicker'
  | 'DateRange'
  | 'DateTimePicker'
  | 'Dropdown'
  | 'EmailInput'
  | 'FileUpload'
  | 'ImagePicker'
  | 'LocationCoordinates'
  | 'LongAnswer'
  | 'Matrix'
  | 'MultiSelect'
  | 'MultipleChoice'
  | 'NumberInput'
  | 'OpinionScale'
  | 'Password'
  | 'Payment'
  | 'PhoneNumber'
  | 'Ranking'
  | 'RecordPicker'
  | 'ShortAnswer'
  | 'Signature'
  | 'Slider'
  | 'StarRating'
  | 'Switch'
  | 'TimePicker'
  | 'URLInput';

interface FilloutResponse {
  [key: string]: unknown;
  questions: { id: string; name: string; type: QuestionType; value: string }[];
}

export interface FilloutResponseBody {
  pageCount: number;
  totalResponses: number;
  responses: FilloutResponse[];
}

export interface QueryRow {
  field: string;
  condition: string;
  value: string | number | boolean;
}

export interface QuerySlice {
  queries: QueryRow[];
  results: any[];
  error: string
}

export interface reqBody {
  groupType: string;
  conditions: QueryRow[]
}

export interface Result {
  records:[]
}

export const initialQuerySlice: QuerySlice = {
  queries: [{field:'', condition: '', value:''}],
  results: [],
  error: ''
}
export interface QueryRow {
  field: string;
  condition: string;
  value: string | number | boolean;
}

export interface QuerySlice {
  queries: QueryRow[];
}

export interface reqBody {
  groupType: string;
  conditions: QueryRow[]
}

export const initialQuerySlice: QuerySlice = {
  queries: [{field:'', condition: '', value:''}],
}
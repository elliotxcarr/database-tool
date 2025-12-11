export interface Statement {
  field: string;
  condition: string;
  value: string | number | boolean;
}

export interface Query {
  queries: Statement[];
}

export const initialQuerySlice: Query = {
  queries: [{} as Statement],
}
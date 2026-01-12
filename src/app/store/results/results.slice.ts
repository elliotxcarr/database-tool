import { Field } from "../../data/dbFields";

export interface ResultsSlice{
  results: any[],
  fieldsToProject: Field[] | undefined,
  error: string;
  selectedRecord: any;
}

export const initialResultsSlice: ResultsSlice = {
  results: [],
  fieldsToProject: [],
  error: '',
  selectedRecord: null,
}
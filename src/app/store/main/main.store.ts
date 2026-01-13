import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { DATABASES, ENVS, Field, USER_FIELDS_DICT, VESSEL_FIELDS_DICT } from "../../data/dbFields";
import { computed, inject } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Dispatcher } from "@ngrx/signals/events";
import { queryEvents } from "../query/query.store";

export interface MainSlice {
  env: string;
  db: string;
  error: string;
  results: any[];
  selectedRecord: any;
  fieldsToProject: Field[] | undefined,
}
export const initialMainSlice: MainSlice = {
  env: 'LOCAL',
  db: 'user',
  error: '',
  results: [],
  selectedRecord: null,
  fieldsToProject: [],
}

export const MainStore = signalStore(
  {providedIn: 'root'},
  withState(initialMainSlice),
  withProps((_) => ({
    _dispatcher: inject(Dispatcher)
  })),
  withComputed(store => {
    const currentFields = computed<Field[]>(() => {
      if(store.db() === 'user') return USER_FIELDS_DICT;
      if(store.db() === 'vessel') return VESSEL_FIELDS_DICT;
      return [] as Field[]
    })
    const dbs = computed(() => DATABASES);
    const envs = computed(() => ENVS)
    return {
      currentFields,
      dbs,
      envs,
      dbOptions: computed(() => Object.keys(dbs())),
      currentFieldOptions: computed(() => Array.from(currentFields().map(a => a.label))),
      recordFields: computed(() => Object.keys(store.selectedRecord() || {})),
    }
  }),
  withMethods((store) => ({
    setDb: (event: string) => { 
        patchState(store, {
          db: event,
          results: []
        });
      },
      setEnv: (event: string) => {
        patchState(store, {
          env: event,
          results: []
        })
      },
      getValue(item: any, path: string) {
        return path
          .split('.')
          .reduce((o, key) => (o ? o[key] : undefined), item)
      },
    setProjectedFields: (values?: Field[]) => patchState(store, {fieldsToProject : values}),
    setResults: (results: any) => patchState(store, {results: results}),
    setError: (err: HttpErrorResponse) => patchState(store, {error: err.error.message}),
    clearError: () => patchState(store, {error: ''}),
    setSelected: (record: any) => patchState(store, {selectedRecord: record}),
    clearSelected: () => patchState(store, {selectedRecord: null})
  })),
  withHooks({
    onInit(store) {
      patchState(store, {fieldsToProject: store.currentFields()})
    }
  })
)
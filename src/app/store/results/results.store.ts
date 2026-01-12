import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { initialResultsSlice } from "./results.slice";
import { Field } from "../../data/dbFields";
import { computed, inject } from "@angular/core";
import { QueryStore } from "../query/query.store";

export const ResultsStore = signalStore(
  {providedIn: 'root'},
  withState(initialResultsSlice),
  withProps((_) => ({
    _queryStore: inject(QueryStore)
  })),
  withComputed((store) => ({
    recordFields: computed(() => Object.keys(store.selectedRecord() || {}))
  })),
  withMethods((store) => ({
    getValue(item: any, path: string) {
      return path
        .split('.')
        .reduce((o, key) => (o ? o[key] : undefined), item)
    },
    setProjectedFields: (values?: Field[]) => patchState(store, {fieldsToProject : values}),
    recordSelected: (record: any): void => {
      patchState(store, {selectedRecord: record})
    },
    clearSelected: (): void => {
      patchState(store, {selectedRecord: null})
    },
  })),
  withHooks({
    onInit(store) {
      patchState(store, {fieldsToProject: store._queryStore.currentFields().slice(0,4)})
    }
  })
)
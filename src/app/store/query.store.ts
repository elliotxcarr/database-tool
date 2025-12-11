import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { initialQuerySlice } from "./query.slice";
import { computed } from "@angular/core";

export const QueryStore = signalStore(
  {providedIn: 'root'},
  withState(initialQuerySlice),
  withComputed(() => ({
    userFields: computed(() => ['Name', 'Age', 'Email', 'Address']),
    conditions: computed(() => ['Contains', 'Exists', 'Length', 'Includes']),
  })),
  withMethods((store) => ({
    isFirstStatement: (index:number):boolean => index === 0,
    removeStatement: (index:number) => patchState(store, { queries: store.queries().filter((_, i) => i !== index) }),
    addStatement: () => patchState(store, { queries: [...store.queries(), { field: '', condition: '', value: '' }] }),
  })),
  
)
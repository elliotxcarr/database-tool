import { patchState, signalStore, type, withComputed, withMethods, withProps, withState } from "@ngrx/signals";
import { initialQuerySlice, QuerySlice, reqBody, Result } from "./query.slice";
import { computed, inject, Signal } from "@angular/core";
import { Dispatcher, eventGroup } from "@ngrx/signals/events";
import { withQueryEffects } from "./query.effects";
import { withQueryReducer } from "./query.reducer";
import { conditionsDict, userFieldsDict, vesselFieldsDict } from "../data/dbFields";

export const queryEvents = eventGroup({
  source: 'Query',
  events: {
    runQuery: type<reqBody>(),
    querySuccess: type<any[]>(),
    queryFailiure: type<any>()
  }
})

export const QueryStore = signalStore(
  {providedIn: 'root'},
  withState(initialQuerySlice),
  withProps(_ => ({
    _dispatcher: inject(Dispatcher),
  })),
  withComputed((store) => {
    const currentFields = computed<Record<string, string>>(() => {
      if(store.db() === 'user') return userFieldsDict;
      if(store.db() === 'vessel') return vesselFieldsDict;
      return {}
    })
    const currentFieldOptions = computed(() => Object.keys(currentFields()))
    const conditionz = computed(() => conditionsDict);
    const conditionOptions = computed(() => Object.keys(conditionz()))
    return {
      currentFields,
      currentFieldOptions,
      conditionz,
      conditionOptions
    }
  }
  ),
  withQueryEffects(),
  withQueryReducer(),
  withMethods((store) => ({
    isFirstStatement: (index:number):boolean => index === 0,
    removeStatement: (index:number) => patchState(store, { queries: store.queries().filter((_, i) => i !== index) }),
    addStatement: () => patchState(store, { queries: [...store.queries(), { field: '', condition: '', value: '' }] }),
    setResults: (res:any) => patchState(store, {results: res}),
    runClicked: () =>{
      const body = {
        db: 'user',
        env: 'LOCAL',
        groupType : 'AND',
        conditions: store.queries()
      }
      store._dispatcher.dispatch(queryEvents.runQuery(body))
    }
  })),
  
)
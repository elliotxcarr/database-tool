import { patchState, signalStore, type, withComputed, withMethods, withProps, withState } from "@ngrx/signals";
import { initialQuerySlice, QuerySlice, reqBody, Result } from "./query.slice";
import { computed, inject } from "@angular/core";
import { Dispatcher, eventGroup } from "@ngrx/signals/events";
import { withQueryEffects } from "./query.effects";
import { withQueryReducer } from "./query.reducer";

export const queryEvents = eventGroup({
  source: 'Query',
  events: {
    runQuery: type<reqBody>(),
    querySuccess: type<any[]>(),
    queryFailiure: type<any>()
  }
})

export const conditionsDict: Record<string, string> = {
  'Contains': 'contains',
  'Equals' : 'equals',
  'Not Equal': 'ne',
  'Includes': 'in',
  'Exisits': 'exists'
}

export const fieldsDict: Record<string, string> = {
  'Name': 'name',
  'ID' : '_id',
  'Username': 'username',
  'Email': 'email',
  'Role' : 'role'
}

export const QueryStore = signalStore(
  {providedIn: 'root'},
  withState(initialQuerySlice),
  withProps(_ => ({
    _dispatcher: inject(Dispatcher),
  })),
  withComputed(() => ({
    userFields: computed(() => Object.keys(fieldsDict)),
    conditions: computed(() => Object.keys(conditionsDict)),
  })),
  withQueryEffects(),
  withQueryReducer(),
  withMethods((store) => ({
    isFirstStatement: (index:number):boolean => index === 0,
    removeStatement: (index:number) => patchState(store, { queries: store.queries().filter((_, i) => i !== index) }),
    addStatement: () => patchState(store, { queries: [...store.queries(), { field: '', condition: '', value: '' }] }),
    setResults: (res:any) => patchState(store, {results: res}),
    runClicked: () =>{
      const body = {
        groupType : 'AND',
        conditions: store.queries()
      }
      store._dispatcher.dispatch(queryEvents.runQuery(body))
    }
  })),
  
)
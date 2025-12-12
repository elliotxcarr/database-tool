import { signalStoreFeature, type } from "@ngrx/signals";
import { on, withReducer } from "@ngrx/signals/events";
import { QuerySlice } from "./query.slice";
import { queryEvents } from "./query.store";

export const withQueryReducer = <_>() => 
  signalStoreFeature(
    type<{state:QuerySlice}>(),
    withReducer(
      on(queryEvents.querySuccess, (event) => ({results: event.payload})),
      on(queryEvents.queryFailiure, (event) => ({error:event.payload}))
    )
  )
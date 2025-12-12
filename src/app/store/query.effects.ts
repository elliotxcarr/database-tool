import { inject } from "@angular/core";
import { signalStoreFeature, type } from "@ngrx/signals";
import { Dispatcher, Events, withEffects } from "@ngrx/signals/events";
import { queryEvents, QueryStore } from "./query.store";
import { switchMap } from "rxjs";
import { QueryService } from "../../services/queryservice";
import {tapResponse} from "@ngrx/operators"

export const withQueryEffects = <_>() => 
  signalStoreFeature(
    type<{}>(),
    withEffects(_ => {
      const _events = inject(Events);
      const _queryService = inject(QueryService);
      const _dispatcher = inject(Dispatcher)
      return {
        runQuery$: _events.on(queryEvents.runQuery).pipe(
          switchMap(({payload: req}) => _queryService.runQuery(req).pipe(
            tapResponse({
              next: (res: any) =>{
                _dispatcher.dispatch(queryEvents.querySuccess(res))
              },
              error: err => {
                _dispatcher.dispatch(queryEvents.queryFailiure(err))
              }
                
            })
          ))
        )
      }
    })
  )
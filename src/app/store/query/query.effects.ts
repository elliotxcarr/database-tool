import { inject } from "@angular/core";
import { signalStoreFeature, type } from "@ngrx/signals";
import { Dispatcher, Events, withEffects } from "@ngrx/signals/events";
import { queryEvents } from "./query.store";
import { switchMap } from "rxjs";
import { QueryService } from "../../../services/queryservice";
import {tapResponse} from "@ngrx/operators"
import { HttpErrorResponse } from "@angular/common/http";

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
              next: (res:any[]) =>{
                _dispatcher.dispatch(queryEvents.querySuccess(res))
              },
              error: (err: HttpErrorResponse) => {
                _dispatcher.dispatch(queryEvents.queryFailiure(err.error.message))
              }
                
            })
          ))
        )
      }
    })
  )
import {
  patchState,
  signalStore,
  type,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { initialQuerySlice, QueryRow, reqBody } from './query.slice';
import { computed, inject } from '@angular/core';
import { Dispatcher, eventGroup } from '@ngrx/signals/events';
import { withQueryEffects } from './query.effects';
import {
  CONDITIONS_DICT,
} from '../../data/dbFields';
import { MainStore } from '../main/main.store';

export const queryEvents = eventGroup({
  source: 'Query',
  events: {
    runQuery: type<reqBody>(),
  },
});

export const QueryStore = signalStore(
  { providedIn: 'root' },
  withState(initialQuerySlice),
  withProps((_) => ({
    _dispatcher: inject(Dispatcher),
  })),
  withComputed((store) => {
    const conditions = computed(() => CONDITIONS_DICT);
        const mainStore = inject(MainStore)
    const currentFields = computed(() => mainStore.currentFields())
    return {
      conditions,
      conditionOptions: computed(() => Object.keys(CONDITIONS_DICT)),
      fieldByPath: computed(() => Object.fromEntries(currentFields().map(a => [a.path, a]))),
    };
  }),
  withQueryEffects(),
  withMethods((store) => {
    
    const mainStore = inject(MainStore);
    return {
      isFirstStatement: (index: number): boolean => index === 0,
      removeStatement: (index: number): void =>
        patchState(store, { queries: store.queries().filter((_, i) => i !== index) }),
      addStatement: (): void =>
        patchState(store, { queries: [...store.queries(), { field: '', condition: '', value: '' }] }),
      getValuePlaceholder: (query: QueryRow): string => {
        const field = store.fieldByPath()[query.field];
        if(query.condition === 'exists') return 'True/False'
        return field?.type
      },
      
      runClicked: (): void => {
        mainStore.clearError()
        const body = {
          db: store.db(),
          env: store.env(),
          groupType: 'AND',
          conditions: store.queries(),
        };
        store._dispatcher.dispatch(queryEvents.runQuery(body));
      },
  }}),
  
);
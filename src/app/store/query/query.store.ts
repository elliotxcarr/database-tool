import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { initialQuerySlice, QueryRow, reqBody } from './query.slice';
import { computed, inject } from '@angular/core';
import { Dispatcher, eventGroup } from '@ngrx/signals/events';
import { withQueryEffects } from './query.effects';
import { withQueryReducer } from './query.reducer';
import {
  CONDITIONS_DICT,
  DATABASES,
  ENVS,
  Field,
  USER_FIELDS_DICT,
  VESSEL_FIELDS_DICT,
} from '../../data/dbFields';

export const queryEvents = eventGroup({
  source: 'Query',
  events: {
    runQuery: type<reqBody>(),
    querySuccess: type<any[]>(),
    queryFailiure: type<any>(),
  },
});

export const QueryStore = signalStore(
  { providedIn: 'root' },
  withState(initialQuerySlice),
  withProps((_) => ({
    _dispatcher: inject(Dispatcher),
  })),
  withComputed((store) => {
    const currentFields = computed<Field[]>(() => {
      if (store.db() === 'user') return USER_FIELDS_DICT;
      if (store.db() === 'vessel') return VESSEL_FIELDS_DICT;
      return [] as Field[];
    });
    const conditions = computed(() => CONDITIONS_DICT);
    const dbs = computed(() => DATABASES);
    const envs = computed(() => ENVS);
    return {
      dbs,
      dbOptions: computed(() => Object.keys(dbs())),
      envs,
      currentFields,
      currentFieldOptions: computed(() => Array.from(currentFields().map(a => a.label))),
      conditions,
      conditionOptions: computed(() => Object.keys(CONDITIONS_DICT)),
      fieldByPath: computed(() => Object.fromEntries(currentFields().map(a => [a.path, a]))),
    };
  }),
  withQueryEffects(),
  withQueryReducer(),
  withMethods((store) => ({
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
    setDb: (event: string) => { 
      patchState(store, {
        db: event,
        results: [],
        queries: [{} as QueryRow],
        selectedRecord: null
      })
    },
    setEnv: (event: string) => {
      patchState(store, {
        env: event,
        results: [],
        queries: [{} as QueryRow],
        selectedRecord: null
      })
    },
    
    runClicked: (): void => {
      patchState(store, { error: '' });
      const body = {
        db: store.db(),
        env: store.env(),
        groupType: 'AND',
        conditions: store.queries(),
      };
      store._dispatcher.dispatch(queryEvents.runQuery(body));
    },
  })),
  
);
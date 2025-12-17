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
import { withQueryReducer } from './query.reducer';
import {
  CONDITIONS_DICT,
  OBJECT_ID_FIELDS,
  USER_FIELDS_DICT,
  VESSEL_FIELDS_DICT,
} from '../data/dbFields';

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
    const currentFields = computed<Record<string, string>>(() => {
      if (store.db() === 'user') return USER_FIELDS_DICT;
      if (store.db() === 'vessel') return VESSEL_FIELDS_DICT;
      return {};
    });
    const conditions = computed(() => CONDITIONS_DICT);
    return {
      currentFields,
      currentFieldOptions: computed(() => Object.keys(currentFields())),
      conditions,
      conditionOptions: computed(() => Object.keys(conditions())),
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

    needsObjId: (field: string) => OBJECT_ID_FIELDS.includes(field),

    getValuePlaceholder: (query: QueryRow): string => {
      if (query.condition === 'exists') return 'True/False';
      if (OBJECT_ID_FIELDS.includes(query.field)) return 'ObjectID';
      return 'Value';
    },

    getValue: (obj: any, path: string) => {
      return store.currentFields()[path]
        .split('.')
        .reduce((o, key) => (o ? o[key] : undefined), obj);
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
  }))
);
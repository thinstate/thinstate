import { hasIntersectingKeyValuePair, pick } from 'web-essential-utils';

export interface IAsyncStorage {
  getItem: (key: string) => Promise<any>;
  setItem: (key: string, value: any) => Promise<void | null>;
  removeItem: (key: string) => Promise<void | null>;
}

export type Action<T> = {
  type: T;
  payload: any;
  rerenderTags: any[];
};

export const createStore = <T>(
  reducer: (state: any, action: Action<T>) => any,
  initialState: any,
  deviceStorageKey: string,
  persistableStateKeys: string[],
  asyncLocalStore: IAsyncStorage,
) => {
  let state = initialState;
  let subscriptions: any[] = [];

  const wrappedReducer = (reducerState = initialState, action: Action<T>) => {
    if (!action) {
      throw new Error();
    }

    return {
      state: reducer(reducerState, action),
      rerenderTags: action.rerenderTags,
    };
  };

  const init = async (localInitialState: any) => {
    let existingState: any = await asyncLocalStore.getItem(deviceStorageKey);
    if (existingState) {
      try {
        existingState = JSON.parse(existingState);
      } catch (e) {
        console.error('Exception while restoring state from local storage');
      }
    }
    if (existingState) {
      state = { ...localInitialState, ...existingState };
    } else {
      state = localInitialState;
    }
  };

  const unsubscribe = (listener: any) => {
    subscriptions = subscriptions.filter(s => s.listener !== listener);
  };

  const subscribe = (listener: any, tags: any[]) => {
    subscriptions.push({ listener, tags });

    return () => unsubscribe(listener);
  };

  const dispatch = (action: Action<T>) => {
    const { state: newState, rerenderTags } = wrappedReducer(state, action);
    state = newState;
    if (rerenderTags && Object.keys(rerenderTags).length) {
      subscriptions.forEach(s => {
        if (s?.listener && hasIntersectingKeyValuePair(s.tags, rerenderTags)) {
          s.listener();
        }
      });
    }
    const persistableState = pick(state, persistableStateKeys);
    asyncLocalStore.setItem(deviceStorageKey, JSON.stringify(persistableState));
  };

  const getState = (selector: string) => {
    if (selector && !selector.includes('.')) {
      return state[selector];
    }

    return state;
  };

  return { init, getState, dispatch, subscribe, unsubscribe };
};

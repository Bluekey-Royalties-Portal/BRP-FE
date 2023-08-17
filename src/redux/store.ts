import {
  AnyAction, CombinedState, PreloadedState, Reducer, Store, combineReducers, configureStore,
} from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";

import toastReducer, { IToastState } from "@/redux/slices/toastSlice";

import alertModalReducer, { IAlertModalState } from "./slices/alertModalSlice";

export interface IState {
  toast: IToastState;
  alertModal: IAlertModalState;
}

const rootReducer = (state: IState, action: AnyAction): CombinedState<IState> => {
  switch (action.type) {
    case HYDRATE:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return { ...state, ...action.payload };
    default: {
      const combinedReducer = combineReducers({
        toast: toastReducer,
        alertModal: alertModalReducer,
      });
      return combinedReducer(state, action);
    }
  }
};
const createStore = () => {
  const store = configureStore({
    reducer: rootReducer as Reducer<IState, AnyAction>,
  });
  return store;
};

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer as Reducer<IState, AnyAction>,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({ serializableCheck: false });
    },
  });
};

const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;

const wrapper = createWrapper<Store<IState>>(createStore);
export default wrapper;

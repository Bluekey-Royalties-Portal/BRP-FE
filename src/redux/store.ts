import {
  AnyAction,
  Action,
  configureStore,
  EnhancedStore,
  ThunkAction,
  Store,
  combineReducers,
} from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import toastReducer, { IToastState } from "@/redux/slices/toastSlice";
import userReducer, { IUserState } from "@/redux/slices/userSlice";

import alertModalReducer, { IAlertModalState } from "./slices/alertModalSlice";

export interface IState {
  toast: IToastState;
  user: IUserState;
  alertModal: IAlertModalState;
}

const rootReducer = (state: IState | undefined, action: AnyAction): IState => {
  switch (action.type) {
    case HYDRATE:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return { ...state, ...action.payload };
    default: {
      const combinedReducer = combineReducers({
        toast: toastReducer,
        alertModal: alertModalReducer,
        user: userReducer,
      });
      return combinedReducer(state, action);
    }
  }
};

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["user"],
};

const persistedReducer = persistReducer<RootReducer>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

const setupStore = (): EnhancedStore => { return store; };

const makeStore = () => { return setupStore(); };

export const persistor = persistStore(store);

export const wrapper = createWrapper<Store>(makeStore);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type RootReducer = ReturnType<typeof rootReducer>;

// eslint-disable-next-line max-len
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "./storage"; //browser local storage for save redux data

import productReducer from "../redux/features/productSlice";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  // upper things are action types which are used to ignore in serializableCheck middleware because these actions have non-serializable data like functions and promises
  REHYDRATE, // load data from local storage to redux store whwn app reloads or starts
  persistReducer, // improve normal reducer to persist reducer
  persistStore, // create a persistor which is used to persist the store
} from "redux-persist";

// here  we comabaine all reducers
const rootReducer = combineReducers({
  products: productReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["products"], // here we are blacklisting the products reducer because we don't want to persist the products state in local storage because it can be fetched from the server and also it can be large in size and we don't want to store it in local storage
};

// this persist reducer function will turn normal reducer to persisst reducer
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

// creating a redux store
export const store = configureStore({
  reducer: persistedReducer, // here we are using the persisted reducer instead of normal root reducer

  middleware: (getDefaultMiddleware) => //add defalt middleware in redux toolkit and also add serializableCheck middleware to ignore non-serializable data in actions
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store); // this persistor will be used in the app to persist the store and also to rehydrate the store when app reloads or starts

export type RootState = ReturnType<typeof store.getState>; // this RootState type will be used in useAppSelector hook ex: 
// const products = useAppSelector((state) => state.products); to get the type of products state from the store
export type AppDispatch = typeof store.dispatch; // this AppDispatch type will be used in useAppDispatch hook ex:
// const dispatch = useAppDispatch(); to get the type of dispatch function from the store
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/userSlice";
import { messageReducers } from "./features/messageSlice";
import { loadingReducers } from "./features/loadingSlice";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import { tokenReducers } from "./features/tokenSlice";


const rootReducer = combineReducers({
    users: userReducer,
    messages: messageReducers,
    loading: loadingReducers,
    token: tokenReducers
})

const persistConfig = {
    key: 'root',
    storage
}

const persisReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persisReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        })
    }
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
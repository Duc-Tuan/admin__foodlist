import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reducer as accountReducer } from '../pages/login/store';
import { reducer as reducerSalesCount } from '../pages/salesCounter/store';
import { reducer as reducerSetting } from '../pages/settings/store';
import { reducer as isHeaderReducer } from '../layouts/sliderbar/store';
import { reducer as chatReducer } from '../layouts/chat/store';

const rootReducer = combineReducers({
    accounts: accountReducer,
    headers: isHeaderReducer,
    sales: reducerSalesCount,
    settings: reducerSetting,
    chat: chatReducer,
});

const store = configureStore({
    reducer: rootReducer,
    // middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type Store = typeof store;

export default store;

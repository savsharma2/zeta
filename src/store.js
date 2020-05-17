
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import ApiClient from './apiClient';
import { apiMiddleware } from './apiMiddleware';


import rootReducer from './rootReducer';

export default function configureStore(initialState = {}) {
    const client = new ApiClient();
    const clientMiddleware = apiMiddleware(client);

    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...[clientMiddleware, thunk]),
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
};
import React from 'react';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

export default props => {
    return (
        <Provider store={createStoreWithMiddleware(reducers)}>
            {/* allows us to take this component and use it to wrap other components */}
            {props.children}
        </Provider>
    );
};
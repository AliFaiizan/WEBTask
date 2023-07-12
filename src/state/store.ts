import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

//redux thunk is a middleware that allows you to return functions, rather than just actions, within Redux action creators. This allows for delayed actions, including working with promises.
export const store = createStore(reducers, {}, applyMiddleware(thunk));
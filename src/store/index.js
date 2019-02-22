import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { loginReducer } from './login'
const loggerMiddleware = createLogger();
export default createStore(
    combineReducers({ loginReducer }),
    applyMiddleware(
        thunk,
        loggerMiddleware
    )
);
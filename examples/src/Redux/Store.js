/**
 *
 * Created by Doron Sinai on 29/05/2018 - 11:30
 */
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { NotificationsReducers as notifications } from 'amaryllis-notifications';

const rootReducer = combineReducers({
    notifications
});

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk));

export default store;
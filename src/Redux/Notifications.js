import { getDefaults } from '../OptionsManager';

/**
 * CONSTANTS
 */
const C = {
    SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
    DISMISS_NOTIFICATION: 'DISMISS_NOTIFICATION',
    DISMISS_ALL_NOTIFICATION: 'DISMISS_ALL_NOTIFICATION'
}

/**
 * Actions creators
 */


function idGenerator(){
    return "" + Math.ceil(Math.random(100)*10000) + Date.now();
}

function showNotification(title, message, options){
    let notificationId = idGenerator();
    return {
        type: C.SHOW_NOTIFICATION,
        payload: {
            id:notificationId,
            message:message,
            title:title,
            icon:options.icon,
            options:options,
            type:options.type
        }
    }

}

let actions = {
    notify: (title, message, options) => {
        options = Object.assign({}, getDefaults(), options);
        let action = showNotification(title, message, options);
        let notificationId = action.payload.id;
        if(options.timeout !== 0){
            return (dispatch) => {
                setTimeout(() => {
                    dispatch(actions.dismiss(notificationId))
                }, options.timeout);
                dispatch(action)
            }
        }
        return action;
    },
    dismiss: (id) => {
        return {
            type: C.DISMISS_NOTIFICATION,
            payload: {
                id
            }
        }
    },
    dismissAll: () => {
        return {
            type: C.DISMISS_ALL_NOTIFICATION,
        }
    }
}

const reducers = function(state={notifications:[]}, action){
    switch (action.type){
        case C.SHOW_NOTIFICATION:
            return {...state, notifications: state.notifications.concat(action.payload)};
        case C.DISMISS_NOTIFICATION:
            return {...state, notifications: state.notifications.filter(notification => notification.id !== action.payload.id)} 
        case C.DISMISS_ALL_NOTIFICATION:
            return {...state, notifications: []};
        default:
            return state;
    }
}

export {
    actions as NotificationsActions,
    reducers as NotificationsReducers,
    C as NotificationsConstants
}
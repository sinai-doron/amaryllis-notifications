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

const defaultOptions = {
    timeout: 2000,
    location: 'top-left'
}

function showNotification(type, title, message, options){
    let notificationId = idGenerator();
    options = Object.assign({},defaultOptions, options);
    return {
        type: C.SHOW_NOTIFICATION,
        payload: {
            id:notificationId,
            message:message,
            title:title,
            faicon:options.faicon,
            options:options,
            type:type || 'custom'
        }
    }

}

let actions = {
    showStaticNotification: (type, title, message, options) => {
        return showNotification(type, title, message, options);
    },
    showTimedNotification: (type, title, message, options) => {
        let action = showNotification(type, title, message, options);
        let notificationId = action.payload.id;
        
        return (dispatch) => {
            setTimeout(() => {
                dispatch({
                    type: C.DISMISS_NOTIFICATION,
                    payload: {
                        id:notificationId
                    }
                })
            }, action.payload.options.timeout);
            dispatch(action)
        }
    },
    dismissNotification: (id) => {
        return {
            type: C.DISMISS_NOTIFICATION,
            payload: {
                id
            }
        }
    },
    dismissAllNotifications: () => {
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
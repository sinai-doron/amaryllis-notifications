var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * CONSTANTS
 */
const C = {
    SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
    DISMISS_NOTIFICATION: 'DISMISS_NOTIFICATION',
    DISMISS_ALL_NOTIFICATION: 'DISMISS_ALL_NOTIFICATION'

    /**
     * Actions creators
     */

};function idGenerator() {
    return "" + Math.ceil(Math.random(100) * 10000) + Date.now();
}

let defaultOptions = {
    timeout: 3000,
    location: 'top-left',
    type: 'generic'
};

function setDefaults(newDefaults) {
    return defaultOptions = Object.assign(defaultOptions, newDefaults);
}

function showNotification(title, message, options) {
    let notificationId = idGenerator();
    return {
        type: C.SHOW_NOTIFICATION,
        payload: {
            id: notificationId,
            message: message,
            title: title,
            icon: options.icon,
            options: options,
            type: options.type
        }
    };
}

let actions = {
    notify: (title, message, options) => {
        options = Object.assign({}, defaultOptions, options);
        let action = showNotification(title, message, options);
        let notificationId = action.payload.id;
        if (options.timeout !== 0) {
            return dispatch => {
                setTimeout(() => {
                    dispatch(actions.dismiss(notificationId));
                }, options.timeout);
                dispatch(action);
            };
        }
        return action;
    },
    dismiss: id => {
        return {
            type: C.DISMISS_NOTIFICATION,
            payload: {
                id
            }
        };
    },
    dismissAll: () => {
        return {
            type: C.DISMISS_ALL_NOTIFICATION
        };
    }
};

const reducers = function (state = { notifications: [] }, action) {
    switch (action.type) {
        case C.SHOW_NOTIFICATION:
            return _extends({}, state, { notifications: state.notifications.concat(action.payload) });
        case C.DISMISS_NOTIFICATION:
            return _extends({}, state, { notifications: state.notifications.filter(notification => notification.id !== action.payload.id) });
        case C.DISMISS_ALL_NOTIFICATION:
            return _extends({}, state, { notifications: [] });
        default:
            return state;
    }
};

export { actions as NotificationsActions, reducers as NotificationsReducers, C as NotificationsConstants, setDefaults };
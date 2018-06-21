var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { default as Notification } from './Notification';

const mapStateToProps = state => ({
    notifications: state.notifications
});

class Notifications extends React.Component {

    render() {
        const props = _extends({}, this.props);
        const { notifications } = this.props.notifications;

        const notificationsItems = notifications.map(item => React.createElement(Notification, {
            key: item.id,
            notificationid: item.id,
            message: item.message,
            title: item.title,
            notificationtype: item.type,
            icon: item.icon,
            location: item.options.location,
            options: item.options,
            animation: props.animation
        }));

        const itemsTopLeft = notificationsItems.filter(i => i.props.location !== 'top-right');
        const itemsTopRight = notificationsItems.filter(i => i.props.location !== 'top-left');
        return React.createElement(
            React.Fragment,
            null,
            React.createElement(
                TransitionGroup,
                {
                    className: 'amaryllis-notification-container amaryllis-notification-container-top-right' },
                itemsTopRight
            ),
            React.createElement(
                TransitionGroup,
                {
                    className: 'amaryllis-notification-container amaryllis-notification-container-top-left' },
                itemsTopLeft
            )
        );
    }
}

Notifications.propTypes = {
    animation: PropTypes.string,
    defaultoptions: PropTypes.object
};

export default connect(mapStateToProps)(Notifications);
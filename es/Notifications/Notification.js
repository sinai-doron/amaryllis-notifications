var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import { connect } from "react-redux";
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { NotificationsActions } from '../Redux/Notifications';

const mapActionsToProps = {
    dismissnotification: NotificationsActions.dismiss
};

class Notification extends React.Component {
    handleOnClick(notificationId) {
        if (this.props.options.action) {
            return;
        }
        this.props.dismissnotification(notificationId);
    }

    handleActionOnClick(notificationId, cb) {
        if (typeof cb === 'function') {
            cb();
        }
        this.props.dismissnotification(notificationId);
    }

    renderAction(notificationid, action, styles = {}) {
        if (action === undefined) {
            return null;
        }
        return React.createElement(
            'div',
            { className: "amaryllis-message-action-container" },
            React.createElement(
                'span',
                { className: "amaryllis-message-action",
                    onClick: this.handleActionOnClick.bind(this, notificationid, action.func), style: styles },
                action.text
            )
        );
    }

    renderIcon(icon, styles) {
        if (icon) {
            let classNames = ['amaryllis-notification-icon', icon];
            //support for fontAwesome
            if (icon.startsWith('fa-')) {
                classNames.push('amaryllis-notification-icon-fa');
            }
            classNames = classNames.join(' ');
            return React.createElement('span', { className: classNames, style: styles });
        }
        return null;
    }

    generateAnimationClassName(options) {
        let animation = "fade";
        let className = "amaryllis-notification-";
        if (this.props.animation) {
            animation = this.props.animation;
        }

        className += animation + "-" + options.location;
        return className;
    }

    render() {
        const props = _extends({}, this.props, { dismissnotification: "" });
        const options = _extends({}, props.options);
        let classNames = ['amaryllis-notification'];
        let styles = _extends({}, options.styles);

        if (props.icon) {
            classNames.push('amaryllis-notification-icon-container');
        }
        if (props.notificationtype) {
            classNames.push('amaryllis-notification-' + props.notificationtype);
        }
        if (props.options) {
            classNames.push(props.options.classes);
        }

        return React.createElement(
            CSSTransition,
            _extends({}, props, {
                key: props.id,
                classNames: this.generateAnimationClassName(options),
                style: styles.container,
                timeout: { enter: 2000, exit: 1000 } }),
            React.createElement(
                'div',
                { className: classNames.join(' '), onClick: this.handleOnClick.bind(this, props.notificationid) },
                this.renderIcon(props.icon, styles.icon),
                React.createElement(
                    'div',
                    { className: 'amaryllis-notification-message', role: 'alert' },
                    React.createElement(
                        'div',
                        { className: 'amaryllis-title', style: styles.title },
                        props.title
                    ),
                    React.createElement(
                        'div',
                        { className: 'amaryllis-message', style: styles.message },
                        props.message
                    ),
                    this.renderAction(props.notificationid, options.action, styles.action)
                )
            )
        );
    }
}

Notification.propTypes = {
    notificationid: PropTypes.string.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    notificationtype: PropTypes.string,
    icon: PropTypes.string,
    location: PropTypes.oneOf(['top-right', 'top-left']),
    options: PropTypes.object,
    animation: PropTypes.string
};

export default connect(null, mapActionsToProps)(Notification);
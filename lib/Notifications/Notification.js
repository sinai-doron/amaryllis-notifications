'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactTransitionGroup = require('react-transition-group');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Notifications = require('../Redux/Notifications');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mapActionsToProps = {
    dismissnotification: _Notifications.NotificationsActions.dismiss
};

class Notification extends _react2.default.Component {
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
        return _react2.default.createElement(
            'div',
            { className: "amaryllis-message-action-container" },
            _react2.default.createElement(
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
            return _react2.default.createElement('span', { className: classNames, style: styles });
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

        return _react2.default.createElement(
            _reactTransitionGroup.CSSTransition,
            _extends({}, props, {
                key: props.id,
                classNames: this.generateAnimationClassName(options),
                style: styles.container,
                timeout: { enter: 2000, exit: 1000 } }),
            _react2.default.createElement(
                'div',
                { className: classNames.join(' '), onClick: this.handleOnClick.bind(this, props.notificationid) },
                this.renderIcon(props.icon, styles.icon),
                _react2.default.createElement(
                    'div',
                    { className: 'amaryllis-notification-message', role: 'alert' },
                    _react2.default.createElement(
                        'div',
                        { className: 'amaryllis-title', style: styles.title },
                        props.title
                    ),
                    _react2.default.createElement(
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
    notificationid: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string,
    message: _propTypes2.default.string,
    notificationtype: _propTypes2.default.string,
    icon: _propTypes2.default.string,
    location: _propTypes2.default.oneOf(['top-right', 'top-left']),
    options: _propTypes2.default.object,
    animation: _propTypes2.default.string
};

exports.default = (0, _reactRedux.connect)(null, mapActionsToProps)(Notification);
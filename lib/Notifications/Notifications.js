'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTransitionGroup = require('react-transition-group');

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Notification = require('./Notification');

var _Notification2 = _interopRequireDefault(_Notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mapStateToProps = state => ({
    notifications: state.notifications
});

class Notifications extends _react2.default.Component {

    render() {
        const props = _extends({}, this.props);
        const { notifications } = this.props.notifications;

        const notificationsItems = notifications.map(item => _react2.default.createElement(_Notification2.default, {
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
        return _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(
                _reactTransitionGroup.TransitionGroup,
                {
                    className: 'amaryllis-notification-container amaryllis-notification-container-top-right' },
                itemsTopRight
            ),
            _react2.default.createElement(
                _reactTransitionGroup.TransitionGroup,
                {
                    className: 'amaryllis-notification-container amaryllis-notification-container-top-left' },
                itemsTopLeft
            )
        );
    }
}

Notifications.propTypes = {
    animation: _propTypes2.default.string,
    defaultoptions: _propTypes2.default.object
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Notifications);
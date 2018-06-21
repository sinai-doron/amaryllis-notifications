import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { connect } from "react-redux";
import { Notification } from './index';
import './Notifications.scss';

const mapStateToProps = state => ({
    notifications: state.notifications
});

class Notifications extends React.Component {

    render(){
        const props = { ...this.props };
        const { notifications } = this.props.notifications;

        const notificationsItems = notifications.map((item) => (
            <Notification
            key={item.id}
            notificationid={item.id}  
            message={item.message}
            title={item.title}
            notificationtype={item.type}
            icon={item.icon}
            location={item.options.location}
            options={item.options}
            animation = {props.animation}
        />
           ));

        const itemsTopLeft = notificationsItems.filter(i => i.props.location !== 'top-right');
        const itemsTopRight = notificationsItems.filter(i => i.props.location !== 'top-left');
        return (
            <React.Fragment>
                <TransitionGroup
                    className='amaryllis-notification-container amaryllis-notification-container-top-right'>
                {itemsTopRight}
                </TransitionGroup>
                <TransitionGroup 
                    className='amaryllis-notification-container amaryllis-notification-container-top-left'>
                {itemsTopLeft}
                </TransitionGroup>
            </React.Fragment>
          );
    }
}

export default connect(mapStateToProps)(Notifications);


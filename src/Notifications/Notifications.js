import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { default as Notification } from './Notification';
import { setDefaults } from '../OptionsManager';

const mapStateToProps = state => ({
    notifications: state.notifications
});

class Notifications extends React.Component {

    setDefaultSettings(defaultOptions){
        setDefaults(defaultOptions);
    }

    render(){
        const props = { ...this.props };
        const { notifications } = this.props.notifications;
        
        if(props.defaults){
            this.setDefaultSettings(props.defaults);
        }

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

Notifications.propTypes = {
    animation: PropTypes.string,
    defaultoptions: PropTypes.object
}

export default connect(mapStateToProps)(Notifications);


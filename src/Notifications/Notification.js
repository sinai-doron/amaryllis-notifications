import React from 'react';
import { connect } from "react-redux";
import { CSSTransition } from 'react-transition-group';
import './Notifications.scss';
import { NotificationsActions } from '../Redux/Notifications';
const mapActionsToProps = {
    dismissnotification: NotificationsActions.dismissNotification
}

class Notification extends React.Component {
    handleOnClick(notificationId){
        this.props.dismissnotification(notificationId)
    }

    render(){
        const props = { ...this.props, dismissnotification:"" };
        let classNames = ['amaryllis-notification']
        const defaultStyle = {
            
        };

        if(props.faicon){
            classNames.push('amaryllis-notification-fa');
            classNames.push(props.faicon);
        }
        if(props.notificationtype){
            classNames.push('amaryllis-notification-' + props.notificationtype)
        }
        if(props.options){
            classNames.push(props.options.classes);
        }

        return (
            <CSSTransition
            {...props}
            key={props.id}
            classNames={"amaryllis-notification-" + props.options.location}
            timeout={{ enter: 2000, exit: 1000 }}
          >
             <div style={defaultStyle} className={classNames.join(' ')} onClick={this.handleOnClick.bind(this, this.props.notificationid)}>
                  <div className="amaryllis-notification-message" role="alert">
                      {props.title}
                      <div className="amaryllis-message">{props.message}</div>
                  </div>    
             </div>
          </CSSTransition>
          );
    }
}

export default connect(null, mapActionsToProps)(Notification);
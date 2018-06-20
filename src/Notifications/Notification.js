import React from 'react';
import { connect } from "react-redux";
import { CSSTransition } from 'react-transition-group';
import './Notifications.scss';
import { NotificationsActions } from '../Redux/Notifications';

const mapActionsToProps = {
    dismissnotification: NotificationsActions.dismiss
}


class Notification extends React.Component {
    handleOnClick(notificationId){
        if(this.props.options.action){
            return;
        }
        this.props.dismissnotification(notificationId)
    }

    handleActionOnClick(notificationId, cb){
        if(typeof cb === 'function'){
            cb();
        }
        this.props.dismissnotification(notificationId)
    }

    renderAction(notificationid, action, styles={}){
        if(action === undefined){
            return null;
        }
        return (
            <div className={"amaryllis-message-action-container"}>
                <span className={"amaryllis-message-action"} 
                    onClick={this.handleActionOnClick.bind(this, notificationid, action.func)} style={styles}>{action.text}</span>
            </div>
        )
    }

    renderIcon(icon, styles){
        console.log(icon)
        if(icon){
            let classNames = ['amaryllis-notification-icon', icon];
            //support for fontAwesome
            if(icon.startsWith('fa-')){
                classNames.push('amaryllis-notification-icon-fa')
            }
            classNames = classNames.join(' ');
            return  ( <span className={classNames} style={styles}/>)
        }
        return null;
    }

    render(){
        const props = { ...this.props, dismissnotification:"" };
        const options = { ...props.options }
        let classNames = ['amaryllis-notification']
        const defaultStyle = {
            
        };

        if(props.icon){
            console.log("%%%%%")
            classNames.push('amaryllis-notification-icon-container');
        }
        if(props.notificationtype){
            classNames.push('amaryllis-notification-' + props.notificationtype)
        }
        if(props.options){
            classNames.push(props.options.classes);
        }

        let styles = {
            ...options.styles,
        //     container:{
        //         backgroundColor:'red'
        //     },
        //     title: {
        //         color:'pink'
        //     },
        //     message: {
        //         color:'#3d3d3d'
        //     },
        //     icon:{
        //         color:'wheat'
        //     }
        }

        return (
            <CSSTransition
            {...props}
            key={props.id}
            classNames={"amaryllis-notification-" + props.options.location}
            style={styles.container}
            timeout={{ enter: 2000, exit: 1000 }}>
             <div style={defaultStyle} className={classNames.join(' ')} onClick={this.handleOnClick.bind(this, props.notificationid)}>
                {this.renderIcon(props.icon, styles.icon)}
                  <div className="amaryllis-notification-message" role="alert">
                      <div className="amaryllis-title" style={styles.title}>{props.title}</div>
                      <div className="amaryllis-message" style={styles.message}>{props.message}</div>
                      {this.renderAction(props.notificationid, options.action, styles.action)}
                      
                  </div>    
             </div>
          </CSSTransition>
          );
    }
}

export default connect(null, mapActionsToProps)(Notification);
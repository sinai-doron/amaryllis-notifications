import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { default as Store } from './Redux/Store';
import { Notifications, NotificationsActions } from 'amaryllis-notifications';

function mapActionsToProps(dispatch){
    return {
        notify: (type, title, message, options) => {
            return dispatch(NotificationsActions.showStaticNotification (type, title, message, options));
        },
        notifyTimeout: (type, title, message, options) => {
            return dispatch(NotificationsActions.showTimedNotification(type, title, message, options))
        }
    }
}

class Page extends React.Component {
    componentDidMount(){
        //todo: fix: when there is no object in notify
        this.props.notifyTimeout('warning', "Success!", "Added a contract succesfully", {faicon:"fa-dove"});
        this.props.notify('info', "Success!", "Added a contract succesfully", {faicon:"fa-frog"});
        this.props.notify('success', "Success!", "Added a contract succesfully", {
            faicon:"fa-kiwi-bird",
            location: "top-right"
        });
        this.props.notify('error', "Success!", "Added a contract succesfully", {faicon:"fa-crow"});
        this.props.notify('happy', "Success!", "Added a contract succesfully", {faicon:"fa-frog"});
    }

    render(){
        return (<div>Wellcome to Amaryllis Notifications</div>);
    }
}

Page = connect(null, mapActionsToProps)(Page)


ReactDOM.render(
    <Provider store={Store}>
        <React.Fragment>
            <Notifications />
            <Page />
        </React.Fragment>
    </Provider>,
	document.getElementById('example')
);

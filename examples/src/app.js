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
        this.props.notify('warning', "Warning!", "Pay attention to dove", {faicon:"fa-dove"});
        this.props.notify('info', "Info!", "There is a frog on the left side", {faicon:"fa-frog"});
        this.props.notify('success', "Success!", "You found a kiwi", {
            faicon:"fa-kiwi-bird",
            location: "top-right"
        });
        this.props.notify('error', "Error!", "Crow Crow Crow", {faicon:"fa-crow"});
        this.props.notify('happy', "Happy", "This is my happy place", {faicon:"fa-cloud"});
    }

    render(){
        return (<div></div>);
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

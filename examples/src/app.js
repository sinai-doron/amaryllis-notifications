import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { default as Store } from './Redux/Store';
import { Notifications, NotificationsActions, AMARYLLIS_TYPES, setDefaults} from 'amaryllis-notifications';

const mapActionsToProps = {
    notify: NotificationsActions.notify
}

class Page extends React.Component {
    componentDidMount(){
        setDefaults({timeout:0, styles:{container:{color:'green'}}})
        // this.props.notify("Warning!", "Pay attention to dove", {faicon:"fa-dove", type:AMARYLLIS_TYPES.INFO});
        // this.props.notify("Info!", "There is a frog on the left side, with a long text", {faicon:"fa-frog", type:AMARYLLIS_TYPES.WARNING});
        // this.props.notify("Success!", "You found a kiwi", {
        //     faicon:"fa-kiwi-bird",
        //     location: "top-right",
        //     type:AMARYLLIS_TYPES.ERROR
        // });
        // this.props.notify("Success!", "You found a kiwi", {
        //     location: "top-right"
        // });
        // this.props.notify("Error!", "Crow Crow Crow", {
        //     faicon:"fa-crow",
        //     timeout: 0,
        //     type:AMARYLLIS_TYPES.SUCCESS
        // });
        // this.props.notify("Happy", "This is my happy place");
        this.props.notify("Happy Happy", "I have a pragrapgh ", {action: {text:"say hello",func:()=>this.props.notify("Hello", "World", {icon:'fa-star', type: AMARYLLIS_TYPES.INFO})}})
        this.props.notify("Happy Happy", "I have a pragrapgh with long text and some more data i wnat to show", {icon:'fa-kiwi-bird', styles:{icon:{color:'pink'},container:{color:'red'},message:{color:'#d3d3d3'}}})
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

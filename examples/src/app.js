import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { default as Store } from './Redux/Store';
import { Notifications, NotificationsActions, AMARYLLIS_TYPES, setDefaults} from 'amaryllis-notifications';
import './app.scss';

const mapActionsToProps = {
    notify: NotificationsActions.notify
}

class Page extends React.Component {
    componentDidMount(){
        const { ...props } = this.props;
        // setDefaults({timeout:0, styles:{}})
        props.notify("Leonard Cohen", "Remember when I moved in you and the holy dove was moving too, and every breath we drew was, Hallelujah.",
             {icon:"fa-dove", type:AMARYLLIS_TYPES.WARNING});
        props.notify(" E.L. James:", "You have to kiss a lot of frogs before you find your prince", {icon:"fa-frog", type:AMARYLLIS_TYPES.INFO});
        props.notify("William Shakespeare", "I had rather hear my dog bark at a crow, than a man swear he loves me", 
            {icon:"fa-crow", type:AMARYLLIS_TYPES.ERROR, location: 'top-right'});
        props.notify("Success!", "You found a kiwi", {
            icon:"fa-kiwi-bird",
            location: "top-right",
            type:AMARYLLIS_TYPES.SUCCESS
        });
        props.notify("Happy!", "Happy Happy, Joy Joy", {
            location: "top-right",
            type:AMARYLLIS_TYPES.HAPPY
        });

        props.notify("Custom", "Configurable styles", {
            icon:"fa-feather",
            timeout: 0,
            type:AMARYLLIS_TYPES.SUCCESS,
            styles:{
                container:{
                    backgroundColor:'#54577c'
                },
                title:{
                    color: '#eac435'
                },
                message:{
                    color: '#03cea4'
                },
                icon:{
                    color: '#3e92cc'
                }
            }
        });
        props.notify("Action", "Attach a callback and an action ", 
            {action: {text:"say hello",func:()=>this.props.notify("Hello", "World", {icon:'fa-star', type: AMARYLLIS_TYPES.INFO})}})
    }

    render(){
        return (<div></div>);
    }
}

Page = connect(null, mapActionsToProps)(Page)


ReactDOM.render(
    <Provider store={Store}>
        <React.Fragment>
            <Notifications animation={"fade"} defaults={{timeout:0}}/>
            <Page />
        </React.Fragment>
    </Provider>,
	document.getElementById('example')
);

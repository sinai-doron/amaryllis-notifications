# amaryllis-notifications
React notification system with redux

<img width="1677" alt="screen shot 2018-06-21 at 21 16 08" src="https://user-images.githubusercontent.com/7936419/41737571-5bac2300-7598-11e8-988f-79c06e260b05.png">

## Installation

```
npm install --save amaryllis-notifications
```

## Dependecies
In order to use the redux actions, this package assumes that you have [react-redux](https://github.com/reduxjs/react-redux) and [redux-thunk](https://github.com/reduxjs/redux-thunk) installed and configured.


## Documentation

### 0. Include css file in your app
Either by copying the css to your html or requiring it directly from node_modules using SASS or other preprocessor

using sass:
```css
@import '../node_modules/amaryllis-notifications/dist/amaryllis-notifications.min.css';
```


### 1. Add Notifications Reducer to redux

```js
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { NotificationsReducers as notifications } from 'amaryllis-notifications';

const rootReducer = combineReducers({
    notifications
});

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk));

export default store;
```
### 2. Add Notifications Component to your react application
Preferabble high in the DOM tree

```js
import { Notifications, NotificationsActions, AMARYLLIS_TYPES, setDefaults} from 'amaryllis-notifications';

ReactDOM.render(
    <Provider store={Store}>
        <React.Fragment>
            <Notifications animation={"fade"}/>
            <Page />
        </React.Fragment>
    </Provider>,
	document.getElementById('example')
);
```
### 3. Use it in your app
```js
const mapActionsToProps = {
    notify: NotificationsActions.notify
}

class Page extends React.Component {
    componentDidMount(){
        const { ...props } = this.props;
        setDefaults({timeout:0, styles:{}})
        props.notify("Title", "Message", {icon:"fa-dove", type:AMARYLLIS_TYPES.WARNING });
    
    }

    render(){
        return (<div></div>);
    }
}

Page = connect(null, mapActionsToProps)(Page)
```

### 4. Options

__Options__:

- **timeout**: The message will be dissmissed by default after 3 seconds, if you want it to be static until clicked, use 0, or set other timeout in ms
- **type**: The type of the message, available types are:
    - AMARYLLIS_TYPES.INFO
    - AMARYLLIS_TYPES.WARNING
    - AMARYLLIS_TYPES.SUCCESS
    - AMARYLLIS_TYPES.ERROR
    - AMARYLLIS_TYPES.HAPPY

    all other type willbe considered custom and look for customization, either by providing a css class or by addidng style object
- **icon**: icon class name to be attached to the message, if the icon name starts with fa, Font Awesome is detected and by default font-family will be set accordingly and the icon will show, depending on the FA css linked in the app. otherwise a font-family should be added to the icon part of the message.
- **styles**:You can override the given styles by passing a styles object to the corresponding elements in the message
    - **container**
    - **title**
    - **message**
    - **icon**
    
    Example for styles
    ```js
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
    ```

**Animations**: This package uses react transition group for animation and is supplied currently with 2 animation types
- Fade
- Slide

You can set it on the **Notifications** element as follows:
```html
<Notifications animation={"fade"} defaults={{timeout:0}}/>
```

**Default Options**:
By deaflut, all messages will receive the following options:
- timeout: 3000
- location: top-left
- type: generic

You can overide these defaults either by passing new defaults to Notifications element
You can set it on the **Notifications** element as follows:
```html
<Notifications animation={"fade"} defaults={{timeout:0}}/>
```

Or by calling _setDefaults_ 
```js
setDefaults({timeout:0, styles:{}})
```


## License

MIT

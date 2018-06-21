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

## License

MIT

import { applyMiddleware } from 'redux';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

Reactotron
    .configure({
        host: '192.168.1.170',
    })
    .useReactNative()
    .use(reactotronRedux())
    .connect();

const store = Reactotron.createStore(rootReducer, applyMiddleware(thunk));

export default store;

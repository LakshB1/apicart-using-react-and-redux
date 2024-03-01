import {createStore} from 'redux';
import  {CartReducer} from  './Reducers/CartReducer';

let store = createStore(CartReducer);

export default store;
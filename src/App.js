
import './App.css';
import ProductApi from './Components/ProductApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ProductList from './Components/ProductList';
import { Provider } from 'react-redux';
import Header from './Components/Header';
import Cart from './Components/Cart';
import store from './Redux/store';
import Apijson from './Components/Apijson';

function App() {
  return (               
    <Provider store={store}> 
    <div className="App">
    <BrowserRouter >
      <Header  /> 
      <Routes>
        <Route path='/' element={<ProductApi />} />
        <Route path='/productlist/:id' element={<ProductList />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/apicart' element={<Apijson />} />
        </Routes>
    </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;

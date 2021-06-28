import React  from 'react';
import './App.css';
import Header from './components/Header'
import Main from './components/Main'
import { createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import appReducers from './reducers'
import thunk from 'redux-thunk'

const store = createStore(appReducers, applyMiddleware(thunk))

function App() {

  const getProducts = (products) => {
    funcSetProducts(products)
  }

  let funcSetProducts

  let getFunc = (func) => {
    funcSetProducts = func
  }

  return (
    <Provider store={store}>
      <div className="container-fluid">
        <Header getProducts={getProducts}/>
        <Main getFunc={getFunc}/>
      </div>
    </Provider>
  );
}

export default App;

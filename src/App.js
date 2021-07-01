import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import appReducers from './reducers';

const store = createStore(appReducers, applyMiddleware(thunk))

function App() {
  let funcSetProducts

  const getProducts = (products) => {
    funcSetProducts(products)
  }

  const getFunc = (func) => {
    funcSetProducts = func
  }

  return (
    <Provider store={store}>
      <div className="container-fluid">
        <Header getProducts={getProducts} />
        <Main getFunc={getFunc} />
      </div>
    </Provider>
  );
}

export default App;

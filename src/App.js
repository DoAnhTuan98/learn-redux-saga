import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import GlobalLoading from './components/GlobalLoading';
import appReducers from './reducers';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    appReducers, 
    applyMiddleware(thunk, sagaMiddleware),
)

sagaMiddleware.run(rootSaga)

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
        <GlobalLoading />
        <Header getProducts={getProducts} />
        <Main getFunc={getFunc} />
      </div>
    </Provider>
  );
}

export default App;

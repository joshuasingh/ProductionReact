import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "../src/pages/Homepage";
import Notfound from "../src/pages/Notfound";
import "./styles.css";
import ElaborationPage from "./pages/ElaborationPage";
import AdminPage from "./pages/AdminPage";
import TestFirstPage from "./pages/TestFirstPage";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AdminLogin from "./pages/AdminLogin";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import App from "./App";
import combineReducer1 from "./rootReducer";
import storage from 'redux-persist/lib/storage';
import {persistReducer,persistStore} from "redux-persist"
import {PersistGate} from 'redux-persist/lib/integration/react';




const myLogger = store => next => action => {
  console.log("logged action:", action);
  next(action);
};

// const store = createStore(combineReducer1, {});

const persistConfig = {
    key: 'root',
    storage: storage,
};
const persistedReducer = persistReducer(persistConfig, combineReducer1);

const store = createStore(persistedReducer, {});

const persistor=persistStore(store)



const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
   <PersistGate persistor={persistor}>
    <App />
   </PersistGate> 
  </Provider>,
  rootElement
);

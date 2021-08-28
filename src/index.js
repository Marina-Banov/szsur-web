import React, { Suspense } from "react";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";

import App from "./components/App";
import createReducers from "./store/reducers";
import reportWebVitals from "./reportWebVitals";
import i18n from "./i18n/i18n";
import Firebase, { FirebaseContext } from "appFirebase";

import "./index.scss";

const store = createStore(createReducers(), applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <Suspense fallback="loading">
        <App />
      </Suspense>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();

import React, { Suspense } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";

import App from "./components/App";
import reducers from "./store/reducers";
import reportWebVitals from "./reportWebVitals";
import i18n from "./i18n/i18n";
import Firebase, { FirebaseContext } from "appFirebase";

import "./index.scss";

const store = createStore((state = reducers.initialState, action) => {
    if (reducers.actionMap[action.type]) {
        return reducers.actionMap[action.type](state, action);
    }

    return state;
});

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

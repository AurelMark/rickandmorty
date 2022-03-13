import React from "react";
import thunk from "redux-thunk";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "reducers";
import App from "components/App";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

render(<AppWrapper />, document.getElementById("root"));

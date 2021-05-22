import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";

const configureStore = () => {
  // const enhancer =
  //   process.env.NODE_ENV === "production"
  //     ? compose(applyMiddleware(...middlewares, routerMiddleware(history)))
  //     : composeWithDevTools(
  //         applyMiddleware(...middlewares, routerMiddleware(history))
  //       );

  const store = createStore(rootReducer, composeWithDevTools());

  return store;
};

export default configureStore;

import React from "react";
import { RouterProvider } from "react-router-dom";
import { MainRouter } from "./Router/MainRouter";
import persistStore from "redux-persist/es/persistStore";
import { store } from "./global/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const App = () => {
  let persistor = persistStore(store);
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={MainRouter} />
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;

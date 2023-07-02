import React from "react";
import { useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/index";
import "./App.css";
import NavBar from "./components/NavBar";
import { routes } from "./routes";
function App() {
  const element = useRoutes(routes);
  return (
    <>
      <Provider store={store}>
        <NavBar />
        {element}
      </Provider>
    </>
  );
}

export default App;

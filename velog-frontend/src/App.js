import logo from "./logo.svg";
import "./App.css";
import { Route, Router } from "react-router";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Route path="/" exact={true} component={Home} />
    </>
  );
}

export default App;

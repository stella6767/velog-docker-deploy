import { Route } from 'react-router';
import './App.css';
import Home from './pages/Home';
import writeForm from './pages/writeForm';

function App() {
  return (
    <>
      <Route path="/" exact={true} component={Home} />
      <Route path="/write" exact={true} component={writeForm} />
    </>
  );
}

export default App;

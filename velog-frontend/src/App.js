import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router';
import './App.css';
import { realTokenExpire } from './lib/constants/auth';
import Home from './pages/Home';
import writeForm from './pages/writeForm';

function App() {
  const { testData } = useSelector(({ test }) => ({
    testData: test.done,
  }));
  useEffect(() => {
    //refreshToken 만료시 절차
    console.log('testData:  ', testData);
    if (testData.msg === realTokenExpire) {
      alert(realTokenExpire);
    }
  }, [testData]);

  return (
    <>
      <Route path="/" exact={true} component={Home} />
      <Route path="/write" exact={true} component={writeForm} />
    </>
  );
}

export default App;

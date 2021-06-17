import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router';
import './App.css';
import { logoutMsg, realTokenExpire } from './lib/constants/auth';
import Home from './pages/Home';
import writeForm from './pages/writeForm';

function App() {
  const { cmRespDto, loginDone } = useSelector(({ auth }) => ({
    cmRespDto: auth.cmRespDto,
    loginDone: auth.loginDone,
  }));
  useEffect(() => {
    //refreshToken 만료시 절차
    console.log('reissueData:  ', cmRespDto);
    if (cmRespDto.msg === realTokenExpire) {
      alert(realTokenExpire);
    }

    if (cmRespDto.msg === logoutMsg) {
      localStorage.clear();
      alert(logoutMsg);
    }
  }, [cmRespDto]);

  return (
    <>
      <Route path="/" exact={true} component={Home} />
      <Route path="/write" exact={true} component={writeForm} />
    </>
  );
}

export default App;

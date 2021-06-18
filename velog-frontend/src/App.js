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
    if (cmRespDto.msg === logoutMsg) {
      alert(logoutMsg);
    }
    if (cmRespDto.msg === '로그인성공') {
      alert('로그인 성공');
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

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router';
import './App.css';
import { logoutMsg, realTokenExpire } from './lib/constants/auth';
import Home from './pages/home/Home';
import writeForm from './pages/post/writeForm';
import Search from './pages/search/Search';
import Profile from './pages/profile/Profile';

function App() {
  const { cmRespDto, logoutDone } = useSelector(({ auth }) => ({
    cmRespDto: auth.cmRespDto,
    logoutDone: auth.logoutDone,
  }));
  useEffect(() => {
    //console.log(cmRespDto);
    // if (cmRespDto.msg === logoutMsg) {
    //   alert(logoutMsg);
    // }

    if (logoutDone) {
      alert(logoutMsg);
    }
  }, [logoutDone]);

  return (
    <>
      <Route path="/" exact={true} component={Home} />
      <Route path="/write" exact={true} component={writeForm} />
      <Route path="/search" exact={true} component={Search} />
      <Route path="/setting" exact={true} component={Profile} />
    </>
  );
}

export default App;

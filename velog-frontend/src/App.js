import { Route } from 'react-router';
import './App.css';
import Home from './pages/home/Home';
import writeForm from './pages/post/writeForm';
import Profile from './pages/profile/Profile';
import Search from './pages/search/Search';

function App() {
  // const { cmRespDto, logoutDone } = useSelector(({ auth }) => ({  //이건 홈에서 하는 게 맞다. 아니면 계속 랜더링되면서 alert
  //   cmRespDto: auth.cmRespDto,
  //   logoutDone: auth.logoutDone,
  // }));
  // useEffect(() => {
  //   //console.log(cmRespDto);
  //   // if (cmRespDto.msg === logoutMsg) {
  //   //   alert(logoutMsg);
  //   // }

  //   if (logoutDone) {
  //     alert(logoutMsg);
  //   }
  // }, [logoutDone]);

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

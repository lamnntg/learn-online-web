import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import Landing from "./pages/Landing/Landing";
import MeetingHome from "./pages/MeetingHome/MeetingHome";
import MeetingRoom from "./pages/MeetingRoom/MeetingRoom";
import Classroom from "./pages/Classroom/Classroom";
import ClassroomDetail from "./pages/ClassroomDetail/ClassroomDetail";
import Classwork from "./pages/ClassroomDetail/Classwork";
import People from "./pages/ClassroomDetail/People";
import Setting from "./pages/ClassroomDetail/Setting";
import CreateExam2 from "./pages/ClassroomDetail/CreateExam2";
import CreateExam from "./pages/ClassroomDetail/CreateExam";

import { history } from "./helpers/history";
import { logout } from "./redux/auth/auth.actions";
import AuthVerify from "./common/AuthVerify";
import NotFound from "./pages/NotFound";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
  };

  return (
    <div className="App">
      <Router history={history}>
        {!isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/sign-in" exact component={SignIn} />
            <Redirect from="*" to="/sign-in" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/meeting" component={MeetingHome} />
            <Route exact path="/meeting/:id" component={MeetingRoom} />
            <Main>
              <Route exact path="/dashboard" component={Home} />
              <Route exact path="/tables" component={Tables} />
              <Route exact path="/billing" component={Billing} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/classroom/:id/" component={ClassroomDetail} />
              <Route exact path="/classroom/:id/homework" component={Classwork} />
              <Route exact path="/classroom/:id/people" component={People} />
              <Route exact path="/classroom/:id/setting" component={Setting} />
              <Route exact path="/classroom/:id/exam/create" component={CreateExam2} />
              <Route exact path="/classroom/:id/homework/:homeworkId" component={CreateExam} />

              <Route exact path="/classroom" component={Classroom} />

              {/* <Redirect from="*" to="/dashboard" /> */}
            </Main>
          </Switch>
        )}
        <AuthVerify logOut={logOut} />
      </Router>
    </div>
  );
}

export default App;

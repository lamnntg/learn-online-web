import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import Landing from "./pages/Landing/Landing";
import MeetingHome from "./pages/MeetingHome/MeetingHome";
import MeetingRoom from "./pages/MeetingRoom/MeetingRoom";
import Classroom from "./pages/Classroom/Classroom";
import ClassroomDetail from "./pages/ClassroomDetail/ClassroomDetail";

import NotFound from "./pages/NotFound";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className="App">
      {
        !isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/sign-in" exact component={SignIn} />
            <Redirect from="*" to="/sign-in" />
          </Switch>
        )
        :
        (
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/meeting" component={MeetingHome} />
            <Route exact path="/meeting/:id" component={MeetingRoom} />
            <Main>
              <Route exact path="/dashboard" component={Home} />
              <Route exact path="/tables" component={Tables} />
              <Route exact path="/billing" component={Billing} />
              <Route exact path="/rtl" component={Rtl} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/classroom" component={Classroom} />
              <Route exact path="/classroom/:id" component={ClassroomDetail} />
              <Redirect from="*" to="/dashboard" />
            </Main>
          </Switch>
        )
      }
    </div>
  );
}

export default App;

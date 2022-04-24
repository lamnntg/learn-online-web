import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Home from './pages/Home';
import Questions from './pages/Questions';
import CreateQuestion from './pages/Questions/CreateQuestion';
import Learn from './pages/Learn';
import CourseVideo from './pages/Learn/Video';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Main from './components/layout/Main';
import Landing from './pages/Landing/Landing';
import MeetingHome from './pages/MeetingHome/MeetingHome';
import MeetingRoom from './pages/MeetingRoom/MeetingRoom';
import Classroom from './pages/Classroom/Classroom';
import ClassroomDetail from './pages/ClassroomDetail/ClassroomDetail';
import Classwork from './pages/ClassroomDetail/Classwork';
import People from './pages/ClassroomDetail/People';
import Setting from './pages/ClassroomDetail/Setting';
import CreateExam2 from './pages/ClassroomDetail/CreateExam2';
import ExamEdit from './pages/ExamEdit';
import Homework from './pages/ClassroomDetail/Homework';
import Exam from './pages/Exam/Exam';
import ClassroomChat from './pages/ClassroomChat/ClassroomChat';
import { history } from './helpers/history';
import { logout } from './redux/auth/auth.actions';
import AuthVerify from './common/AuthVerify';
import NotFound from './pages/NotFound';
import Room from './pages/MeetingRoom/Room';
import AppProviderContext from './contexts/AppProviderContext';

import 'antd/dist/antd.css';
import './assets/styles/main.css';
import './assets/styles/responsive.css';

function App() {
  const { isLoggedIn } = useSelector(state => state.auth);
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
            <Route exact path="/meeting/:id" component={Room} />
            <Route exact path="/exam" component={Exam} />

            <Main>
              <Route exact path="/dashboard" component={Home} />
              <Route exact path="/questions" component={Questions} />
              <Route exact path="/questions/create" component={CreateQuestion} />
              <Route exact path="/learn" component={Learn} />
              <Route exact path="/learn/lessons-for-newbie" component={CourseVideo} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/classroom" component={Classroom} />
              <AppProviderContext>
                <Route exact path="/classroom/:id/" component={ClassroomDetail} />
                <Route exact path="/classroom/:id/chat" component={ClassroomChat} />
                <Route exact path="/classroom/:id/homework" component={Classwork} />
                <Route exact path="/classroom/:id/people" component={People} />
                <Route exact path="/classroom/:id/setting" component={Setting} />
                <Route exact path="/classroom/:id/exam/create" component={CreateExam2} />
                <Route exact path="/classroom/:id/exam/:examId/edit" component={ExamEdit} />

                <Route exact path="/classroom/:id/homework/:homeworkId" component={Homework} />
              </AppProviderContext>

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


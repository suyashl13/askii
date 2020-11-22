import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MNavbar from './components/MNavbar';
import AnswerPage from './pages/AnswerPage';
import AuthenticationPage from './pages/AuthenticationPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { loginCtx } from './contexts/LoginCtx';
import "./App.css"
import ViewQuestion from './pages/ViewQuestion';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <loginCtx.Provider value={
      {
        isLoggedIn, setIsLoggedIn
      }
    }>
      <Router>
      <MNavbar/>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route exact path="/auth" component={AuthenticationPage} />
        <Route exact path="/answer/:id" component={AnswerPage} />
        <Route exact path="/question_info/:id" component={ViewQuestion} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </Router>
    </loginCtx.Provider>
  );
}

export default App;

import React, { Component } from 'react';
import DeletePerson from './DeletePerson';
import ViewUsers from './ViewUsers';
import SignUp from './SignUp';
import Home from './Home';
import Login from './Login';
import ShowQuiz from './ShowQuiz';
import CreateQuiz from './CreateQuiz';
import DeleteQuiz from './DeleteQuiz';
import DeleteQues from './DeleteQues';
import AddQues from './AddQues';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>Quiz</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/ShowQuiz'}>Quizzes</Link></li>
                  <li><Link to={'/DeleteQuiz'}>DeleteQuiz</Link></li>
                  <li><Link to={'/DeleteQues'}>DeleteQuestion</Link></li>
                  <li><Link to={'/AddQues'}>AddQuestion</Link></li>
                  <li><Link to={'/CreateQuiz'}>CreateQuiz</Link></li>
                  <li><Link to={'/DeletePerson'}>Delete User</Link></li>
                  <li><Link to={'/ViewUsers'}>View Users</Link></li>
                  <li><Link to={'/Login'}>Login</Link></li>
                  <li><Link to={'/SignUp'}>Sign Up</Link></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/ShowQuiz' component={ShowQuiz} />
                 <Route exact path='/DeleteQuiz' component={DeleteQuiz} />
                 <Route exact path='/DeleteQues' component={DeleteQues} />
                 <Route exact path='/AddQues' component={AddQues} />
                 <Route exact path='/CreateQuiz' component={CreateQuiz} />
                 <Route exact path='/DeletePerson' component={DeletePerson} />
                 <Route exact path='/ViewUsers' component={ViewUsers} />
                 <Route exact path='/Login' component={Login} />
                 <Route exact path='/SignUp' component={SignUp} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

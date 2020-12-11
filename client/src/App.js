import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// components
import Header from './components/Header'
// screens
import Home from './screens/Home';
import Users from './screens/Users';
import Show from './screens/Show';
import Edit from './screens/Edit';
import Add from './screens/Add';
import Lost from './screens/Lost';

function App() {
  
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/users' component={Users} />
        <Route path='/users/show/:userId' component={Show} />
        <Route path='/users/edit/:userId' component={Edit} />
        <Route path='/users/add' component={Add} />
        <Route exact path='/' component={Home} />
        <Route path='*' component={Lost} />
      </Switch>
    </Router>
  );
}

export default App;

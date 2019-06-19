import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import TodoListCreate from './todos/TodoListCreate';
import TodoListBoard from './todos/TodoListBoard';
import TodoItemCreate from './todos/TodoItemCreate';
import TodoListShow from './todos/TodoListShow';
import HeaderComponent from './HeaderComponent';
import history from '../history';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <HeaderComponent />
          <Switch>
            <Route path="/list" exact component={TodoListBoard} />
            <Route path="/streams/new" exact component={TodoListCreate} />
            <Route path="/streams/:id" exact component={TodoListShow} />
            <Route path="/todo/new/:id" exact component={TodoItemCreate} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
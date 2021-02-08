import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';


function App() {
  const [state, dispatch] = useStateValue();
  return (
    <div className="app">
        {!state?.user? (
          <Login />
        ):(
        <div className="app__body">
          <Router>
            <Sidebar/>
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>              
            </Switch>            
          </Router>
        </div>
        )}
    </div>
  );
}

export default App;

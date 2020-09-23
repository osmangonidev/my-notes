import React, { createContext, useState } from 'react';
import './App.css';
import { Route,BrowserRouter as Router, Switch } from 'react-router-dom';
import MyNotes from './Components/MyNotes/MyNotes';
import Login from './Components/Login/Login';
import AddNote from './Components/AddNote/AddNote';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';


function App() {
  const [notes,setNotes]=useState([]);
  const [isLogged,setIsLogged]=useState(false)
  return (
    <Router>
      <div className="App">
      </div>
      <Route exact path='/'>
        <Login></Login>
      </Route>
      <Route path='/login'>
        <Login></Login>
      </Route>
      <PrivateRoute path='/add-note'>
        <AddNote allNotes={[notes,setNotes]}></AddNote>
      </PrivateRoute>
      <PrivateRoute path='/my-notes'>
        <MyNotes allNotes={[notes,setNotes]}></MyNotes>
      </PrivateRoute>
    </Router>
    
  );
}

export default App;

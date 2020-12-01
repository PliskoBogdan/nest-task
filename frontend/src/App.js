import React, { useEffect, createContext, useReducer, useContext } from 'react'

import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

import './App.css';
import NavBar from './components/Navbar'
import SignIn from './components/screens/SignIn';
import SignUp from './components/screens/SignUp';
import Profile from './components/screens/Profile';
import CreatePost from './components/screens/CreatePost';
import { reducer, initialState } from './reducers/userReducer';


export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()

  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user);
    if (user) {
      dispatch({type: "USER", payload:user})
      history.push('/profile')
    } else {
      history.push('/signin')
    }
  }, [])

  return (
    <Switch>
      <Route path='/profile'><Profile /></Route>
      <Route path='/createpost'><CreatePost /></Route>
      <Route path='/signup'><SignUp /></Route>
      <Route path='/signin'><SignIn /></Route>
    </Switch>
  )

}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>

  );
}

export default App;

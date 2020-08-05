import React from 'react';
import {UseRoutes} from './routes'
import {BrowserRouter} from 'react-router-dom'
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/auth.context';
import 'materialize-css'
import { NavBar } from './components/navBar';
import { NavBarNoAuth } from './components//navBarNoAuth'


function App() {
  const { token, login, logout, userId } = useAuth()
  const isAuthenticated = !!token
  const routes = UseRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <BrowserRouter>
        { isAuthenticated?<NavBar />:<NavBarNoAuth/> }
        <div className='container'>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

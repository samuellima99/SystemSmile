import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

//import service auth
import { isAuthenticated } from '../services/auth';

//import pages authentication
import SignIn from '../pages/SingIn';
import SignUp from '../pages/SignUp';

//import pages Administrador
import Home from '../pages/Administrador/Home';
import RegisterClerk from '../pages/Administrador/RegisterClerk'
import ListClerks from '../pages/Administrador/ListClerks';
import EditClerks from '../pages/Administrador/EditClerk';
//Doctor
import RegisterDoctor from '../pages/Administrador/RegisterDoctor';
import ListDoctor from '../pages/Administrador/ListDoctor';
import EditDoctor from '../pages/Administrador/EditDoctor';


//import pages Clerk
import RegisterPatientes from '../pages/Clerk/RegisterPatientes';
import SignInClerk from '../pages/SignInClerk';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
    )}
  />
);


const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <PrivateRoute exact path="/admin/home" component={Home} />
      <PrivateRoute exact path="/admin/register" component={RegisterClerk} />
      <PrivateRoute exact path="/admin/listClerks" component={ListClerks} />
      <PrivateRoute exact path="/admin/editClerks/:id" component={EditClerks} />
      
      <PrivateRoute exact path="/admin/registerDoctor" component={RegisterDoctor} />
      <PrivateRoute exact path="/admin/listDoctors" component={ListDoctor} />
      <PrivateRoute exact path="/admin/editDoctor/:id" component={EditDoctor} />
      
      <Route exact path="/signin/clerk" component={SignInClerk}/>
      <Route exact path="/clerk/registerPatientes" component={RegisterPatientes} />




      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
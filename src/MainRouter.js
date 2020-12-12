import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './core/Home'
import Menu from './core/Menu'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import Users from './user/Users'
import FindPeople from './user/FindPeople'
import NewPost from './post/NewPost'
import SinglePost from './post/SinglePost'
import EditPost from './post/EditPost'
import ForgotPassword from './user/ForgotPassword'
import ResetPassword from './user/ResetPassword'
import PrivateRoute from './auth/PrivateRoute'
import Admin from "./admin/Admin"


const MainRouter=()=>(
  <div>
  <Menu/>
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route exact path="/forgot-password" component={ForgotPassword} />

      <PrivateRoute exact path="/admin" component={Admin} />

      <Route exact path="/users">
        <Users/>
      </Route>
      <Route exact path="/signup">
        <Signup/>
      </Route>
      <Route exact path="/signin">
        <Signin/>
      </Route>
      <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
      <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}/>
      <PrivateRoute exact path="/user/findpeople" component={FindPeople}/>
      <PrivateRoute exact path="/user/:userId" component={Profile}/>
      <PrivateRoute exact path="/post/create" component={NewPost}/>
      <PrivateRoute exact path="/post/edit/:postId" component={EditPost}/>
        <Route exact path="/post/:postId" component={SinglePost} />

    </Switch>
  </div>
)


export default MainRouter;

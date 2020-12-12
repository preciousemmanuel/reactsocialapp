import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import {signout,isAuthenticated} from '../auth'

const isActive=(history,path)=>{
  if(history.location.pathname===path) return {color:"#ff9900"}
  else return {color:"#ffffff"}
}




const Menu=({history})=>(
  <div>

    <ul className="nav nav-tabs bg-primary">
  <li className="nav-item">
    <Link className="nav-link " to="/" style={isActive(history,"/")}>Home</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link " to="/users" style={isActive(history,"/users")}>Users</Link>
  </li>
  <li className="nav-item float-right">
    <Link className="nav-link " style={isActive(history,`/post/create`)} to={`/post/create`}>Create Post</Link>
  </li>
  {!isAuthenticated()&&(
    <>
    <li className="nav-item">
      <Link className="nav-link" to="/signin" style={isActive(history,"/signin")}>Signin</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/signup" style={isActive(history,"/signup")}>Signup</Link>
    </li>
    </>
  )}

  {isAuthenticated()&&(
    <>
    <li className="nav-item float-right">
      <Link className="nav-link " style={isActive(history,`/user/findpeople`)} to={`/user/findpeople`}>Find People</Link>
    </li>

    <li className="nav-item float-right">
      <a className="nav-link " onClick={()=>signout(()=>history.push('/'))} style={{cursor:"pointer"}}>Signout</a>
    </li>
    <li className="nav-item float-right">
      <Link className="nav-link " style={isActive(history,`/user/${isAuthenticated().user._id}`)} to={`/user/${isAuthenticated().user._id}`}>{`${isAuthenticated().user.name}'s Profile`}</Link>
    </li>
    </>
  )}

  {isAuthenticated() && isAuthenticated().user.role==="admin" && (
    <li className="nav-item">
      <Link className="nav-link" to="/admin" style={isActive(history,"/admin")}>Admin</Link>
    </li>
  )}

</ul>
  </div>

)
//withRouter is a higher order Component that exposes the history propety to a Component
export default withRouter(Menu);

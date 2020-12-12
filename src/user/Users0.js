import React,{Component} from 'react';
import {isAuthenticated} from '../auth';
import defaultImg from '../images/user.png'
import {Link} from 'react-router-dom';

 class Users extends Component{

state={
  users:[]
}
list=()=>{
  fetch(`${process.env.REACT_APP_API_URL}users`,{
    method:"GET",
  }).then(response=>response.json())
  .then(data=>{

    if (data.error) {

      console.log(data.error)
    } else {
      this.setState({users:data})
    }
  })
}

renderUser=users=>{

  return (
  <div className="row">
   {
     users.map((user,index)=>
  ( <div key={index} className="card col-md-4 " >
  <img className="card-img-top" src={defaultImg} alt="Card image cap" style={{width:'100%',height:'18vw',objectFit:'cover'}}/>
  <div className="card-body">

      <h5 className="card-title">{user.name}</h5>

      <Link to={`/user/${user._id}`} className="btn btn-raised btn-primary">View profile</Link>
      </div>
    </div>
  ))
}
  </div>
  )
}

  componentDidMount(){
    this.list()
  }

render(){
  const {users}=this.state;
  return(
    <div className="jumbotron">
      <h2>Users</h2>
      {this.renderUser(users)}
    </div>
  )
}
}

export default Users;

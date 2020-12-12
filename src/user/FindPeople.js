import React,{Component} from 'react';
import {isAuthenticated} from '../auth';
import defaultImg from '../images/user.png'
import {Link} from 'react-router-dom';
import {findPeople,follow} from './apiUser';
//import {isAuthenticated} from '../auth'

 class FindPeople extends Component{

state={
  users:[],
  error:"",
  open:false,
  followMessage:""
}

clickFollow=(person,i)=>{
  const userId=isAuthenticated().user._id;
  const token=isAuthenticated().token;
  follow(userId,token,person._id)
  .then(data=>{
    if (data.error) {
      console.log(data.error)
    } else {
      let followUser=this.state.users;
      followUser.slice(i,1)
      this.setState({
        users:followUser,
        open:true,
        followMessage:`You have followed ${person.name}`
      })
    }
  })
}
renderUser=users=>{

  return (
  <div className="row">
   {
     users.map((user,index)=>
  ( <div key={index} className="card col-md-4 " >
    <img style={{height: "200px",width: "auto"}} className="img-thumbnail" src={`${process.env.REACT_APP_API_URL}user/photo/${user._id}`}
      onError={index=>(index.target.src=`${defaultImg}`)}
      alt={user.name} />
  <div className="card-body">

      <h5 className="card-title">{user.name}</h5>

      <Link to={`/user/${user._id}`} className="btn btn-raised btn-primary">View profile</Link>
      <button type="button" onClick={()=>this.clickFollow(user,index)} className="btn btn-success btn-raised float-right">Follow</button>
      </div>
    </div>
  ))
}
  </div>
  )
}

  componentDidMount(){
    const userId=isAuthenticated().user._id;
    const token=isAuthenticated().token;
  findPeople(userId,token)
  .then(data=>{
    console.log(data)
    if(data.error){
      console.log(data.error)
    }else {
      this.setState({users:data})
    }

  })
  }

render(){
  const {users,open ,followMessage}=this.state;
  return(
    <div className="jumbotron">
      <h2>Find People</h2>
      {open &&(
        <div className="alert alert-success">{followMessage}</div>
      )}
      {this.renderUser(users)}
    </div>
  )
}
}

export default FindPeople;

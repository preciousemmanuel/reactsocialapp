import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {isAuthenticated,signout} from '../auth';


class DeleteUser extends Component {

  state={
    redirect:false
  }

  remove=(userId,token)=>{
    console.log(userId)
   fetch(`${process.env.REACT_APP_API_URL}user/${userId}`,{
     method:"DELETE",
     headers:{
       Accept:'application/json',
       "Content-Type":"application/json",
       Authorization:`Bearer ${token}`
     }
   }).then(response=>response.json())
   .then(data=>{

     if (data.error) {
       //this.setState({redirectToSignin:true})
       console.log("Error in deleting...")
     } else {
       signout(()=>console.log("delete user"))
      this.setState({redirect:true})
     }
   })
 }

  deleteUser=()=>{
    const token=isAuthenticated().token;
    const userId=this.props.userId;
    this.remove(userId,token)
  };
  deleteConfirm=()=>{
    if (window.confirm("Do you want to delete?")) {
      // const token=isAuthenticated().token;
      // console.log(token)
      this.deleteUser()
    }
  }

  render() {
    if (this.state.redirect) {
    return  <Redirect to="/" />
    }
    return (
    <div>
      <button className="btn btn-raised btn-danger" onClick={this.deleteConfirm}>Delete Profile</button>
    </div>
    );
  }
}
export default DeleteUser;

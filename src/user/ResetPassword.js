import React,{Component} from 'react';
import {resetPassword} from '../auth';

class ResetPassword extends Component {
  state={
    message:"",
    error:"",
    newPassword:""
  }

  resetPassword=(e)=>{
    e.preventDefault();
    this.setState({message:"",error:""})

  resetPassword({newPassword:this.state.newPassword,resetPasswordLink:this.props.match.params.resetPasswordToken})
  .then(data=>{
    if (data.error) {
      console.log(data.error)
      return this.setState({error:data.error})
    }else{
      this.setState({error:"",message:data.message})
    }
  })
  .catch(e=>{
    console.log(e)
  })
}
  render(){
    return(
      <div className="container">
      <h2 className="mt-5 mb-5">Reset Password</h2>
      {this.state.message&&(
        <h4 className="text-success">{this.state.message}</h4>
      )}
      {this.state.error&&(
        <h4 className="text-danger">{this.state.error}</h4>
      )}
      <form>
        <div className="form-group mt-5">
        <input type="password" name="newPassword" value={this.state.newPassword}
        className="form-control"
        placeholder="Enter your password"
        onChange={e=>this.setState({newPassword:e.target.value,message:"",error:""})}
        autoFocus
          />

        </div>
        <button className="btn btn-raised btn-primary" onClick={this.resetPassword}>Reset password</button>
      </form>
      </div>
    )
  }
}

export default ResetPassword;

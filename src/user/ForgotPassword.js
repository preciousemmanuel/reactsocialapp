import React,{Component} from 'react';
import {forgotPassword} from '../auth';

class ForgotPassword extends Component {
  state={
    message:"",
    error:"",
    email:""
  }

  forgotPassword=(e)=>{
    e.preventDefault();
    this.setState({message:"",error:""})

  forgotPassword(this.state.email)
  .then(data=>{
    if (data.error) {
      console.log(data.error)
      return this.setState({error:data.error})
    }else{
      this.setState({error:"",message:data.message,email:""})
    }
  })
  .catch(e=>{
    console.log(e)
  })
}
  render(){
    return(
      <div className="container">
      <h2 className="mt-5 mb-5">Ask for password reset</h2>
      {this.state.message&&(
        <h4 className="text-success">{this.state.message}</h4>
      )}
      {this.state.error&&(
        <h4 className="text-danger">{this.state.error}</h4>
      )}
      <form>
        <div className="form-group mt-5">
        <input type="" name="email" value={this.state.email}
        className="form-control"
        placeholder="Enter your email"
        onChange={e=>this.setState({email:e.target.value,message:"",error:""})}
        autoFocus
          />

        </div>
        <button className="btn btn-raised btn-primary" onClick={this.forgotPassword}>Send reset link</button>
      </form>
      </div>
    )
  }
}

export default ForgotPassword;

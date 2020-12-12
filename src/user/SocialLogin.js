import React,{Component} from 'react';
import GoogleLogin from 'react-google-login';
import {socialLogin,authenticate} from '../auth'
import {Redirect} from 'react-router-dom';

class SocialLogin extends Component{

  constructor(){
    super();
    this.state={
      redirectToReferer:false
    }
  }
  responseGoogle=(response)=>{
    console.log(response)
    const{googleId,name,email,imageUrl}=response.profileObj;
    const user={
      password:googleId,
      name,
      email,
      imageUrl
    }
    socialLogin(user)
    .then(data=>{
      if (data.error) {
        console.log("Error login..Please try again")
      } else {
        //success
        authenticate(data,()=>{
          this.setState({redirectToReferer:true})
        })
      }
    })
  }

  render(){
    if (this.state.redirectToReferer) {
      return <Redirect to="/"/>
    }
    return(
      <div className="container">
        <GoogleLogin
        clientId="597193829870-t8r97htl4ce79vfi7251i3r0qcbvhoje.apps.googleusercontent.com"
        buttonText="Login with Google"
       onSuccess={this.responseGoogle}
       onFailure={this.responseGoogle}
         />
      </div>
    )
  }
}

export default SocialLogin;

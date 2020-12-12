import React,{Component} from 'react';
import {Redirect,Link} from 'react-router-dom';
import {signin,authenticate} from '../auth'
import SocialLogin from './SocialLogin'

 class Signin extends Component{
   constructor(){
     super();
     this.state={
       email:'',
       password:'',
       error:'',
       redirectToReferer:false,
       loading:false,
       recaptcha:false
     }
   }

   handleChange=(name)=>event=>{
     this.setState({error:""})
     this.setState({[name]:event.target.value})
   }


   clickSubmit=(event)=>{
     event.preventDefault();
     this.setState({loading:true})
     const {email,password,recaptcha}=this.state;
     const user={
       email,
       password
     }
     if (recaptcha) {
     signin(user)
     .then(data=>{
       if(data.error){
         this.setState({error:data.error,loading:false})
       }
       else{
         //authenticate user
         authenticate(data,()=>{
           this.setState({redirectToReferer:true,loading:false})
         })
       }
     })
   } else {
     this.setState({
                loading: false,
                error: "What day is today? Please write a correct answer!"
            });
   }
   }

   recaptchaHandler=event=>{
     this.setState({error:""})
     let userDay=event.target.value.toLowerCase();
     let dayCount;
     if (userDay==="sunday") {
       dayCount=0;
     }else if (userDay==="monday") {
       dayCount=1;
     }
     else if (userDay==="tuesday") {
       dayCount=2;
     }else if (userDay==="wednessday") {
       dayCount=3;
     }else if (userDay==="thursday") {
       dayCount=4;
     }else if (userDay==="friday") {
       dayCount=5;
     }else if (userDay==="saturday") {
       dayCount=6
     }
     if (dayCount===new Date().getDay()) {
       this.setState({recaptcha:true})
       return true;
     }else {
       this.setState({recaptcha:false})
       return false;
     }
   }



   render(){
     const {email,password,error,redirectToReferer,loading,recaptcha}=this.state;
     if (redirectToReferer) {
       return <Redirect to="/" />
     }

  return(
    <div className="container">
      <h2 className="mt-5 mb-5">Signin</h2>
      <div className="alert alert-danger" style={{display:error?'':'none'}}>{error}</div>
      {loading?(
        <div className="jumbotron">
          <h2 >Loading...</h2>
        </div>
      ):''}
      <form>

        <div className="form-group">
          <label className="text-muted">Email</label>
          <input type="email" value={email} onChange={this.handleChange('email')} className="form-control" />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input type="password" value={password} onChange={this.handleChange('password')} className="form-control" />
        </div>
        <div className="form-group">
          <label className="text-muted">
            {recaptcha?"Thanks. You got it":"Whats day is today"}
            </label>
          <input type="text"  onChange={this.recaptchaHandler} className="form-control" />
        </div>
        <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>Submit</button>
      </form>
      <p>
        <Link to="/forgot-password" className="text-danger">Forgot Password</Link>
      </p>
      <hr/>
      <SocialLogin/>
    </div>
  )
}
}

export default Signin;

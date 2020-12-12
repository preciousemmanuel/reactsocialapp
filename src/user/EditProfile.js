import React,{Component} from 'react';
import {isAuthenticated} from '../auth';
import {updateUser,updateLocal} from './apiUser';
import {Redirect} from 'react-router-dom';
import defaultImg from '../images/user.png'

class EditProfile extends Component {
  constructor() {
    super();
    this.state={
      id:"",
      name:"",
      email:"",
      password:"",
      fileSize:0,
      loading:false,
      redirectToProfile:false,
      about:""
    }
  }
  init=(userId)=>{
   fetch(`${process.env.REACT_APP_API_URL}user/${userId}`,{
     method:"GET",
     headers:{
       Accept:'application/json',
       "Content-Type":"application/json",
       Authorization:`Bearer ${isAuthenticated().token}`
     }
   }).then(response=>response.json())
   .then(data=>{

     if (data.error) {
       this.setState({redirectToProfile:true})
       //console.log(data.error,isAuthenticated().token)
     } else {
       this.setState({id:data._id,name:data.name,email:data.email,about:data.about})
     }
   })
 }
  componentDidMount(){
    this.userData=new FormData();
    const userId=this.props.match.params.userId;
    console.log(userId)
    this.init(userId)
  }
  handleChange=(name)=>event=>{

    this.setState({error:""});
    const value=name==="photo"?event.target.files[0]:event.target.value;
    const fileSize=name==="photo"?event.target.files[0].size:0
    this.userData.set(name,value)
    this.setState({[name]:value,fileSize})
    console.log(value)

  }

  isValid=()=>{
    const {name,email,password,fileSize}=this.state;
    console.log(fileSize)
    if (fileSize>500000) {
      this.setState({error:"File size musnt be more than 5mb"});
      return false;
    }
    if (name.length===0) {
      this.setState({error:"Name is required"});
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({error:"Email is valid"})
      return false;
    }
    if (password.length>=1 && password.length<=4) {
      this.setState({error:"Password must be more than six "})
      return false;
    }
    return true;
  }

  clickSubmit=(event)=>{
    event.preventDefault();

    if (this.isValid()) {
      this.setState({loading:true})
      console.log(this.userData)
    // const {name,email,password,id}=this.state;
    // const user={
    //   name,
    //   email,
    //   password:password||undefined,
    //
    // }
    const userId=this.props.match.params.userId;
    const token=isAuthenticated().token;
    updateUser(userId,token,this.userData)
    .then(data=>{
      if(data.error) console.log(data.error)
      else if (isAuthenticated().user.role==="admin") {
          this.setState({
            redirectToProfile:true
          })
      }
      else{
        updateLocal(data,()=>{
          this.setState({
          error:"",
          name:"",
          email:"",
          password:"",
          about:"",
          open:true,
          redirectToProfile:true
        })
        })

    }
    })
  }
  }

  render() {
    const {id,email,name,photo,password,redirectToProfile,error,loading,about}=this.state;
    //console.log("re",redirectToProfile)
    if(redirectToProfile){
      return <Redirect to={`/user/${id}`}/>
    }
    const photoUrl=id?`${process.env.REACT_APP_API_URL}user/photo/${id}?${new Date().getTime()}`:defaultImg;
    return (
      <div className="container">
      <h2 className="mt-5 mb-5">Edit Profile</h2>
      <div className="alert alert-danger" style={{display:error?'':'none'}}>{error}</div>
        {loading?(
          <div className="jumbotron">
            <h2 >Loading...</h2>
          </div>
        ):''}
        <img style={{height: "200px",width: "auto"}} className="img-thumbnail"
          onError={index=>(index.target.src=`${defaultImg}`)}
           src={photoUrl} alt={name} />
      <form>
        <div className="form-group">
          <label className="text-muted">Choose profile photo</label>
          <input type="file" onChange={this.handleChange('photo')} accept="image/*" className="form-control" />
        </div>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input type="text" value={name} onChange={this.handleChange('name')} className="form-control" />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input type="email" value={email} onChange={this.handleChange('email')} className="form-control" />
        </div>
        <div className="form-group">
          <label className="text-muted">About</label>
          <textarea  type="text" value={about} onChange={this.handleChange('about')} className="form-control" />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input type="password" value={password} onChange={this.handleChange('password')} className="form-control" />
        </div>
        <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>Update</button>
      </form>
      </div>
    );
  }
}

export default EditProfile

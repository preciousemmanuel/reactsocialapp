import React,{Component} from 'react';
import {isAuthenticated} from '../auth';
import {create} from './apiPost';
import {Redirect} from 'react-router-dom';
import defaultImg from '../images/user.png'

class NewPost extends Component {
  constructor() {
    super();
    this.state={
    title:"",
    body:"",
    photo:"",
    error:"",
    user:{},
    fileSize:0,
    loading:false,
    redirectToProfile:false
    }
  }

  componentDidMount(){
    this.postData=new FormData();
    this.setState({user:isAuthenticated().user})
  }
  handleChange=(name)=>event=>{

    this.setState({error:""});
    const value=name==="photo"?event.target.files[0]:event.target.value;
    const fileSize=name==="photo"?event.target.files[0].size:0
    this.postData.set(name,value)
    this.setState({[name]:value,fileSize})
    console.log(value)

  }

  isValid=()=>{
    const {title,body,fileSize}=this.state;
    console.log(fileSize)
    if (fileSize>500000) {
      this.setState({error:"File size musnt be more than 5mb"});
      return false;
    }
    if (title.length===0 || body.length===0) {
      this.setState({error:"All fields are required"});
      return false;
    }

    return true;
  }

  clickSubmit=(event)=>{
    event.preventDefault();

    if (this.isValid()) {
      this.setState({loading:true})

    // const {name,email,password,id}=this.state;
    // const user={
    //   name,
    //   email,
    //   password:password||undefined,
    //
    // }
    const userId=isAuthenticated().user._id;
    const token=isAuthenticated().token;
    create(userId,token,this.postData)
    .then(data=>{
      if(data.error) console.log(data.error)
      else{
        console.log("new post",data);
          this.setState({loading:false,title:"",body:"",photo:"",fileSize:0,error:"",redirectToProfile:true})
    }
    })
  }
  }

  render() {
    const {title,body,photo,redirectToProfile,error,loading,user}=this.state;
    //
    if(redirectToProfile){
      return <Redirect to={`/user/${user._id}`}/>
    }
    //const photoUrl=id?`${process.env.REACT_APP_API_URL}user/photo/${id}?${new Date().getTime()}`:defaultImg;
    return (
      <div className="container">
      <h2 className="mt-5 mb-5">Create Post</h2>
      <div className="alert alert-danger" style={{display:error?'':'none'}}>{error}</div>
        {loading?(
          <div className="jumbotron">
            <h2 >Loading...</h2>
          </div>
        ):''}

      <form>
        <div className="form-group">
          <label className="text-muted">Choose profile photo</label>
          <input type="file" onChange={this.handleChange('photo')} accept="image/*" className="form-control" />
        </div>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input type="text" value={title} onChange={this.handleChange('title')} className="form-control" />
        </div>

        <div className="form-group">
          <label className="text-muted">Body</label>
          <textarea  type="text" value={body} onChange={this.handleChange('body')} className="form-control" />
        </div>

        <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>Submit</button>
      </form>
      </div>
    );
  }
}

export default NewPost

import React,{Component} from 'react';
import {isAuthenticated} from '../auth';
import {singlePost,update} from './apiPost';
import defaultImg from '../images/comming.jpg'
import {Redirect} from 'react-router-dom';

class EditPost  extends Component{
  state={
    id:"",
    title:"",
    body:"",
    error:"",
    fileSize:0,
    loading:false,
    redirectToHome:false
  }

  init=(postId)=>{
   singlePost(postId)
   .then(data=>{

     if (data.error) {
      // this.setState({redirectToProfile:true})
       //console.log(data.error,isAuthenticated().token)
     } else {
       this.setState({id:data._id,title:data.title,body:data.body})
     }
   })
 }
  componentDidMount(){
    this.postData=new FormData();
    const postId=this.props.match.params.postId;
    console.log(postId)
    this.init(postId)
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
      this.setState({error:"All fields is required"});
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
    const postId=this.props.match.params.postId;
    const token=isAuthenticated().token;
    update(postId,token,this.postData)
    .then(data=>{
      if(data.error) console.log(data.error)
      else{
        this.setState({
        error:"",

        loading:false,

        redirectToHome:true
      })

    }
    })
  }
  }


  render() {
    const {id,title,body,error,loading,redirectToHome}=this.state;

    if (redirectToHome) {
      return <Redirect to="/" />
    }
    return (
      <div className="container">
      <h2 className="mt-5 mb-5">Edit Post</h2>
      <img style={{height: "200px",width: "auto"}} className="img-thumbnail"
        onError={index=>(index.target.src=`${defaultImg}`)}
         src={`${process.env.REACT_APP_API_URL}post/photo/${id}?${new Date().getTime()}`} alt={title} />
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

export default EditPost;

import React,{Component} from 'react';
import {comment,uncomment} from './apiPost';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import defaultImg from '../images/user.png'


class Comment extends Component{
  state={
    text:"",
    error:""
  }

isValid=()=>{
  const {text} =this.state;
  if (!text.length>0 || text.length>150) {
    this.setState({error:"Comment should not be empty and less than 150 characters long!"});
    return false;

  }

  return true;
}
  handleChange=(e)=>{
    this.setState({error:""})
    this.setState({text:e.target.value})
  }
  addComment=event=>{
    event.preventDefault();
    if (!isAuthenticated()) {
      this.setState({error:"Please sigin in to comment"})
      return false;
    }
    if (this.isValid()) {



    const userId=isAuthenticated().user._id;
    const token=isAuthenticated().token;
    const postId=this.props.postId;

    comment(postId,userId,token,{text:this.state.text})
    .then(data=>{
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({text:""})
        this.props.updateComment(data.comments)
      }
    })
  }
  }


  deleteConfirm=(comment)=>{
    if (window.confirm("Do you want to delete?")) {
      // const token=isAuthenticated().token;
      // console.log(token)
      this.deleteComment(comment)
    }
  }

  deleteComment=comment=>{

        const userId=isAuthenticated().user._id;
        const token=isAuthenticated().token;
        const postId=this.props.postId;

        uncomment(postId,userId,token,comment)
        .then(data=>{
          if (data.error) {
            console.log(data.error);
          } else {

            this.props.updateComment(data.comments)
          }
        })
  }

  render(){
    const {comments} =this.props;
    const{error}=this.state;
    return(
      <div>
      <h4 className="mt-5 mb-5">Leave a Comment</h4>
        <div className="alert alert-danger" style={{display:error?'':'none'}}>{error}</div>
      <form onSubmit={this.addComment}>
        <div className="form-group">
          <input className="form-control" type="text" name="text" onChange={this.handleChange} value={this.state.text} />
        </div>
      </form>

      <div className="col-md-8 col-md-offset-2">
      <h3 className="text-primary">{comments.length} Comments</h3>
      <hr/>
      {comments.map((comment,i)=>(
        <div key={i}>

            <div>
            <Link to={`/user/${comment.postedBy._id}`}>
              <img
                style={{borderRadius: "50%",border:"1px solid black"}}
              className="float-left mr-2"
              height="30px"
              width="30px"
                onError={index=>(index.target.src=`${defaultImg}`)}
                src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                 alt={comment.postedBy.name} />
                 </Link>
                 <div>
                 <p>{comment.text}</p>
                   <p className="font--italic mark">
                     Posted by <Link to={`${comment.postedBy.id}`}>{comment.postedBy.name}</Link> {''} on  {new Date(comment.created_at).toDateString()}
                     <span>

                       {isAuthenticated().user && isAuthenticated().user._id===comment.postedBy._id &&(
                         <>

                             <span onClick={()=>this.deleteConfirm(comment)} style={{cursor:"pointer"}} className="mr-1 float-right text-danger">Remove</span>
                          </>
                       )}</span>
                   </p>

                 </div>


            </div>

        </div>
      ))}
      </div>

      </div>
    )
  }
}

export default Comment;

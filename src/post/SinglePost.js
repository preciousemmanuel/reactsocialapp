import React,{Component} from 'react';
import {singlePost,remove,like,unlike} from './apiPost';
import defaultImg from '../images/comming.jpg'
import {Link,Redirect} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import Comment from './Comment';

class SinglePost extends Component {
  state={
    post:"",
    redirectToHome:false,
    redirectToSignin:false,
    likes:0,
    like:false,
    comments:[]
  }

  componentDidMount(){
    const postId=this.props.match.params.postId;
      singlePost(postId)
      .then(data=>{
        if (data.error) {
          console.log(data.error)
        } else {

        }
        this.setState({post:data,likes:data.likes.length,like:this.checkLike(data.likes),comments:data.comments})
      })
  }

updateComment=comments=>{
  this.setState({comments})
}

checkLike=(likes)=>{
  const userId=isAuthenticated() && isAuthenticated().user._id
  let match=likes.some(like=>{
    return like===userId
  })
  return match;
}
  toggleLike=()=>{
    if (!isAuthenticated()) {
      this.setState({redirectToSignin:true});
      return false;
    }
    const userId=isAuthenticated().user._id;
    const token=isAuthenticated().token;
    const postId=this.state.post._id;

    let callApi=this.state.like?unlike:like;

    callApi(postId,userId,token)
    .then(data=>{
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({
          likes:data.likes.length,
          like:!this.state.like
        })
      }
    })
  }
  deleteConfirm=()=>{
    if (window.confirm("Do you want to delete?")) {
      // const token=isAuthenticated().token;
      // console.log(token)
      this.deletePost()
    }
  }

  deletePost=()=>{
    const postId=this.props.match.params.postId;
    const token=isAuthenticated().token
    remove(postId,token)
    .then(data=>{
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({redirectToHome:true})
      }
    })
  }

  renderPost=(post)=>{
    const {likes,like} =this.state;
    const posterId=post.postedBy?`/user/${post.postedBy._id}`:"";
    const posterName=post.postedBy?post.postedBy.name:"Unkown";
    return (
      <div>  <h2 className="display-2 mt-5 mb-2">{post.title}</h2>
    <div className="card  " >

  <div className="card-body">
    <img src={`${process.env.REACT_APP_API_URL}post/photo/${post._id}`}
      style={{width: '100%',height: '300px',objectFit:"cover"}}
      alt={post.title} onError={i=>i.target.src=`${defaultImg}`}
      className="img-thumbnail mb-3"
       />
     {like?(
       <h3 onClick={this.toggleLike}><span className="fa fa-thumbs-up text-success bg-dark" style={{padding: "10px",borderRadius: "50%"}}></span>{likes} Like</h3>
     ):(
       <h3 onClick={this.toggleLike}><span className="fa fa-thumbs-up text-warning bg-dark" style={{padding: "10px",borderRadius: "50%"}}></span>{likes} Like</h3>
     )}

      <p className="card-text">{post.body}</p>
      <p className="font--italic mark">Posted by <Link to={`${posterId}`}>{posterName}</Link> {''} on  {new Date(post.created_at).toDateString()}</p>
      {isAuthenticated().user && isAuthenticated().user._id===post.postedBy._id &&(
        <div className="d-inline-block">
            <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-info mr-2">Edit Post</Link>
            <button onClick={this.deleteConfirm} className="btn btn-raised btn-danger">Delete Post</button>

          </div>
      )}

      <div>
    {isAuthenticated().user &&
        isAuthenticated().user.role === "admin" && (
            <div class="card mt-5">
                <div className="card-body">
                    <h5 className="card-title">Admin</h5>
                    <p className="mb-2 text-danger">
                        Edit/Delete as an Admin
                    </p>
                    <Link
                        to={`/post/edit/${post._id}`}
                        className="btn btn-raised btn-warning btn-sm mr-5"
                    >
                        Update Post
                    </Link>
                    <button
                        onClick={this.deleteConfirmed}
                        className="btn btn-raised btn-danger"
                    >
                        Delete Post
                    </button>
                </div>
            </div>
        )}
</div>
      </div>
    </div>
    </div>
  )
  }

  render() {
    if (this.state.redirectToHome) {
    return  <Redirect to="/" />
    }else if (this.state.redirectToSignin) {
        return  <Redirect to="/signin" />
    }
    const {post,comments}=this.state;
    return (

      <div className="container">
        {!post ?  (<div className="jumbotron">
            <h2 >Loading...</h2>
          </div>):this.renderPost(post)}

          <Comment postId={post._id} comments={comments} updateComment={this.updateComment} />
      </div>
    );
  }
}

export default SinglePost;

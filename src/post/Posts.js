import React,{Component} from 'react';
import {isAuthenticated} from '../auth';
import defaultImg from '../images/comming.jpg'
import {Link} from 'react-router-dom';
import {list} from './apiPost'

 class Posts extends Component{

state={
  posts:[]
}


renderPost=posts=>{

  return (
  <div className="row">
   {
     posts.map((post,index)=>
  {
    const posterId=post.postedBy?`/user/${post.postedBy._id}`:"";
    const posterName=post.postedBy?post.postedBy.name:"Unkown";
    return (
    <div key={index} className="card col-md-4 " >

  <div className="card-body">
    <img src={`${process.env.REACT_APP_API_URL}post/photo/${post._id}`}
      alt={post.title} onError={i=>i.target.src=`${defaultImg}`}
      className="img-thumbnail mb-3"
      style={{width: "100%",height: "200px"}}
       />
      <h5 className="card-title">{post.title}</h5>
      <p className="card-text">{post.body.substring(0,100)}</p>
      <p className="font--italic mark">Posted by <Link to={`${posterId}`}>{posterName}</Link> {''} on  {new Date(post.created_at).toDateString()}</p>
      <Link to={`/post/${post._id}`} className="btn btn-raised btn-primary">Read more</Link>
      </div>
    </div>
  )

})
}
  </div>
)
}

  componentDidMount(){
    list()
    .then(data=>{
        console.log(data.error)
      if (data.error) {

      } else {
        this.setState({posts:data})
      }
    })
  }

render(){
  const {posts}=this.state;
  return(
    <div className="jumbotron">
      <h2>{!posts.length?(<div className="jumbotron">
          <h2 >Loading...</h2>
        </div>):"Recent Posts"}</h2>
      {this.renderPost(posts)}
    </div>
  )
}
}

export default Posts;

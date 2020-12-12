import React,{Component} from 'react';
import {isAuthenticated} from '../auth';
import {Redirect,Link} from 'react-router-dom';
import defaultImg from '../images/user.png'
import DeleteUser from './DeleteUser'
import FollowProfileButton from './FollowProfileButton'
import ProfileTab from './ProfileTab'
import {listByUser} from '../post/apiPost'

class Profile extends Component {

state={
  user:{following:[],followers:[]},
  follower:false,
  redirectToSignin:false,
  error:'',
  posts:[]
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
      this.setState({redirectToSignin:true})
      console.log(data.error,isAuthenticated().token)
    } else {
      const follower=this.checkFollow(data)
      this.setState({user:data,follower})
      this.listPost(data._id)
    }
  })
}

listPost=(userId)=>{
  const token=isAuthenticated().token;
  listByUser(userId,token)
  .then(data=>{
    if (data.error) {
      console.log(data.error)
    } else {
      this.setState({posts:data})
    }
  })
}

componentWillReceiveProps(props){
  const userId=props.match.params.userId;
  console.log(userId)
  this.init(userId)
}

componentDidMount(){
  console.log(isAuthenticated().token)
  const userId=this.props.match.params.userId;
  console.log(userId)
  this.init(userId)
}

checkFollow=user=>{
  const jwt=isAuthenticated();
  const match=user.followers.find(follower=>{
    return follower._id===jwt.user._id
  })
  return match;
}

clickFollow=callApi=>{
  const userId=isAuthenticated().user._id;
  const token=isAuthenticated().token;
  callApi(userId,token,this.state.user._id)
  .then(data=>{
    if (data.error) {
      this.setState({error:data.error})
    } else {
    //  console.log(data.user)
      this.setState({user:data,follower:!this.state.follower})
    }
  })
}

  render(){
    // const redirectToSignin=this.state.redirectToSignin;
    // if (redirectToSignin) {
    //   return <Redirect to='/signin' />
    // }
    const {user,follower}=this.state;
      const photoUrl=this.state.user._id?`${process.env.REACT_APP_API_URL}user/photo/${this.state.user._id}?${new Date().getTime()}`:defaultImg;
    return(
      <div className="container">
      <h2 className="mt-5 mb-5">Profile</h2>
      <div className="row">
      <div className="col-md-6">

      <img style={{height: "200px",width: "auto"}} className="img-thumbnail"
         onError={index=>(index.target.src=`${defaultImg}`)}
         src={photoUrl} alt={this.state.user.name} />
      </div>
      <div className="col-md-6">
      <div className="lead">
      <p>Hello {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Joined:{new Date(user.created_at).toDateString()}</p>
      </div>
        {isAuthenticated().user && isAuthenticated().user._id==user._id ?(
          <div className="d-inline-block">
            <Link className="btn btn-raised btn-info mr-5" to={`/post/create`}>
            Create Post</Link>
            <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${user._id}`}>
            Edit Profile</Link>
          <DeleteUser userId={user._id}/>
          </div>
        ):<FollowProfileButton onButtonClick={this.clickFollow} follower={follower}/>}

        <div>
    {isAuthenticated().user &&
        isAuthenticated().user.role === "admin" && (
            <div class="card mt-5">
                <div className="card-body">
                    <h5 className="card-title">
                        Admin
                    </h5>
                    <p className="mb-2 text-danger">
                        Edit/Delete as an Admin
                    </p>
                    <Link
                        className="btn btn-raised btn-success mr-5"
                        to={`/user/edit/${user._id}`}
                    >
                        Edit Profile
                    </Link>
                    <DeleteUser userId={user._id} />
                </div>
            </div>
        )}
</div>
      </div>
      </div>
      <div className="row my-2">
        <div className="col md-12 mt-5 mb-5">
          <hr/>
          <p className="lead">{user.about}</p>
          <hr/>
          <ProfileTab followers={user.followers} following={user.following} posts={this.state.posts} />
        </div>
      </div>
      </div>
    )
  }
}

export default Profile;

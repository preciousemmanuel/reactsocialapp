import React from 'react';
import Post from '../post/Posts';

const Home=()=>{
  return(
    <div>
    <div className="jumbotron">
      <h2>Home</h2>
      <p>Welcome to React</p>
    </div>
    <div className="container">
      <Post/>
    </div>
  </div>
  )
}

export default Home;

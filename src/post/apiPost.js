export const create=(userId,token,post)=>{
  //console.log("user data",user)
  return fetch(`${process.env.REACT_APP_API_URL}post/new/${userId}`,{
    method:"POST",
    headers:{
      Accept:'application/json',

      Authorization:`Bearer ${token}`
    },
    body:post
  }).then((response)=>{
    return response.json();
  }).catch(error=>{
    console.log(error)
  })
}

export const listByUser=(userId,token)=>{
  //console.log("user data",user)
  return fetch(`${process.env.REACT_APP_API_URL}posts/by/${userId}`,{
    method:"GET",
    headers:{
      Accept:'application/json',

      Authorization:`Bearer ${token}`
    }
  }).then((response)=>{
    return response.json();
  }).catch(error=>{
    console.log(error)
  })
}


export const list=()=>{
    return fetch(`${process.env.REACT_APP_API_URL}posts`,{
    method:"GET",
  })
  .then((response)=>{
    return response.json()
  })
  .catch(error=>{
    console.log(error)
  })
}
export const singlePost=(postId)=>{
    return fetch(`${process.env.REACT_APP_API_URL}post/${postId}`,{
    method:"GET",
  })
  .then((response)=>{
    return response.json()
  })
  .catch(error=>{
    console.log(error)
  })
}


export const remove=(postId,token)=>{
  return fetch(`${process.env.REACT_APP_API_URL}post/${postId}`,{
    method:"DELETE",
    headers:{
      Accept:'application/json',

      Authorization:`Bearer ${token}`
    }
  })
  .then(response=>{
    return response.json()
  })
  .catch(error=>{
    console.log(error)
  })
}

export const update=(postId,token,post)=>{
  console.log("post data",post)
  return fetch(`${process.env.REACT_APP_API_URL}post/${postId}`,{
    method:"PUT",
    headers:{
      Accept:'application/json',

      Authorization:`Bearer ${token}`
    },
    body:post
  }).then((response)=>{
    return response.json();
  }).catch(error=>{
    console.log(error)
  })
}
export const like=(postId,userId,token)=>{

  return fetch(`${process.env.REACT_APP_API_URL}post/like`,{
    method:"PUT",
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json',
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({
      userId,postId
    })
  }).then((response)=>{
    return response.json();
  }).catch(error=>{
    console.log(error)
  })
}
export const unlike=(postId,userId,token)=>{

  return fetch(`${process.env.REACT_APP_API_URL}post/unlike`,{
    method:"PUT",
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json',
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({
      userId,postId
    })
  }).then((response)=>{
    return response.json();
  }).catch(error=>{
    console.log(error)
  })
}

export const comment=(postId,userId,token,comment)=>{

  return fetch(`${process.env.REACT_APP_API_URL}post/comment`,{
    method:"PUT",
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json',
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({
      userId,postId,comment
    })
  }).then((response)=>{
    return response.json();
  }).catch(error=>{
    console.log(error)
  })
}
export const uncomment=(postId,userId,token,comment)=>{

  return fetch(`${process.env.REACT_APP_API_URL}post/uncomment`,{
    method:"PUT",
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json',
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({
      userId,postId,comment
    })
  }).then((response)=>{
    return response.json();
  }).catch(error=>{
    console.log(error)
  })
}

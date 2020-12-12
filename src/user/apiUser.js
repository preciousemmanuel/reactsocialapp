export const updateUser=(userId,token,user)=>{
  console.log("user data",user)
  return fetch(`${process.env.REACT_APP_API_URL}user/${userId}`,{
    method:"PUT",
    headers:{
      Accept:'application/json',

      Authorization:`Bearer ${token}`
    },
    body:user
  }).then((response)=>{
    return response.json();
  }).catch(error=>{
    console.log(error)
  })
}

export const follow=(userId,token,followId)=>{
  //console.log("user data",user)
  return fetch(`${process.env.REACT_APP_API_URL}user/follow`,{
    method:"PUT",
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json',
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({userId,followId})
  }).then((response)=>{
    return response.json();
  }).catch(error=>{
    console.log(error)
  })
}

export const unfollow=(userId,token,unfollowId)=>{
  //console.log("user data",user)
  return fetch(`${process.env.REACT_APP_API_URL}user/unfollow`,{
    method:"PUT",
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json',
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({userId,unfollowId})
  }).then((response)=>{
    return response.json();
  }).catch(error=>{
    console.log(error)
  })
}

export const findPeople=(userId,token)=>{
  console.log("user data",userId)
  return fetch(`${process.env.REACT_APP_API_URL}user/findPeople/${userId}`,{
    method:"GET",
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json',
      Authorization:`Bearer ${token}`
    }

  }).then((response)=>{
    return response.json();
  }).catch(error=>{
    console.log(error)
  })
}


export const updateLocal=(user,next)=>{
  if (typeof window !=="undefined") {
    if (localStorage.getItem('jwt')) {
      let auth=JSON.parse(localStorage.getItem('jwt'));
      auth.user=user;
      localStorage.setItem('jwt',JSON.stringify(auth))
      next();
    }
  }
}

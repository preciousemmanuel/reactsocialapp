export const signin=(user)=>{
  return fetch(`${process.env.REACT_APP_API_URL}signin`,{
    method:"POST",
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json'
    },
    body:JSON.stringify(user)
  }).then((response)=>{
    return response.json();
  }).catch(error=>{
    console.log(error)
  })
}

export const authenticate=(jwt,next)=>{
  if (typeof window !="undefined") {
    localStorage.setItem("jwt",JSON.stringify(jwt))
    next();
  }
}

export const signup=(user)=>{
  return fetch(`${process.env.REACT_APP_API_URL}signup`,{
    method:"POST",
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json'
    },
    body:JSON.stringify(user)
  }).then((response)=>{
    return response.json();
  }).catch(error=>{
    console.log(error)
  })
}

export const forgotPassword=email=>{
  return fetch(`${process.env.REACT_APP_API_URL}forgot-password`,{
    method:"PUT",
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json'
    },
    body:JSON.stringify({email})
  }).then((response)=>{
    return response.json();
  }).catch(error=>{
    console.log(error)
  })
}

export const resetPassword=resetInfo=>{
  return fetch(`${process.env.REACT_APP_API_URL}reset-password`,{
    method:"PUT",
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json'
    },
    body:JSON.stringify(resetInfo)
  }).then((response)=>{
    return response.json();
  }).catch(error=>{
    console.log(error)
  })
}

export const signout=(next)=>{
  if(typeof window !=="undefined") localStorage.removeItem("jwt")
  next()
  return fetch(`${process.env.REACT_APP_API_URL}signout`,{
    method:"GET"
  })
  .then((response)=> {return response.json()})
  .catch(error=>console.log(error))
}

export const socialLogin=(user)=>{
  return fetch(`${process.env.REACT_APP_API_URL}social-login`,{
    method:"PUT",
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json'
    },
    body:JSON.stringify(user)
  }).then((response)=>{
    return response.json();
  }).catch(error=>{
    console.log(error)
  })
}


export const isAuthenticated=()=>{
  if (typeof window =="undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"))
  } else {
    return false;
  }
}

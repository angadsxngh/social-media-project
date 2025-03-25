import React from 'react'
import { useUser } from '../../context/UserContext'

function Temp() {

    const temp = useUser();

    if(temp.loading) return <p>Loading...</p>
    if(!temp.user) return <p>User not found</p>

  return (
    <div>
      <h1>{temp.user.name}</h1>
      <p>Username: {temp.user.username}</p>
      <p>Email: {temp.user.email}</p>
      <img src={temp.user.pfp} alt="Profile" width="100" />
      <p>Followers: {temp.user.followers.length}</p>
      <p>Following: {temp.user.following.length}</p>
    </div>
  )
}

export default Temp
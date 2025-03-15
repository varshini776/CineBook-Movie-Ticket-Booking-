import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()

    const handle=async(e)=>{
      e.preventDefault()
      const response=await fetch('http://localhost:5000/login',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email,password})
      })
      const data=await response.json()
      if(response.ok){ 
        console.log(data.message) // Display success message
        if(data.message==='Login sucessfull')
         { console.log(data.id)//response.data.id._id
        navigate(`/home/${data.id}`)
}
        else{
          alert(data.message)
        }
      }
    else {
        console.error(data.message);
      }
    }

   

  return (
    <form onSubmit={handle}>
      <h2>Login</h2>
      <input type='email' placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type='password' placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button type='submit'>Login</button>
      <br></br>
      <br></br>
      <div align="left"> New user <a href="/">signup</a> </div>
      <div align="right"> 
      <a href='/forgot'>Forgot Password</a>
      
      </div>
    </form>
  )
}

export default Login

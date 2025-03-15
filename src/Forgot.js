import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

const Forgot=()=>{
const [name,setName]=useState('')
const [email,setEmail]=useState('')
const[newpassword,setNewpassword]=useState('')
const navigate=useNavigate()

const updated=async(e)=>{
    e.preventDefault()
    const response=await fetch('http://localhost:5000/forgot',{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({name,email,newpassword})  
    })


const data=await response.json()
if(response.ok)
{
    if(data.message==='account exit')
    {
        alert('Password is updated')
        navigate('/home')
    }
    else{
        alert(data.message)
    }
}
else {
    console.error(data.message); // Display error message
  }}
    return(
        <form onSubmit={updated}>
            <h1>Reset your password</h1>
            <input type='text' placeholder="Username" value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type='email' placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' placeholder="New password" value={newpassword} onChange={(e)=>setNewpassword(e.target.value)}/>
            <button type='submit'>Update</button>
        </form>
    )
}

export default Forgot

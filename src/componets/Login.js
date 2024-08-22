import React, {useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import notecontext from '../context/notes/noteContext';
import Loading from './Loading';
export default function Login() {
  let navigate = useNavigate();
  let context = useContext(notecontext);
  const{setauthToken , setIsLogin} = context;
  const[display ,setDisplay] = useState('none');
  const[user , setUSer] = useState({
    email:"",
    password:""
  });
  const onChange = (e)=>{
    setUSer({...user , [e.target.name]:e.target.value});
  }
  const loginForm = async(e) =>{
    e.preventDefault();
     setDisplay('flex');
  try{
      const URL = "https://webbook-b.vercel.app/api/auth/login";
    const data = await fetch(URL , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({email:user.email,password:user.password})
    })
    let token = await data.json();
    if(token.success === true) {
      setIsLogin(true);
      localStorage.setItem('token',token.user_token);
      navigate('/mynotes');
      setauthToken(localStorage.getItem('token'));
      return;
    }else{
      alert(token.error);
    }
  }catch(error){
    console.error(error);
    setDisplay('none');
    alert("Some Error Accured!");
  }
  setDisplay('none');
  }
  return (
    <>
    <Loading display ={display}/>
    <div className='container w-100 border-danger d-flex justify-content-center'>
      <form onSubmit={loginForm} className='w-75 p-2 m-2'>
        <h2 className='text-center m-2 text-decoration-underline'>LOGIN</h2>
  <div className="m-4">
    <label htmlFor="loginemail" className="form-label">Email</label>
    <input type="email" value={user.email} className="form-control" name='email' id="loginemail" onChange={onChange}/>
  </div>
  <div className="m-4">
    <label htmlFor="loginpassword" className="form-label">Password</label>
    <input type="password" value={user.password} className="form-control" name='password' id="loginpassword" autoComplete='false' onChange={onChange}/>
  </div>
  <div className="m-4 d-flex justify-content-center">
    <div className="d-flex flex-wrap w-100 justify-content-center">
    <button type="submit" className="btn btn-primary w-100 text m-2">Login</button>
    <p className='text-center  w-100'>Don't have a Account?<Link to="/signup">Create a Account</Link></p>
    </div>
  </div>
</form>
    </div>
    </>
  )
}

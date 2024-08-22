import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import notecontext from '../context/notes/noteContext';
import Loading from './Loading';
export default function SignUp() {
  const[display , setDisplay] = useState('none');
  let navigate = useNavigate();
  const context = useContext(notecontext);
  const {setauthToken ,setIsLogin} = context;
  const [user, setuser] = useState({
    name:"",
    email:"",
    password:"",
    cpassword:""
  });
  const onchange =(e)=>{
    setuser({...user,[e.target.name]:e.target.value});
  }
  const register =async(e)=>{
    e.preventDefault();
   try{
     if(user.password!==user.cpassword) {
      alert("password did'nt match!");
      return false;
    }
    if(user.password.length<8) {
      alert("password should be atleast 8 characters!");
      return false;
    }
    setDisplay('flex');
    const URL = "https://webbook-b.vercel.app/api/auth/register";
    let data =  await fetch(URL ,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({name:user.name,email:user.email,password:user.password})
    })
    let token = await data.json();
    setDisplay('none');
    if(token.success === true){
      localStorage.setItem('token',token.user_token);
      setauthToken(localStorage.getItem('token'));
      setIsLogin(true);
      navigate('/');
      return;
    }else{
      alert(token.msg);
    }
  } catch(error) {
    console.error(error);
    alert("Some Error Accured!");
  }
}
  return (
    <>
    <Loading display = {display}/>
    <div className='container w-100 border-danger d-flex justify-content-center'>
      <form className='w-75 p-2 m-2' onSubmit={register}>
        <h2 className='text-center m-2 text-decoration-underline'>SIGN UP</h2>
        <div className="m-2">
          <label htmlFor="fullname" className="form-label">Full Name</label>
          <input value={user.name} type="text" name='name' className="form-control" id='fullname' onChange ={onchange} />
        </div>
        <div className="m-2">
          <label htmlFor='email' className="form-label">Email</label>
          <input value={user.email} type="email" name='email' className="form-control" id='email'  onChange ={onchange} />
        </div>
        <div className="m-2">
          <label htmlFor='password' className="form-label">Password</label>
          <input value={user.password} type="password" name='password' className="form-control" id='password' autoComplete='false' onChange ={onchange}  />
        </div>
        <div className="m-2">
          <label htmlFor='cpass' className="form-label">Confirm Password</label>
          <input value={user.cpassword} type="password" name='cpassword' className="form-control" id='cpass' autoComplete='false'  onChange ={onchange} />
        </div>
        <div className="d-flex flex-wrap w-100 justify-content-center">
    <button type="submit" className="btn btn-primary w-100 text m-2">Login</button>
    <p className='text-center  w-100'>Already have an Account?<Link to="/login">Login</Link></p>
    </div>
      </form>
    </div>
    </>
  )
}

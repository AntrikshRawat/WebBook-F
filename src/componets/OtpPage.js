/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './Home.css'
import notecontext from '../context/notes/noteContext'
import { useNavigate } from 'react-router-dom'
export default function ResetPass() {
  const navigate = useNavigate();
  const{Otp} = useContext(notecontext);
  const[uotp ,setUotp] = useState(0);
  const change =(e)=>{
    let a = parseInt(e.target.value);
    setUotp(a);
  }
  const handleClick = async(e)=>{
    e.preventDefault();
    if(uotp === Otp) {
      navigate('/reset');
    }else{
      alert('wrong otp');
    }
  }
  return (
    <>
    <form className="container h-25 mt-5 w-75" onSubmit={handleClick}>
      <h3 className='w-100 text-center mb-3'>Enter 6 Digit Otp:</h3>
      <div className="otp d-flex flex-wrap justify-content-center">
      <input type="text" placeholder = "******" onChange={change} maxLength={6} className='num w-100 text-light' autoFocus/>
      <button disabled = {uotp>99999?false:true} className='btn btn-dark 
      w-50 mt-4 mw-auto'>Submit</button>
      </div>
    </form>
    </>
  )
}

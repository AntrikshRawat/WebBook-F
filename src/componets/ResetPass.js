import React, { useContext, useState } from 'react'
import './Home.css'
import notecontext from '../context/notes/noteContext'
import { useNavigate } from 'react-router-dom';
export default function ResetPass() {
   const navigate = useNavigate();
   const{resetPassword} = useContext(notecontext);
   const [pass, setPass] = useState({
      pass: '',
      confirmpass: ''
   })
   const[load,setLoad] = useState(false);
   const Change = (e) => {
      setPass({ ...pass, [e.target.name]: e.target.value });
   }
   const submit = async(e) => {
      e.preventDefault();
      if (!(pass.pass === pass.confirmpass)) {
         alert("Confirm Password Did'nt Match!");
         return;
      }
      setLoad(true);
      let res = await resetPassword(pass.pass);
      setLoad(false);
      alert(res);
      navigate('/mynotes');
   }
   return (
      <>
         <form className="container h-25 mt-5 w-50" onSubmit={submit}>
            <div className="pass w-100">
               <h3 className='text-start text-dark'>New Password:</h3>
               <input className='num w-75' type="password" name="pass" minLength={8} maxLength={32} onChange={Change} autoComplete='true' />
            </div>
            <div className="pass w-100">
               <h3 className='text-start text-dark'>Confirm Password:</h3>
               <input onChange={Change} className='num w-75' type="password" name="confirmpass" minLength={8} maxLength={32} autoComplete='true' />
            </div>
            <div className="pass w-100">
               <button disabled = {load} className='btn btn-success mt-4 w-50'>
               { load === true && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
               <span className='mx-2' role="status">Reset Password</span>
               </button>
            </div>
         </form>
      </>
   )
}

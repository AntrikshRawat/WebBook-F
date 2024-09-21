/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import notecontext from './noteContext'
const URL = "https://webbook-b.vercel.app/api";
let allNotes = [];
const NoteState = (props) => {
  let token = localStorage.getItem('token');
	const [notes, setNotes] = useState(allNotes);
  const[authToken ,setauthToken] = useState(localStorage.getItem('token'));
  const[isLogin , setIsLogin] = useState(false);
  const[Otp ,setOtp] = useState(0);
	//fetch all notes
	const getAllNotes = async () => {
    try{
      const data = await fetch(`${URL}/notes/fetchallnotes`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "authtoken":`${token}`
        }
      });
      let dbnotes = await data.json();
      setNotes(allNotes.concat(dbnotes.notes));
  }catch(error) {
    console.error(error);
  }
	}

	//Add a note
	const addnote = async (title , tag ,description) => {
    if(isLogin === false) {
      alert("Login First!");
      return;
    }
		try{
      const dbnotes = await fetch(`${URL}/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authtoken": `${token}`
      },
      body: JSON.stringify({title ,tag , description})
    });
  }catch(error) {
    console.error(error);
  }
	}
	//delete a note
	const deletenote = async (id) => {
    if(isLogin === false) {
      alert("Login Required");
      return;
    } 
 try{  
      await fetch(`${URL}/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authtoken": `${token}`
      },
    })
  }catch(error) {
    console.error(error); 
  }
	}

	//edit a note
	const editnote = async (id,title,tag ,description) => {
    if(isLogin === false) {
      alert("Login Required!");
      return;
    }
  try {
      const dbnotes = await fetch(`${URL}/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authtoken": `${token}`
      },
      body:JSON.stringify({title , tag , description})
    })
  }catch(error) {
    console.error(error);
  }
	}
  const getprofile = async()=>{
    let data = await fetch(`${URL}/auth/getuser` ,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authtoken": `${authToken}`
      },
    })
    let user = await data.json();
    return user.user;
  }
  const emailSend=async()=>{
  try{ 
     let data = await fetch(`${URL}/auth/verification` ,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authtoken": `${authToken}`
      },
    })
    let responce = await data.json();
    if(responce.success === true) {
      setOtp(responce.otp);
     }
    return responce.success;
  }catch(error) {
    return false;
  }
  }
  const resetPassword =async(password)=>{
    try {
      let data = await fetch(`${URL}/auth/resetpassword` ,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authtoken": `${authToken}`
        },
        body:JSON.stringify({password})
      })
      let res = data.json();
      return res;
    } catch (error) {
      return error;
    }
  }
	return (
		<notecontext.Provider value={{notes, setNotes, addnote, deletenote, editnote, getAllNotes,authToken,setauthToken ,isLogin ,setIsLogin ,getprofile,emailSend,Otp,setOtp,resetPassword}}>
			{props.children}
		</notecontext.Provider>
	)
}
export default NoteState;
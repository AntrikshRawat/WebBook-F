import React, { useContext,useState } from 'react'
import notecontext from '../context/notes/noteContext'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
const Home = () => {
  const[display ,setDisplay] = useState('none');
  const context = useContext(notecontext);
  let navigate = useNavigate();
  const {isLogin, addnote} = context;
  const[note , setNote] = useState({
    title:"",
    tag:"",
    description:""
  });
  const handleClick =async()=>{
    if(isLogin === false) {
      alert("you need to login first!");
      return false;
    }
    setDisplay('flex');
    await addnote(note.title , note.tag , note.description);
    setDisplay('none');
    navigate('/mynotes');
  }
   const onChange=(e)=>{
    setNote({...note , [e.target.name]:e.target.value})
   }
  return (
    <>
    <Loading display = {display}/>
    <div className="container p-2 mb-3 createnote">
      <h1 className='text-center p-2'>Create A Note...</h1>
      <div className="note">
        <div className="noteheader mb-2">
        <input type="text" className='title m-1' placeholder='Add A Title' onChange={onChange} name='title'/>
        <input type="text" className='tag m-1' placeholder='Add A Tag' onChange={onChange} name='tag' required/>
        </div>
        <div className="description mt-2">
          <textarea name="description" placeholder='Write Your Note Here....' className='w-100 din' rows={10} onChange={onChange}></textarea>
        </div>
        <button disabled = {(note.description.length>=10&&note.title.length>0)?false:true} onClick={handleClick} className='btn btn-success m-4 mb-3'>Add Note</button>
      </div>
    </div>
    </>
  )
}

export default Home

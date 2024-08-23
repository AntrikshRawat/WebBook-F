import React, { useContext, useEffect, useRef, useState } from 'react'
import notecontext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import Loading from './Loading';
import { Link } from 'react-router-dom';
export default function Notes() {
  const[display ,setDisplay] = useState('none');
  const context = useContext(notecontext);
  const { notes, getAllNotes ,editnote ,deletenote} = context;
  useEffect(()=>{
    getAllNotes();
  });
  const ref = useRef(null);
  const refclose = useRef(null);
  const [note, setNote] = useState({
    _id:"",
   title: "",
    tag: "",
    description: ""
  });
  const update = (id ,tag , title , description) => {
    setNote({
      _id:id,
      title:title,
      tag:tag?tag:"",
      description:description
    });
    ref.current.click();
  }
  const deleteone =async(id)=>{
    setDisplay('flex');
    await deletenote(id);
    setDisplay('none');
}
  const handleClick = async() => {
    setDisplay('flex');
    await editnote(note._id , note.title , note.tag , note.description);
    setDisplay('none');
    refclose.current.click();
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div className='p-2'>
    <Loading display = {display}/>
      <button ref={ref} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className='d-none'></button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark text-center w-100" id="exampleModalLabel">UPDATE NOTE</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                <div className="mb-3">
                  <label htmlFor="Title" className="form-label text-dark">Title
                  </label>
                  <input id='Title' value={note.title} onChange={onChange} type="text" className="form-control"
                    name='title' required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="Tag" className="form-label text-dark">Tag</label>
                  <input value={note.tag} onChange={onChange} type="text" className="form-control"
                    name='tag' id="Tag" />
                </div>
                <div className="mb-3">
                  <label htmlFor="Description" className="form-label text-dark">Description
                  </label>
                  <input id='Description' value={note.description} onChange={onChange} type="text" className="form-control"
                    name='description' required minLength={10}/>
                </div>
                <div className="modal-footer">
                  <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button disabled = {(note.title.length>0&&note.description.length>=10)?false:true} onClick={handleClick} type="submit" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-center m-4'>Your Saved Notes</h2>
        <div className="row">
          {notes.length === 0 && <p className='text-center'>No Notes Available</p>}
          {notes.map((note) => {
            return (
              <div className="col-12 col-md-4" key={note._id}>
                <Noteitem
                  id={note._id}
                  tag={note.tag}
                  title={note.title}
                  description={note.description}
                  date = {note.date}
                  update={update}
                  deleteone = {deleteone} />
              </div>
            )
          })}
        </div>
        <div className=" w-100 d-flex justify-content-center">
        <Link to={"/createnote"} className='btn btn-primary'>Create A New Note</Link>
        </div>
      </div>
    </div>
  )
}

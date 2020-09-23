import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {faArrowAltCircleRight} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './AddNote.css'
const AddNote = (props) => {

    const [notes,setNotes]=props.allNotes;
    const [note,setNote]=useState({title:'',description:''});

    function handleOnBlur(e){
        const newNote={...note};
        newNote[e.target.name]=e.target.value;
        setNote(newNote);
    }

    function handleAddNote(e){
        const newNotes=[...notes,note];
        setNotes(newNotes);
        document.getElementById('title').value='';
        document.getElementById('description').value='';
        
        const existNotes=JSON.parse(localStorage.getItem('notes'))||[];
        existNotes.push(note);
        localStorage.setItem('notes', JSON.stringify(existNotes));
        console.log(JSON.parse(localStorage.getItem('notes')))
        
        e.preventDefault()
        
    }

    function handleLogOut(){
      (sessionStorage.setItem('isLogged',JSON.stringify(false)));
      window.location.replace('./login')
  }
    return (
        <div class="container mt-3">
         <div class="jumbotron">
           <p onClick={handleLogOut} className= 'log-out rounded '>Log out <ExitToAppIcon></ExitToAppIcon> </p>
           <h3 className='heading'>Add New Notes</h3><Link className='view-note' to={'/my-notes'} >View Notes <FontAwesomeIcon icon={faArrowAltCircleRight}></FontAwesomeIcon> </Link>
           <form id="notesForm" onSubmit={handleAddNote}>
             <div class="form-group">
               <label for="title">Title</label>
               <input onBlur={handleOnBlur} type="text" name='title' class="form-control" id="title" placeholder="Describe your note name or title"/>
             </div>
             <div class="form-group">
               <label for="description">Description</label>
               <textarea onBlur={handleOnBlur} className='form-control p-3' name="description" id="description" type='text' cols="146" rows="5" autoFocus>Write your note.....</textarea>
             </div>
             <button type="submit" class="btn btn-primary">Add</button>
           </form>
         </div>
       </div>
    );
};

export default AddNote;
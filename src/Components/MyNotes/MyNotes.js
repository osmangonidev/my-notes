import React from 'react';
import './MyNotes.css'
import { faClock,faPlusSquare} from '@fortawesome/free-regular-svg-icons';
import {} from "@fortawesome/free-brands-svg-icons" ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
const MyNotes = (props) => {

    const notes=JSON.parse(localStorage.getItem('notes'));
    const date=new Date().toDateString();

    function handleLogOut(){
        (sessionStorage.setItem('isLogged',JSON.stringify(false)));
        window.location.replace('./login')
    }
    return (
        <div className='my-note-wrapper'>
            <div class="header bg-primary ">
                <p onClick={handleLogOut} className='log-out text-light'>Log out <ExitToAppIcon></ExitToAppIcon> </p><br/>
                <h1 class=" p-3 text-light header-title ">My Notes ({notes.length}) </h1><Link to='/add-note' className='text-light add-note'><FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon> add</Link>
            </div>
            <div className='row note-wrapper'>
                {
                    notes.map(item=>{
                        return(
                            
                                <div class="card col-sm-5 ml-5 mr-1 text-white bg-secondary mb-3">
                                    <div class="card-header">{item.title} </div>
                                    <div class="card-body">
                                        <FontAwesomeIcon icon={faClock}></FontAwesomeIcon><span>{`  ${date}`} </span>
                                        <p class="card-text">{item.description} </p>
                                
                                    </div>
                                </div>
                                
                            
                        )
                    })
                }
            </div>
        </div>
    );
};

export default MyNotes;
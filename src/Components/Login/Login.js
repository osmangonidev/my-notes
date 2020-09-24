import firebase from 'firebase';
import React, { createContext,  useContext,  useState } from 'react';
import FirebaseConfig from './FirebaseConfig';
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebook,faGoogle} from '@fortawesome/free-brands-svg-icons';
import { useHistory, useLocation } from 'react-router-dom';
import { IsLoggedContext } from '../../App';


firebase.initializeApp(FirebaseConfig);


const Login = () => {
    
    const [user,setUser]=useState({email:'',password:'',name:''});
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    var facebookProvider = new firebase.auth.FacebookAuthProvider();

    const[newUser,setNewUser]=useState(false)

    function googleSignUp(){
        firebase.auth().signInWithPopup(googleProvider)
        .then((result)=>{
            sessionStorage.setItem('isLogged',JSON.stringify(true))
            window.location.replace('/my-notes');
        })
    }
     
    function facebookLogin(){
        firebase.auth().signInWithPopup(facebookProvider)
        .then(result=>{
            window.location.replace('/my-notes');
            sessionStorage.setItem('isLogged',JSON.stringify(true))
            
        })
    }

    function handleOnBlur(e){
        const newUserInfo={...user};
        newUserInfo[e.target.name]=e.target.value;
        setUser(newUserInfo)
        console.log(user)
    }

    function handleCreateAccount(){
        setNewUser(true);
    }
    function handleLoginAccount(){
        setNewUser(false)
    }

    function customSignIn(e){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res=>{
            sessionStorage.setItem('isLogged',JSON.stringify(true))
            window.location.replace('/my-notes')
        })
        .catch(function(err) {
            if(user.email.length<5){
                alert('Please enter a valid email')
            }
            else if(user.password<4){
                alert('Please enter a long password')
            }
            else if(user.name>3){
                alert('Please enter a valid name')
            }
            else{
                alert(err);
            }
            console.log(err);
        });
        e.preventDefault();
    }
    
   
    function customLogIn(e){
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(user.email,user.password)
        .then(res=>{
            sessionStorage.setItem('isLogged',JSON.stringify(true))
            window.location.replace('/my-notes')
            console.log('hello world')
        })
        .catch(err=>{
            if(user.email.length<5){
                alert('Please enter a valid email')
            }
            else if(user.password<4){
                alert('Please enter a long password')
            }
            else{
                alert(err);
            }
        })
    }
    
    return (
        
            <div id='wrapper' className='jumbotron col-sm-6'>
                <form className='login-form rounded ' onSubmit={newUser? customSignIn :customLogIn}>
                    {newUser&&(
                        <div className='form-group'>
                            <label htmlFor=""  className=''>Name</label><br/>
                            <input onChange={handleOnBlur} className='w-50 input-field pl-2 rounded' type="name"  name="name" id="" /><br/>
                        </div>
                    )}
                    <div className='from-group'>
                    <label htmlFor="" className=''>Email</label><br/>
                    <input onChange={handleOnBlur} className='w-50 input-field pl-2 rounded' type="email"  name="email" id="" />
                    </div>
                    <div className='form-group'>
                    <label htmlFor="" className=''>Password</label><br/>
                    <input onChange={handleOnBlur} className='w-50 input-field pl-2 rounded' type="password"  name='password'  /><br/>
                    </div>
                    <div className='form-group'><input type="checkbox"/><label htmlFor="" className='inline-label mr-5'>Remember Me</label> {newUser==false&&<label className='inline-label toggle-text' htmlFor="">Forgot Password</label>}</div>
                    <div className='form-group'>
                    <input className='btn btn-warning px-3 mt-3 py-2 mb-2 w-50' type="submit" value={newUser?'SignUp' : 'Login'}/><br/>
                    {newUser?(
                            <><span className='mx-2'>Have an account?</span  ><span onClick={handleLoginAccount} className='toggle-text'>Login</span></>
                        )
                        :(
                            <><span className='mx-2'>Don't have an account?</span ><span onClick={handleCreateAccount} className='toggle-text'>Create an account</span></>
                        )
                    }
                    </div>
                </form>
                <div id='or-wrapper'>
                    <p id='or'>or</p>
                    <button className='px-4 py-2 m-1' onClick={googleSignUp}><FontAwesomeIcon  className='mr-5' icon={faGoogle}/>Continue with Google</button><br/>
                    <button className=' py-2 m-1 mb-5 px-4' onClick={facebookLogin}><FontAwesomeIcon className='mr-5'  icon={faFacebook} />Continue with Facebook</button>
                </div>
            </div>
        
    );
};

export default Login;
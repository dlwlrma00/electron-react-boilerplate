import './App.css'
import React, {useEffect, useState} from 'react';
import { MemoryRouter as Router, Routes, Route, Link, Switch, useNavigate } from 'react-router-dom';
import LogoAnimation from '../../assets/assets/animation/logo.json';
import ErrorAnimation from '../../assets/assets/animation/error.json';

import { useLottie } from "lottie-react";
import { AnimatePresence} from "motion/react"
import * as motion from "motion/react-client"
import {delay} from '../utils'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowAltCircleLeft} from '@fortawesome/free-regular-svg-icons';
import Parse from 'parse'
import axios from 'axios'

//REDUX
import { connect } from "react-redux"
import {bindActionCreators} from 'redux'
import {USER_PROFILE, ROLE} from '../redux/actions/ActionTypes'
import {SetValue} from "../redux/actions";


function Login(props) {
    let {actions} = props
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false)
    const [serverError, setServerError] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState ('')
  
    const options = {
      animationData: LogoAnimation,
      loop: true
    };
  
    const options_error = {
      animationData: ErrorAnimation,
      loop: true
    };
  
    const { View } = useLottie(options);
    const { ViewError } = useLottie(options_error);
  
    
    useEffect(() => { 
  
      checkServerConnection().then(async status => {
        if(status && status.status === 'ok') {
          console.log('Server is running')
  
          let user = await Parse.User.currentAsync();
          if(user){
            // IF USER IS LOGGED IN THEN REDIRECT TO DASHBOARD
            navigate('/user/home')
          }else{
            // IF NO USER IS LOGGED IN THEN SHOW THE LOGIN FORM
            delay(2000).then(() => {
              setIsVisible(true)
            })
          }
  
          
        }else{
          console.log('ERROR ', status.error.status)
          setServerError(status.error)
        }
      })
    }, []); 
  
    const checkServerConnection = async() => {  
      try {
        const res = await axios.get('http://localhost:1337/parse/health')
        return res.data
      } catch (error) {
        return {
          error : error
        }
      }
    }
  
    const login = async() => {  
      Parse.User.logIn(username, password).then((user) => {
        if(user){

          //GET USER PROFILE AND SET TO REDUX STORE
          Parse.Cloud.run('getUserProfile').then((profile) => {
            if(profile){  
              actions.setValue(profile, USER_PROFILE )
              console.log('Profile found : ', profile)
              navigate('/user/home')
            }else{
              console.log('Profile not found')
            }
          }).catch((error) => {
            console.log('Error: ', error)
          })

          
        }
      }).catch((error) => {
        console.log('Error: ', error) 
      })
  
    }
  
  
    return (
      <div>
        <div className="animation-container">
          {View}
        </div>
  
        <AnimatePresence initial={false}>
            {isVisible && !serverError ? (
                <motion.div
                    style={{paddingLeft : 120}}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0.1,0.3,0.5,0.7,1], scale: [0.1, 0.2, 0.5, 0.7, 1] }}
                    exit={{ opacity: 0, scale: 0 }}
                    key="login-form"
                >
                  <div class="w-full max-w-xs">
                    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                      <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                          Username
                        </label>
                        <input onChange={(e) => setUsername(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                      </div>
                      <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                          Password
                        </label>
                        <input onChange={(e) => setPassword(e.target.value)}  class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"/>
                        {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
                      </div>
                      <div class="flex items-center justify-between">
                        <button onClick={() => login()} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                          Sign In
                        </button>
                        <Link to="/register" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                          Create an Account
                        </Link>
                      </div>
                    </form>
                    {/* <p class="text-center text-gray-500 text-xs">
                      &copy;2020 Acme Corp. All rights reserved.
                    </p> */}
                  </div>
                
                </motion.div>
            ) : serverError ? (
              <div style={{display : 'flex', flexDirection : 'column', alignItems : 'center', justifyContent : 'center'}}>
                <h1 style={{color : '#eb4d4b'}}>CONNECTION ERROR :  {serverError ? serverError.message : 'N/A'}</h1>
                {ViewError}
              </div>
            )
          : null}
        </AnimatePresence>
        {/* <button  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  onClick={() => setIsVisible(!isVisible)} >
          Button
        </button> */}
  
  
      </div>
    );
}

const mapStateToProps = state => {
  return {
      // RoleReducer : state.RoleReducer,
      // ProfileReducer : state.ProfileReducer
  }
}

const mapDispatchToProps = dispatch => {
  const actions = {
      setValue: SetValue
    };

    return {
      actions: bindActionCreators(actions, dispatch)
  }; 
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
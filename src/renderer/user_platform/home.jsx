// import '../App.css'
import React, {useEffect, useState} from 'react';
import { MemoryRouter as Router, Routes, Route, Link, Switch, useNavigate } from 'react-router-dom';
import LogoAnimation from '../../../assets/assets/animation/logo.json';
import { useLottie } from "lottie-react";
import { AnimatePresence} from "motion/react"
import * as motion from "motion/react-client"
import {delay} from '../../utils'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowAltCircleLeft} from '@fortawesome/free-regular-svg-icons';
import Parse from 'parse'
import axios from 'axios'

import UserBg from '../../../assets/assets/images/user_bg.png'

// LAYOUT
import LayoutMain from '../layout/layout_main';


//REDUX
import { connect } from "react-redux"
import {bindActionCreators} from 'redux'
import {USER_PROFILE, ROLE} from '../../redux/actions/ActionTypes'
import {SetValue} from "../../redux/actions";


import ChapterList from './content/chapter_list'


function UserHome (props) {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Home Page', props)
    }, [])


    return (

        <LayoutMain
            title='Chapters Overview'
        >
            <div className="container">
                <ChapterList />
            </div>
        </LayoutMain>
    )
}


const mapStateToProps = state => {
    return {
        // RoleReducer : state.RoleReducer,
        ProfileReducer : state.ProfileReducer
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserHome)
import './App.css'
import React, {useEffect, useState} from 'react';
import { MemoryRouter as Router, Routes, Route, Link, Switch, useNavigate } from 'react-router-dom';

import { AnimatePresence} from "motion/react"
import * as motion from "motion/react-client"
import {delay} from '../utils'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowAltCircleLeft} from '@fortawesome/free-regular-svg-icons';
import Parse from 'parse'
import axios from 'axios'


export default function Register() {
    const navigate = useNavigate();

    return (
        <div className='register-container'>
        <div class="max-w-4xl max-sm:max-w-lg mx-auto p-6 mt-6" style={{backgroundColor : '#2d3748', borderRadius : 10}}>

            <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 1.2 }}
                onClick={() => navigate(-1)}
                // onClick={() => console.log(process.env.REACT_PARSE_SERVER_URL)}
            >
            <FontAwesomeIcon icon={faArrowAltCircleLeft} style={{color : '#fff', fontSize : 30}}/>
            </motion.div>

            
            <div class="text-center mb-12 sm:mb-16">
                <h1 className="text-xl">Create your account</h1>
            </div>

            <form>
                <div class="grid sm:grid-cols-2 gap-8">
                <div>
                    <label class="text-sm font-medium mb-2 block">First Name</label>
                    <input name="name" type="text" class="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter name" />
                </div>
                <div>
                    <label class="text-sm font-medium mb-2 block">Last Name</label>
                    <input name="lname" type="text" class="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter last name" />
                </div>
                <div>
                    <label class="text-sm font-medium mb-2 block">Email Id</label>
                    <input name="email" type="text" class="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email" />
                </div>
                <div>
                    <label class="text-sm font-medium mb-2 block">Mobile No.</label>
                    <input name="number" type="number" class="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter mobile number" />
                </div>
                <div>
                    <label class="text-sm font-medium mb-2 block">Password</label>
                    <input name="password" type="password" class="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password" />
                </div>
                <div>
                    <label class="text-sm font-medium mb-2 block">Confirm Password</label>
                    <input name="cpassword" type="password" class="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter confirm password" />
                </div>
                </div>

                <div class="mt-12">
                <button type="button" class="mx-auto block py-3 px-6 text-sm font-medium tracking-wider rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                    Sign up
                </button>
                </div>
            </form>
        </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';

import Nav from './components/Nav';
import Lottie from 'react-lottie';


export default function LayoutChapter(props) {
    const navigate = useNavigate();

    return (
        <div className="min-h-full" style={{width: '100vw', height: '100vh'}}>

        <Nav/>

        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            
            <div className="flex">
              <div className="w-64 flex-auto">
                <small className='pacifico-regular' style={{fontWeight : 'bold', color : '#000', fontSize : 18}}>Chapter  1</small>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{props && props.title ? props.title : "Empty Chapter Title"}</h1>
              </div>

              <div style={{display : 'flex', flexDirection : 'row', width : 500, color : '#000'}}>
                  <div style={{display : 'flex', flexDirection : 'column', justifyContent: 'center', alignItems : 'center', width : 300, marginRight : 30}}>
                    <small style={{color : '#000', fontWeight : 'bold'}}>Lesson Progress</small>
                    <div className="w-full bg-gray-100 rounded-full dark:bg-gray-700">
                      <div className="bg-yellow-500 text-xs font-medium text-white-900 text-center p-0.5 leading-none rounded-full" style={{width: '45%'}}> 45%</div>
                    </div>
                  </div>
                  <div style={{width : 220, display : 'flex', flexDirection : 'column', justifyContent: 'center', alignItems : 'center', fontWeight : 'bolder', padding : 10, borderRadius : 5, boxShadow : "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                    <strong>Current Score: </strong>
                    <h4>10/100</h4>
                  </div>
                  <div>
                  <button 
                  onClick={() => navigate(-1)}
                  type="button" class="ml-10 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Close Lesson
                  </button>
                  </div>
                  
                  
              </div>
              

            </div>
          </div>
        </header>

        <main style={{backgroundColor : '#f9f9f9', color : '#000', overflowY : "scroll", height : '85%'}} >
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{props.children}</div>
        </main>
      </div>
    )
}
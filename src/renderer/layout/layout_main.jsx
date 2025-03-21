import React, { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import Nav from './components/Nav';
import Lottie from 'react-lottie';


export default function LayoutMain(props) {
    return (
        <div className="min-h-full" style={{width: '100vw', height: '100vh'}}>

        <Nav/>

        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            
            <div className="flex">
              <div className="w-64 flex-auto">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mt-5">{props && props.title ? props.title : 'Please set page title'}</h1>
              </div>

              <div style={{display : 'flex', flexDirection : 'row', width : 300, color : '#000'}}>
                  <div style={{display : 'flex', flexDirection : 'column', justifyContent: 'center', alignItems : 'center', width : 250, marginRight : 30}}>
                    <small style={{color : '#000', fontWeight : 'bold'}}>Overall Progress</small>
                    <div className="w-full bg-gray-100 rounded-full dark:bg-gray-700">
                      <div className="bg-yellow-500 text-xs font-medium text-white-900 text-center p-0.5 leading-none rounded-full" style={{width: '45%'}}> 45%</div>
                    </div>
                  </div>
                  <div style={{display : 'flex', flexDirection : 'column', justifyContent: 'center', alignItems : 'center', fontWeight : 'bolder', padding : 10, borderRadius : 5, boxShadow : "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                    <strong>Average: </strong>
                    <h4>78%</h4>
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
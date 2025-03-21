import React, { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import Nav from './components/Nav';
import Lottie from 'react-lottie';


export default function LayoutAdmin(props) {
    let {changeTab} = props
    return (
        <div className="min-h-full" style={{width: '100vw', height: '100vh'}}>

        <Nav/>

        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            
            <div className="flex">
              <div className="w-64 flex-auto">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mt-5">{props && props.title ? props.title : 'Please set page title'}</h1>
              </div>
            </div>
          </div>
        </header>

        <main style={{backgroundColor : '#f9f9f9', color : '#000', overflowY : "scroll", height : '85%'}} >
          <div style={{display : 'flex', flexDirection : 'row', width : '99vw', height : '100%'}}> 
            <div className='fixed left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-gray-800 p-3'>
              <button type="button"
                    onClick={() => changeTab(1)}
                    class="mb-3 inline-block rounded text-black w-full px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                    Dashboard
                </button>
                <button type="button"
                    onClick={() => changeTab(2)}
                    class="mb-3 inline-block rounded text-black w-full px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                    Chapters & Lessons
                </button>
                <button type="button"
                    onClick={() => changeTab(3)}
                    class="mb-3 inline-block rounded text-black w-full px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                    Users
                </button>
                <button type="button"
                    onClick={() => changeTab(4)}
                    class="mb-3 inline-block rounded text-black w-full px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                    Connections
                </button>
            </div>
            <div class="p-5 sm:ml-64 w-full" >
              <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700" style={{minHeight : '98%'}}>
              {props.children}
              </div>
            </div>
            

          </div>
        </main>
      </div>
    )
}
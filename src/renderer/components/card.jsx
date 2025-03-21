import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as motion from "motion/react-client"


// /user/lesson

export default function Card(props) {
    const navigate = useNavigate();

    let { id, cn, title, description, thumbnail } = props

    useEffect(() => {
        console.log(props)
    })

    return(
        <motion.div
            whileHover={{ scale: 1.05, rotate: 1.5 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => navigate(`/user/lesson/${id}`)}
        >
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={thumbnail ? thumbnail : ''} alt="Sunset in the mountains"/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Chapter {cn} : {title ? title : 'EMPTY TITLE'}</div>
                <div class="w-full bg-gray-100 rounded-full dark:bg-gray-700 mb-5">
                    <div class="bg-yellow-500 text-xs font-medium text-white-900 text-center p-0.5 leading-none rounded-full" style={{width: '45%'}}> 45%</div>
                </div>
                
                <p className="text-gray-700 text-base">
                    {
                        description ? description : 'EMPTY DESCRIPTION'
                    }
                </p>
            </div>
            
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">SCORE : 0/100</span>
            </div>
            </div>
        </motion.div>
    )
}
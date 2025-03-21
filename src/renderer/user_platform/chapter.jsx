import React, { useState, useEffect } from 'react';
import LayoutChapter from '../layout/layout_chapter';
import { useParams } from 'react-router';
import Parse from 'parse'
import ReactHtmlParser from 'react-html-parser'; 

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowAltCircleDown} from '@fortawesome/free-regular-svg-icons';


export default function LessonPage(props){
    const { id } = useParams();

    const [chapterData, setChapterData] = useState(null)
    const [lessonData, setLessonData] = useState(null) 
    const [open, setOpen] = useState(0)

    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    useEffect(() => {
        getChapterData()
    },[])

    const getChapterData = async () => {
        await Parse.Cloud.run('getChapter', {chapter_id : id}).then(chapter => {
            // console.log('CHAPTER CONTENT ', chapter)
            setChapterData(chapter)
            getLessonData()
        })
    }

    const getLessonData = async() => {
        await Parse.Cloud.run('getLesson', {chapter_id : id}).then(lessons => {
            console.log('LESSONS ON THIS CHAPTER ', lessons)
            setLessonData(lessons)
        })
    }


    return (
        <>
            {   
                chapterData ?
                    <LayoutChapter
                        chapter={chapterData.cn}
                        title={chapterData.title}
                    >
                        <div style={{display : 'flex', flexDirection : 'column', alignItems : 'center', paddingBottom : 50}}>
                            {chapterData.banner && (<img style={{maxHeight : 300, width : '0 auto', marginBottom : 30}} src={chapterData.banner} />)}
                            <div style={{fontWeight : 'bold'}}>
                                {chapterData && (ReactHtmlParser(chapterData.content))}
                            </div>
                            <div className="w-full mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 mt-10">

                                {
                                    
                                    lessonData ?
                                        lessonData.map((lesson, index) => (
                                            <div key={index} className="mb-5">
                                                <button
                                                    className="flex justify-between items-center w-full p-4 text-left bg-gray-100 hover:bg-gray-200"
                                                    onClick={() => toggleAccordion(index)}
                                                >
                                                    <span className="font-semibold">Lesson {lesson.ln} - {lesson.title}</span>
                                                    <FontAwesomeIcon icon={faArrowAltCircleDown} className={`w-5 h-5 transition-transform ${
                                                        openIndex === 1 ? "rotate-180" : "rotate-0"
                                                    }`}/>
                                                </button>
                                                <div
                                                    className={`overflow-hidden transition-max-height duration-300 ${
                                                    openIndex === index ? "max-h-250 p-4" : "max-h-0"
                                                    }`}
                                                >
                                                    {
                                                        lesson.video_file ?
                                                            <video width="600" controls>
                                                                <source src={lesson.video_file} type="video/mp4" />
                                                                Your browser does not support HTML video.
                                                            </video>

                                                        : lesson.video_direct_link ?
                                                            <video width="600" controls>
                                                                <source src={lesson.video_direct_link} type="video/mp4" />
                                                                Your browser does not support HTML video.
                                                            </video>
                                                        : lesson.yt_embed ?
                                                                ReactHtmlParser(lesson.yt_embed)
                                                        : null
                                                    }
                                                    <p className="text-gray-700">{ReactHtmlParser(lesson.content)}</p>
                                                </div>
                                            </div>
                                        ))
                                    : 'NO LESSON AVAILABLE'
                                }
                                
                                
                            </div>

                        </div>
                        

                    </LayoutChapter>
        
                : 'Loading'
            }
        
        </>
        
    )

}
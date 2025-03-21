import React, { useState, useEffect, useRef } from 'react';
import Parse from 'parse'
import _ from 'lodash'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowAltCircleLeft, faTrashCan, faSquarePlus, faPlusSquare, faEdit, faEye, faCheckSquare} from '@fortawesome/free-regular-svg-icons';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Swal from 'sweetalert2'
import { AnimatePresence } from "motion/react"
import * as motion from "motion/react-client"
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import RTE from '../../components/rte';
import Lottie from 'react-lottie';
// import { DotLottie } from '@lottiefiles/dotlottie-web';
import LoadingAnimation from '../../../../assets/assets/animation/logo.json';

import QuizList from './quiz_list'



const init_value ={
    level : null,
    title : '',
    description : '',
    cn : null,
    thumbnail : null,
    banner : null,
    content : null
}
const init_lesson = {
    title : null,
    description : null,
    ln : null,
    video_file : null,
    video_direct_link : null,
    yt_embed : null
}


const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: LoadingAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const SwalCustom = Swal.mixin({
    customClass: {
      confirmButton: "mr-5 inline-block rounded bg-green-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-success-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-success-2 focus:bg-success-accent-300 focus:shadow-success-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-success-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong",
      cancelButton: "inline-block rounded bg-red-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-success-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-success-2 focus:bg-success-accent-300 focus:shadow-success-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-success-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
    },
    buttonsStyling: false
});

export default function AdminChapters(){

    const [gradeList, setGradeList] = useState(null)
    const [chapterData, setChapterData] = useState(null)    
    const [formVisible, setFormVisible] = useState(0)
    const [chapterValue, setChapterValue] = useState(init_value)
    const [content, setContent] = useState(null)
    
    
    //SELECTIONS
    const [selectedChapter, setSelectedChapter] = useState(null) 
    const [lessonList, setLessonList] = useState(null)

    // LESSON
    const [lessonValue, setLessonValue] = useState(init_lesson)

    // QUIZ
    const [addQuizVisible, setAddQuizVisible] = useState(false)
 
    const thumbRef = useRef()
    const bannerRef = useRef()
    const videoRef = useRef()

    useEffect(() => {

        getChapters()

        Parse.Cloud.run('_getGradeLevel').then(list => {
            // console.log(list)setGradeList
            setGradeList(list)
        })


    }, [])

    const getChapters = () => {
        Parse.Cloud.run('_getChapters').then(async(chapters) => {

            if(chapters){
                chapters =  _.orderBy(chapters, ['cn'], ['asc']);
                setChapterData(chapters)
                console.log('ADMIN CHAPTER ', chapters)
            }
            
        })
    }

    const testFire = () => {

        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
        })

    }

    const deleteConfirmation = (id) => {

        SwalCustom.fire({
            title: "Deleting Record ? ",
            text : "Please confirm your action",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then(async (result) => {
        if (result.isConfirmed) {
            await Parse.Cloud.run('_deleteChapter', {chapter_id : id}).then(result => {
                if(result?.status === 'success'){
                    SwalCustom.fire("Deleted!", "", "success");
                    getChapters();
                }
            })
            
        } else if (result.isDenied) {
            // Swal.fire("Changes are not saved", "", "info");
        }
        });

    }

    const createChapter = async (value) => {
        await setChapterValue({...chapterValue, content : content?.toString()})
        await setChapterValue({...chapterValue, cn : parseInt(chapterValue.cn)})
        // console.log(content)
        console.log(chapterValue)

        await Parse.Cloud.run('_createChapters', {...chapterValue}).then(result => {
            console.log(result)
        })
    }

    const getBase64 = async (v, type) => {

        const getBase = async () => {
            var file = v
            let reader = new FileReader()
            let url = await reader.readAsDataURL(file)
            await Promise.all([
                reader.onload = () => {
                    if(type === 'thumbnail'){
                        setChapterValue({...chapterValue, thumbnail : reader.result})
                    }

                    if(type === 'banner'){
                        setChapterValue({...chapterValue, banner : reader.result})
                    }

                    if(type === 'video'){
                        setLessonValue({...lessonValue, video_file : reader.result})
                    }

                },

                reader.onerror = function (error) {
                    console.log('Error: ', error);
                }
            ])
        }
        
        await getBase()



    }

    const getLessons = async () => {
        if(selectedChapter){
            Parse.Cloud.run('_getLesson', {chapter_id : selectedChapter.id}).then(async (lessons) => {
                console.log(lessons)
                setLessonList(lessons)
            })
    
        }
    }
    
    const getQuestionnaire = async() => {
        if(selectedChapter){
            Parse.Cloud.run('getQuestionnaire', {chapter_id : selectedChapter.id}).then(result => {
                if(result){
                    setQuizData(result)
                }
            }).catch(e => {
                console.log(e)
            })
        }
    }

    /// VIEW
    const lessonListView = () => {

        return (
            <table class="min-w-full text-left text-sm font-light text-surface dark:text-white">
            <thead
                class="border-b border-neutral-200 bg-white font-medium dark:border-white/10 dark:bg-body-dark">
                <tr>
                {/* <th scope="col" class="px-6 py-4">id</th> */}
                <th scope="col" class="px-6 py-4">Lesson #</th>
                <th scope="col" class="px-6 py-4">Title</th>
                <th scope="col" class="px-6 py-4">Controls</th>
                
                </tr>
            </thead>
            <tbody>
                
                {
                    lessonList ?
                    lessonList.map(item => (
                            <tr class="border-b border-neutral-200 bg-black/[0.02] dark:border-white/10">
                                {/* <td class="whitespace-nowrap px-6 py-4 ">{item.id}</td> */}
                                <td class="whitespace-nowrap px-6 py-4">{item.ln}</td>
                                <td class="whitespace-nowrap px-6 py-4 font-medium">{item.title}</td>
                                {/* <td class="whitespace-nowrap px-6 py-4">{item.cn}</td> */}
                                <td class="whitespace-nowrap px-6 py-4">
                                    {/* <FontAwesomeIcon className='mr-2' icon={faSquarePlus} style={{color : '#2ecc71', fontSize : 18}} onClick={() => null}/> */}
                                    {/* <FontAwesomeIcon className='mr-2' icon={faEdit} style={{color : '#3498db', fontSize : 16}}/> */}
                                    {/* <EyeIcon style={{color : '#ff6b6b', width : 20, height : 20}} /> */}
                                    <FontAwesomeIcon className='mr-2'  icon={faEye} style={{color : '#3498db', fontSize : 16}}  onClick={() => null}/>
                                    <FontAwesomeIcon icon={faTrashCan} style={{color : '#ff6b6b', fontSize : 16}}  onClick={() => null}/>

                                </td>
                            </tr>
                        ))
                    : <b>Loading</b>
                }

                
                
                
            </tbody>
            </table>
        )


    }

    const newChapterForm = () => {
        return(
        <>
        <form className='p-10'>

            <div class="relative z-0 w-full mb-5 group">
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade Level</label>
            <select 
                onChange={(e) => setChapterValue({...chapterValue, level : e.target.value})}
                id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Select target Grade / Level</option>

                {
                    gradeList ?
                        gradeList.map(item => (
                            <option value={item.id}>{item.name}</option>
                        ))
                    : null
                }

            </select>
            </div>

            <div class="relative z-0 w-full mb-5 group">
                <input 
                    onChange={(e) => setChapterValue({...chapterValue, title : e.target.value})} 
                    type="text" 
                    name="floating_email" 
                    id="floating_email" 
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    placeholder=" " 
                    value={chapterValue?.title}
                    required
                />
                <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Chapter Title</label>
            </div>

            <div class="relative z-0 w-full mb-5 group">
                <textarea 
                rows={3}
                onChange={(e) => setChapterValue({...chapterValue, description : e.target.value})} 
                value={chapterValue?.description}
                type="text" 
                name="floating_email" 
                id="floating_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
            </div>

            
            <div class="relative z-0 w-full mb-5 group mt-5">
                <input 
                    onChange={(e) => setChapterValue({...chapterValue, cn : e.target.value})} 
                    value={chapterValue?.cn}
                    type="number" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Chapter #</label>
            </div>

            <div class="relative z-0 w-full mb-5 group mt-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Thumbnail</label>
                <input 
                    onChange={(e) => {
                        // setChapterValue({...chapterValue, thumbnail : thumbRef.current.files[0]})
                        getBase64(thumbRef.current.files[0], 'thumbnail')
                    }  } 
                    ref={thumbRef}
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
                <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A thumbnail will be displayed in a chapter card list.</div>
            </div>

            <div class="relative z-0 w-full mb-5 group mt-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Banner</label>
                <input 
                    onChange={(e) => getBase64(bannerRef.current.files[0], 'banner')} 
                    ref={bannerRef}
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
                <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A Banner will be displayed on the top of the content.</div>
            </div>

            <div className="col-span-full mt-10">
              <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                Content
              </label>
              <div>
                <RTE
                    value={content}
                    setValue={setContent} 
                />
              </div>
            </div>

        </form>
            {/* <button onClick={() => console.log(chapterValue)} >
                TEST
            </button> */}
        </>
        )
    }

    const createLesson = async () => {
        SwalCustom.fire({
            title: "Create New Lesson ? ",
            text : "Please confirm your action",
            // showDenyButton: true,
            showCancelButton : true,
            confirmButtonText: "Yes",
            // denyButtonText: `No`,
            allowOutsideClick: () => !Swal.isLoading(),
            allowEscapeKey: false,
            showLoaderOnConfirm : true,
            preConfirm: async () => {
                return await Parse.Cloud.run('_createLesson', {chapter_id : selectedChapter.id, ...lessonValue}).then(result => {   
                    return result
                }).catch(e => {
                    SwalCustom.showValidationMessage(`
                        Request failed: ${e.message}
                    `);
                })
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                SwalCustom.fire("New Lesson has been saved!", "", "success");
            }
        });
        
        
    }

    const newLessonForm = () => {
        return(
            <>
            <form className='p-10 disable'>
            
                <div class="relative z-0 w-full mb-5 group">
                    <input 
                        onChange={(e) => setLessonValue({...lessonValue, title : e.target.value})}
                        value={lessonValue?.title} 
                        type="text" 
                        name="floating_email" 
                        id="floating_email" 
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" "
                        required
                    />
                    <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Lesson Title</label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <textarea 
                    rows={3}
                    onChange={(e) => setLessonValue({...lessonValue, description : e.target.value})} 
                    value={lessonValue?.description}
                    type="text" 
                    name="lesson_desc" 
                    id="lesson_desc"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="lesson_desc" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                </div>    
                <div class="relative z-0 w-full mb-5 group mt-5">
                    <input 
                        onChange={(e) => setLessonValue({...lessonValue, ln : e.target.value})} 
                        value={lessonValue?.ln}
                        type="number" name="lesson_number" id="lesson_number" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="lesson_number" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Lesson #</label>
                </div>
    
                <div class="relative z-0 w-full mb-5 group mt-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="video_file">Video</label>
                    <input 
                        onChange={(e) => {
                            // setLessonValue({...lessonValue, video_file : videoRef.current.files[0]})
                            getBase64(videoRef.current.files[0], 'video')
                        }  } 
                        ref={videoRef}
                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="video_file" type="file"/>
                    <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="video_file_help">Max Video size is 300 mb</div>
                    
                        
                    <div class="relative z-0 w-full mt-5 group">
                        <input 
                            onChange={(e) => setLessonValue({...lessonValue, video_direct_link : e.target.value})}
                            value={lessonValue?.video_direct_link} 
                            type="text" 
                            name="direct_link" 
                            id="direct_link" 
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" "
                            // required

                        />
                        <label for="direct_link" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Video Direct Link (Recommended)</label>
                    </div>

                    <div class="relative z-0 w-full mt-5 group">
                        <input 
                            onChange={(e) => setLessonValue({...lessonValue, yt_embed : e.target.value})}
                            value={lessonValue?.yt_embed} 
                            type="text" 
                            name="yt_embed" 
                            id="yt_embed" 
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" "
                            // required
                        />
                        <label for="yt_embed" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Youtube Embed Code (Recommended)</label>
                    </div>
                </div>
    
    
            </form>
            </>
            )
    }

    return (
        
        <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={formVisible === 0 ? 'chapter-form' : formVisible === 1 ?  "chapter-list" : formVisible === 2 ? 'lesson-form' : 'n-a'}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            // style={icon}
                        >
                            {
                                formVisible === 0 ?
                                <div class="overflow-hidden">
                                    <div className='w-full bg-gray-300 min-h-20' style={{display : 'flex', flexDirection : 'row', alignItems : 'center', padding : 5, justifyContent : 'space-between'}}>
                                        <div>
                                            <h1 style={{fontSize : 30, marginLeft : 20}}>Chapter & Lessons Control</h1>
                                        </div>
                                        
                                        <div style={{display : 'flex', flexDirection : 'row', padding : 20}}>
                                            <button
                                                onClick={() => setFormVisible(1)}
                                                type="button"
                                                class="inline-block rounded bg-green-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-success-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-success-2 focus:bg-success-accent-300 focus:shadow-success-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-success-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                                + New Chapter
                                            </button>
                                        </div>
                                    </div>
                                    <table class="min-w-full text-left text-sm font-light text-surface dark:text-white">
                                    <thead
                                        class="border-b border-neutral-200 bg-white font-medium dark:border-white/10 dark:bg-body-dark">
                                        <tr>
                                        {/* <th scope="col" class="px-6 py-4">id</th> */}
                                        <th scope="col" class="px-6 py-4">Title</th>
                                        <th scope="col" class="px-6 py-4">Chapter #</th>
                                        {/* <th scope="col" class="px-6 py-4">Description</th>
                                        <th scope="col" class="px-6 py-4">Content</th> */}
                                        <th scope="col" class="px-6 py-4">Thumbnail</th>
                                        {/* <th scope="col" class="px-6 py-4">Banner</th> */}
                                        <th scope="col" class="px-6 py-4">Grade/Level</th>
                                        <th scope="col" class="px-6 py-4">Lessons Available</th>
                                        <th scope="col" class="px-6 py-4">Controls</th>
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {
                                            chapterData ?
                                                chapterData.map(item => (
                                                    <tr class="border-b border-neutral-200 bg-black/[0.02] dark:border-white/10">
                                                        {/* <td class="whitespace-nowrap px-6 py-4 ">{item.id}</td> */}
                                                        <td class="whitespace-nowrap px-6 py-4 font-medium">{item.title}</td>
                                                        <td class="whitespace-nowrap px-6 py-4">{item.cn}</td>
                                                        {/* <td class="whitespace-nowrap px-6 py-4">{item.description}</td> */}
                                                        <td class="whitespace-nowrap px-6 py-4"><img src={item.thumbnail} style={{height : 50}} /></td>
                                                        <td class="whitespace-nowrap px-6 py-4">{item.grade_level?.name}</td>
                                                        <td class="whitespace-nowrap px-6 py-4">
                                                            <button className='inline-block rounded bg-green-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-success-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-success-2 focus:bg-success-accent-300 focus:shadow-success-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-success-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong' onClick={() => {setFormVisible(2); setSelectedChapter(item); getLessons() }}>Available : {item.lessons.length}</button>
                                                        </td>
                                                        <td class="whitespace-nowrap px-6 py-4">
                                                            <FontAwesomeIcon className='mr-2' icon={faCheckSquare} style={{color : '#2ecc71', fontSize : 18}} onClick={async () => {await setSelectedChapter(item); await getQuestionnaire(); setFormVisible(4)} }/>
                                                            <FontAwesomeIcon className='mr-2' icon={faEdit} style={{color : '#3498db', fontSize : 16}}/>
                                                            <FontAwesomeIcon icon={faTrashCan} style={{color : '#ff6b6b', fontSize : 16}}  onClick={() => deleteConfirmation(item.id)}/>
            
                                                        </td>
                                                    </tr>
                                                ))
                                            : <b>Loading</b>
                                        }
            
                                        
                                        
                                        
                                    </tbody>
                                    </table>
                                </div>
                                : formVisible === 1 ? <div className='container'>
                                        <div >

                                            <div className='w-full bg-gray-300 min-h-20' style={{display : 'flex', flexDirection : 'row', alignItems : 'center', padding : 5, justifyContent : 'space-between'}}>
                                                <div>
                                                    <h1 style={{fontSize : 30, marginLeft : 20}}>Create New Chapter</h1>
                                                </div>
                                                
                                                <div style={{display : 'flex', flexDirection : 'row', padding : 20}}>
                                                    <button
                                                        onClick={() => createChapter()}
                                                        type="button"
                                                        class="mr-5 inline-block rounded bg-green-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-success-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-success-2 focus:bg-success-accent-300 focus:shadow-success-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-success-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                                        Save Chapter
                                                    </button>
                                                    <button
                                                        onClick={() => setFormVisible(0)}
                                                        type="button"
                                                        class="inline-block rounded bg-red-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-success-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-success-2 focus:bg-success-accent-300 focus:shadow-success-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-success-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mx-auto block rounded-lg bg-white p-6 shadow-4 dark:bg-surface-dark">
                                                {newChapterForm()}
                                            </div>
                                        
                                        
                                        </div>
                                </div>
                                : formVisible === 2 ?
                                    <div >

                                        <div className='w-full bg-gray-300 min-h-20' style={{display : 'flex', flexDirection : 'row', alignItems : 'center', padding : 5, justifyContent : 'space-between'}}>
                                            <div>
                                                <h4 style={{marginLeft : 20}} >Available Lessons for :</h4>
                                                <h1 style={{fontSize : 30, marginLeft : 20}}>Chapter : {selectedChapter.title}</h1>
                                            </div>

                                            <div style={{display : 'flex', flexDirection : 'row', padding : 20}}>

                                                <button
                                                    onClick={() => setFormVisible(3)}
                                                    type="button"
                                                    class="mr-5 inline-block rounded bg-green-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-success-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-success-2 focus:bg-success-accent-300 focus:shadow-success-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-success-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                                    + New Lesson
                                                </button>
                                                
                                                <button
                                                    onClick={() => setFormVisible(0)}
                                                    type="button"
                                                    class="inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-success-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-success-2 focus:bg-success-accent-300 focus:shadow-success-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-success-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                                    <FontAwesomeIcon className='mr-2'  icon={faArrowAltCircleLeft} style={{color : '#fff', fontSize : 16}}  /> Back
                                                </button>
                                            </div>
                                            
                                        </div>
                                        <div className="mx-auto block rounded-lg bg-white p-6 shadow-4 dark:bg-surface-dark">
                                            {/* {newChapterForm()} */}
                                            {lessonListView()}
                                        </div>
                                    
                                    
                                    </div>
                                : formVisible === 3 ?
                                    <div >

                                        <div className='w-full bg-gray-300 min-h-20' style={{display : 'flex', flexDirection : 'row', alignItems : 'center', padding : 5, justifyContent : 'space-between'}}>
                                            <div>
                                                <h4 style={{marginLeft : 20}} >Create New Lesson for : </h4>
                                                <h1 style={{fontSize : 30, marginLeft : 20}}> {selectedChapter.title}</h1>
                                            </div>
                                            
                                            <div style={{display : 'flex', flexDirection : 'row', padding : 20}}>
                                                <button
                                                    onClick={() => createLesson()}
                                                    type="button"
                                                    class="mr-5 inline-block rounded bg-green-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-success-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-success-2 focus:bg-success-accent-300 focus:shadow-success-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-success-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                                    Save Lesson
                                                </button>
                                                <button
                                                    onClick={() => setFormVisible(0)}
                                                    type="button"
                                                    class="inline-block rounded bg-red-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-success-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-success-2 focus:bg-success-accent-300 focus:shadow-success-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-success-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mx-auto block rounded-lg bg-white p-6 shadow-4 dark:bg-surface-dark">
                                            {newLessonForm()}
                                            {/* <b>LESSON FORM</b> */}
                                        </div>
                                    
                                    
                                    </div>
                                : formVisible === 4 ?
                                    <div >
                                        <div className='w-full bg-gray-300 min-h-20' style={{display : 'flex', flexDirection : 'row', alignItems : 'center', padding : 5, justifyContent : 'space-between'}}>
                                            <div>
                                                <h4 style={{marginLeft : 20}} >Questionnaire for : </h4>
                                                <h1 style={{fontSize : 30, marginLeft : 20}}> {selectedChapter.title}</h1>
                                            </div>
                                            
                                            <div style={{display : 'flex', flexDirection : 'row', padding : 20}}>
                                                <button
                                                    onClick={() => {setAddQuizVisible(true);}}
                                                    type="button"
                                                    class="mr-5 inline-block rounded bg-green-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-success-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-success-2 focus:bg-success-accent-300 focus:shadow-success-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-success-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                                    + Add Question
                                                </button>
                                                <button
                                                    onClick={() => setFormVisible(0)}
                                                    type="button"
                                                    class="inline-block rounded bg-red-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-success-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-success-2 focus:bg-success-accent-300 focus:shadow-success-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-success-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                                    Back
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mx-auto block rounded-lg bg-white p-6 shadow-4 dark:bg-surface-dark">
                                            <QuizList
                                                add_visible = {addQuizVisible}
                                                visibleControl = {(v) => setAddQuizVisible(v)}
                                                chapter = {selectedChapter}
                                            />
                                            {/* {quizForm()} */}
                                            {/* <b>LESSON FORM</b> */}
                                        </div>
                                    </div>
                                : null
                            }

                            
                        </motion.div>
                    </AnimatePresence>
                    
                </div>
            </div>
        </div>

    )


}
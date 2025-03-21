import React, { useState, useEffect } from 'react';
import Parse from 'parse'
import _ from 'lodash'

const init_quiz = {
    id: null,
    question: "",
    choices: [],
    answer: null
}
export default function QuizList(props){
    // QUIZ
    const [quizData, setQuizData] = useState(null)
    const [addQuizVisible, setAddQuizVisible] = useState(false)
    const [questionValue, setQuestionValue] = useState(init_quiz)

    

    useEffect(() => {
        getQuestionnaire()
    },[])

    const getQuestionnaire = async() => {
        Parse.Cloud.run('getQuestionnaire', {chapter_id : props.chapter.id}).then(result => {
            if(result){
                setQuizData(result)
            }
        }).catch(e => {
            console.log(e)
        })
    }
        
    const setChoice = (key, value) => {
        var currentChoice = _.find(questionValue.choices, {id:key});
        if(currentChoice){
            currentChoice.value = value
            // console.log('CURRENT CHOICE ', currentChoice)
        }else{
            // CREATE NEW OBJ
            questionValue.choices.push({id : key, value})
        }

        questionValue.choices = _.orderBy(questionValue.choices, ['id'], ['asc'])

    }
    return (
        <div className='w-full'>
                {
                    props.add_visible ?
                    <div href="#" class="w-full block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div class="relative z-0 w-full mb-5 group">
                            <input 
                                onChange={(e) => setQuestionValue({...questionValue, question : e.target.value})} 
                                type="text" 
                                name="question_input" 
                                id="question_input" 
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder="" 
                                value={questionValue?.question}
                                required

                            />
                            <label for="question_input" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Question</label>
                        </div>

                        <div style={{display : 'flex', flexDirection : 'row'}}>
                            <div className='mr-10' style={{display :'flex', flexDirection : 'row'}} >
                                <div class="relative z-0 w-sm mb-5 group">
                                    <input 
                                        onChange={(e) => setChoice('A', e.target.value)}
                                        type="text" 
                                        name="question_input" 
                                        id="question_input" 
                                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                        placeholder="" 
                                        // value={chapterValue?.title}
                                        required
                                    />
                                    <label for="question_input" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">A</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Answer</label>
                                </div>
                            </div>

                            <div className='mr-10' style={{display :'flex', flexDirection : 'row'}} >
                                <div class="relative z-0 w-sm mb-5 group">
                                    <input 
                                        // onChange={(e) => setChapterValue({...chapterValue, title : e.target.value})} 
                                        onChange={(e) => setChoice('B', e.target.value)}
                                        type="text" 
                                        name="question_input" 
                                        id="question_input" 
                                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                        placeholder="" 
                                        // value={chapterValue?.title}
                                        required
                                    />
                                    <label for="question_input" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    B
                                    </label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Answer</label>
                                </div>
                            </div>

                            <div className='mr-10' style={{display :'flex', flexDirection : 'row'}} >
                                <div class="relative z-0 w-sm mb-5 group">
                                    <input 
                                        onChange={(e) => setChoice('C', e.target.value)}
                                        type="text" 
                                        name="question_input" 
                                        id="question_input" 
                                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                        placeholder="" 
                                        // value={chapterValue?.title}
                                        required
                                    />
                                    <label for="question_input" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    C
                                    </label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Answer</label>
                                </div>
                            </div>

                            <div className='mr-10' style={{display :'flex', flexDirection : 'row'}} >
                                <div class="relative z-0 w-sm mb-5 group">
                                    <input 
                                        // onChange={(e) => setChapterValue({...chapterValue, title : e.target.value})} 
                                        onChange={(e) => setChoice('D', e.target.value)}
                                        type="text" 
                                        name="question_input" 
                                        id="question_input" 
                                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                        placeholder="" 
                                        // value={chapterValue?.title}
                                        required
                                    />
                                    <label for="question_input" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    D
                                    </label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Answer</label>
                                </div>
                            </div>

                            <div className='mr-10' style={{display :'flex', flexDirection : 'row'}} >
                                <div class="relative z-0 w-sm mb-5 group">
                                    <input 
                                        onChange={(e) => setChoice('E', e.target.value)}
                                        type="text" 
                                        name="question_input" 
                                        id="question_input" 
                                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                        placeholder="" 
                                        // value={chapterValue?.title}
                                        required
                                    />
                                    <label for="question_input" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    E
                                    </label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Answer</label>
                                </div>
                            </div>
                        </div>
                        <div class="flex-grow border-t border-gray-200"></div>
                        <div style={{display : 'flex', flexDirection : 'row',  justifyContent : 'flex-end', marginTop : 20}}>
                            <button 
                                onClick={() => console.log(questionValue)}
                                class="mr-5 inline-block rounded bg-green-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-success-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-success-2 focus:bg-success-accent-300 focus:shadow-success-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-success-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                Add
                            </button>
                            <button 
                            onClick={() => props.visibleControl(false)}
                            class="mr-5 inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-success-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-success-2 focus:bg-success-accent-300 focus:shadow-success-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-success-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                Cancel
                            </button>
                        </div>
                        

                    </div>
                    : null
                }

                {
                    quizData && quizData.content.length > 0 ?
                        quizData.content.map(item => (
                            <a href="#" class="w-full block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">{item?.question}</h5>
                                <p class="font-normal text-gray-700 dark:text-gray-400">
                                   Choices : {
                                    item?.choices.map(c => (
                                        <span className={`${c.value === item?.answer ? 'bg-green-200' : 'bg-gray-100'} text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300`}>
                                            {c.value}
                                        </span> 
                                    ))

                                   }
                                </p>
                            </a>
                        ))
                    : null
                }
                {/* <b>QUIZ FORM</b>
                <button onClick={() => console.log(quizData.content)}>TEST</button> */}
            </div>
    )
}
import React, { useState, useEffect } from 'react';
import Card from '../../components/card';
import Parse from 'parse'


export default function ChapterList() {
    
    const [chapterList, setChapterList] = useState(null)

    useEffect(() => {
        getChapters()
    }, [])

    const getChapters = async() => {  
        await Parse.Cloud.run('getChapters').then((chapters) => {   
            setChapterList(chapters);
        })
    }


    return (
        <div>
            <div class="grid grid-cols-3 gap-4">
                {
                    chapterList && (
                        chapterList.map((data, index) => {
                            return <Card {...data}/>
                        })
                    )
                }
                
            </div>
        </div>
    )
}
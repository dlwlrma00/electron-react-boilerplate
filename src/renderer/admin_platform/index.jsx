import React, { useState, useEffect } from 'react';

import AdminLayout from '../layout/layout_admin'

// CONTENTS
import ChapterControl from './content/chapters'


export default  function AdminPanel(props){

        const [activeTab, setActiveTab ] = useState(1)

    return (
        <AdminLayout
            title="Administrative Controls"
            changeTab={(val) => setActiveTab(val)}
        >
            {
                activeTab == 2 ?
                    <ChapterControl {...props}/>
                : <b>NO ACTIVE PANE</b>
            }

        </AdminLayout>
    )

}
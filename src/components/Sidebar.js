import React from 'react';
// import * as  FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md'


export const Sidebar = [
    {
        title:'Home',
        path:'/dashboard',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title:'Search',
        path:'/dashboard/search',
        icon: <AiIcons.AiOutlineSearch/>,
        cName: 'nav-text'
    },
    {
        title:'Favourite songs',
        path:'/dashboard/favourite',
        icon: <AiIcons.AiOutlineStar/>,
        cName: 'nav-text'
    },
    {
        title:'Popular songs',
        path:'/dashboard',
        icon: <AiIcons.AiOutlineFire/>,
        cName: 'nav-text'
    },
    {
        title:'Hindi songs',
        path:'/dashboard',
        icon: <MdIcons.MdOutlineLocalLaundryService/>,
        cName: 'nav-text'
    }
]
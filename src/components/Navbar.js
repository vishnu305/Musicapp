import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { Link,useNavigate } from 'react-router-dom';
import * as  FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {Sidebar} from './Sidebar.js';
import * as MdIcons from 'react-icons/md';
import {
    auth,
    logout,
  } from "../firebase-config";
import { db } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    collection,
    getDocs,
    addDoc,
    query,
    where,
    updateDoc, deleteDoc, doc
  } from "firebase/firestore/lite";
import profile from "../images/Profile.svg";
import {IconContext} from 'react-icons';
import $ from "jquery";
import MusicNoteIcon from '@mui/icons-material/MusicNote';

function Navbar({title}){
    const [sidebar, setSidebar]=useState(true);
    const showSidebar = () => setSidebar(!sidebar);
    const navigate = useNavigate();
    var width = window.screen.width;
    useEffect(()=>{
        if (width<850){
            setSidebar(false);
        }
    },[width])
    
    
    
    const [name, setName] = useState([]);
    const [firstname,setfirstnametoshow]=useState("");
    const [profileimg,setprofileimg] = useState(profile);
    const [user, loading, error] = useAuthState(auth);
    const [checkdata,setcheckdata] = useState(false);
    const fetchUserNameSongs = async () => {
        try {
        
        const q = query(collection(db, "usersfromwebsite"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
        var firstnametoshow1 = data.name;
        firstnametoshow1 = firstnametoshow1.split(" ");
        firstnametoshow1 = firstnametoshow1[0];
        setfirstnametoshow(firstnametoshow1);
        
        setcheckdata(true);
       
        if (doc.docs[0].data().authProvider === "google") {
            setprofileimg(doc.docs[0].data().photo);
        }
        
        } catch (err) {
        console.error(err);
        }
    };
    useEffect(() => {
        if (loading) return;
        if (!user) {
            navigate("../", { replace: true });
        }
        if (user) {
        fetchUserNameSongs();
        }
        if (error) {
        alert(error.message);
        }
    }, [user, loading, error]);

    useEffect(() => {
        if (name === "") {
        fetchUserNameSongs();
        }
    }, [name]);

    return (<Container>
        <IconContext.Provider value={{color:'#fff'}}>
        <div className='navbar1'>
            <Link to="/dashboard" className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar}/>
            </Link>
            <h1 style={{color:"#fff"}}><MusicNoteIcon/>Music App</h1>
                <div style={{display:'flex',alignItems:'center'}}>
                <h3 style={{color:"#fff"}}>Welcome {firstname}</h3>
                <img
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "20px",
                      marginRight: "10px",
                      marginLeft:"10px"
                    }}
                    src={profileimg}
                    alt='profileimg'
                  />
                </div>
        </div>
        <nav className={sidebar ? 'nav-menu active':'nav-menu'}>
            <ul className='nav-menu-items'>
                <li className='navbar-toggle' onClick={showSidebar} style={{height:'70px'}}>
                    <Link to="/dashboard" className='menu-bars'>
                        <FaIcons.FaBars/>
                    </Link>
                </li>
                <br/>
                {Sidebar.map((item,index)=>{
                    if(index==title){
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path} style={{backgroundColor:"#1a83ff"}} >
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                    }
                    else{
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path} >
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        ) 
                    }
                })}
                <li className="logoutcss" onClick={logout} style={{color:"#f5f5f5"}} >
                    <div>
                    <MdIcons.MdLogout/>
                    <span>Logout</span>
                    </div>
                </li>
            </ul>
        </nav>
        </IconContext.Provider>
    </Container>);
}

export default Navbar;

const Container = styled.div`
    font-family:'Lato',sans-serif;
    .navbar1{
        background-color:#060b26;
        height:80px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        width:100%;
        position:fixed;
        top:0px;
        right:0px;
    }

    .menu-bars{
        margin-left:2.5rem;
        font-size:2rem;
        background:none;
    }

    .nav-menu{
        background-color:#060b26;
        width:250px;
        height:100vh;
        display:flex;
        justify-content:center;
        position:fixed;
        top:0;
        left: -100%;
        transition: 850ms;
    }
    .nav-menu.active{
        left:0;
        transition:350ms;
    }
    .nav-text{
        display:flex;
        justify-content:start;
        align-items:center;
        padding:8px 0px 8px 8px;
        list-style:none;
        height: 60px;
    }
    .nav-text a{
        text-decoration:none;
        color: #f5f5f5;
        font-size: 18px;
        width:88%;
        height:100%;
        display:flex;
        align-items: center;
        border-radius:4px;
        padding-left:15px;
    }
    .nav-text a:hover{
        background-color:#c0392b;
    }
    .logoutcss{
        display:flex;
        justify-content:start;
        align-items:center;
        padding:8px 0px 8px 8px;
        list-style:none;
        height: 60px;
        cursor:pointer;
    }
    .logoutcss div{
        text-decoration:none;
        color: #f5f5f5;
        font-size: 18px;
        width:88%;
        height:100%;
        display:flex;
        align-items: center;
        border-radius:4px;
        padding-left:15px;
    }
    .logoutcss div:hover{
        background-color:#c0392b;
    }
    .nav-menu-items{
        width:100%;
        padding-left:10px;
    }
    .navbar-toggle{
        background-color:#060b26;
        width:100%;
        height:80px;
        display:flex;
        justify-content:start;
        align-items:center;
    }
    span{
        margin-left:16px;
    }
`;
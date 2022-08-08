import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { Link,useNavigate } from 'react-router-dom';
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  updateDoc, deleteDoc, doc
} from "firebase/firestore";
import {onSnapshot,orderBy,getFirestore} from "firebase/firestore";
import profileblue from "../images/Profileblue.svg";
import Navbar from './Navbar.js';

import {
    auth,
    logout,
  } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from '@mui/material/Button';

function Favourite(){

    const [name, setName] = useState([]);
    const [profileimg,setprofileimg] = useState(profileblue);
    const [user, loading, error] = useAuthState(auth);
    const [telugusongs,telugusetsongs]=useState([]);
    const navigate = useNavigate();
    const [checkdata,setcheckdata] = useState(false);
    const fetchUserNameSongs = async () => {
        try {
        
        const q = query(collection(db, "usersfromwebsite"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
        
        const q1 = query(collection(db,"telugusongs"));
        const doc1 = await getDocs(q1);
        const data1 = doc1.docs[0].data();
        telugusetsongs(data1.songs); 
        
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

    return( <Container>
        {/* {checkdata&&(
        <div>
            Dashboard welcome {name}
            <Button variant="contained" onClick={logout}>Logout</Button>
            <audio controls>
                <source src={telugusongs[0]} type="audio/mpeg" />
                Your browser does not support the audio tag.
            </audio>
        </div>
        )} */}
        <Navbar title="2"/>
        <Content>
        <h1>Favourite songs page</h1>
        </Content>
    
    </Container>);
}

export default Favourite;

const Container = styled.div`
    width:98.5vw;
    height:100vh;
`;

const Content = styled.div`
    margin-left:250px;
    margin-top:100px;
    @media screen and (max-width: 850px) {
        margin-left:0px;
    }
`
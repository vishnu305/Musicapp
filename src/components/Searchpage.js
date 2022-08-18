import React,{useState,useEffect,useRef,useContext} from 'react';
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
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';

import {
    auth,
    logout,
  } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from '@mui/material/Button';
import Tracks from "./Tracks";
import { Context } from "../context";
import axios from "axios";

function Searchpage(){

    const [name, setName] = useState([]);
    const [searchsong,setsearchsong] = useState("");
    const [trackTitle, setTrackTitle] = useState("");
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


    const [state, setState] = useContext(Context);

    useEffect(() => {
        axios
          .get(
            `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${
              process.env.REACT_APP_MM_KEY
            }`
          )
          .then(res => {
            let track_list = res.data.message.body.track_list;
            setState({ track_list: track_list, heading: "Search Results" });
          })
          .catch(err => console.log(err));
      }, [trackTitle]);
      const findTrack = e => {
        e.preventDefault();
        setTrackTitle(searchsong);
      };
    

    

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
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
    crossorigin="anonymous"></link>
        <Content>
        <div style={{display:"flex",alignItems:"center"}}>
        <TextField id="outlined-basic" label="Search Lyrics" type='text' variant="outlined" value={searchsong} onChange={(e)=>{setsearchsong(e.target.value)}} style={{width:"90%",margin:"2%"}}/>
        <SearchIcon style={{width:"30px",height:"30px",cursor:"pointer"}} onClick={findTrack}/>
        </div>
        <Tracks/>
        </Content>
    
    </Container>);
}

export default Searchpage;

const Container = styled.div`
    width:98.5vw;
    // height:100vh;
    z-index:1;
`;

const Content = styled.div`
    margin-left:250px;
    margin-top:100px;
    @media screen and (max-width: 850px) {
        margin-left:0px;
    }
`
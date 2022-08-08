import React,{useState,useEffect,useContext} from 'react';
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
import playerContext from './PlayerContext.js';
import './cssfolder/input.css';
import './cssfolder/main.css';
import Controls from './Controls.js';


function Dashboard(){

    const [name, setName] = useState([]);
    const [profileimg,setprofileimg] = useState(profileblue);
    const [user, loading, error] = useAuthState(auth);
    const [telugusongs,telugusetsongs]=useState([]);
    const navigate = useNavigate();
    const [checkdata,setcheckdata] = useState(false);
    const { SetCurrent, currentSong, songslist } = useContext(playerContext);
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
        <Navbar title="0"/>
        <Content>
        <div className="content1">
        <ul className="loi">
        {songslist.map((song, i) => (
          <li
            className={'songContainer ' + (currentSong === i ? 'selected' : '')}
            key={i}
            onClick={() => {
              SetCurrent(i)
            }}
          >
            <img alt="song" style={{width:"100px",height:"100px"}} src="https://freemusicarchive.org/image?file=images%2Falbums%2FSkidmore_College_Orchestra_-_Mussorgskys_Pictures_at_an_Exhibition_-_2009113013701972.jpg&width=290&height=290&type=image" />
            <div className="songmeta_playlist">
              <span className="songname">{song.title}</span>
              <span className="songauthors">{song.artistName}</span>
            </div>
            <div className="playlist_btns_group">
              <button className="fav_song playlist_btn">
                <i className="far fa-heart fa-lg"></i>
              </button>
            </div>

          </li>
        ))}
      </ul>
        </div>
        <Controls/>
        </Content>
    
    </Container>);
}

export default Dashboard;

const Container = styled.div`
    width:98.5vw;
    height:100vh;
`;

const Content = styled.div`
    margin-left:250px;
    .content1{
        margin:30px;
        margin-top:100px;
    }
    @media screen and (max-width: 850px) {
        margin-left:0px;
    }
`
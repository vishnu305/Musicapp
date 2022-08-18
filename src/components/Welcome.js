import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import musicimage1 from '../images/music1.svg';
import musicimage2 from '../images/music2.svg';
import TextField from "@mui/material/TextField";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import {
  auth,
} from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";


function Welcome(){
    const [isMobile, setIsMobile] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    const clickHandler = () => {
      setIsMobile(!isMobile);
    };
    const movetotop = ()=>{
      window.scrollTo(0,0);
    }
    useEffect(() => {
      if (loading) return;
      if (!user) {
          navigate("../", { replace: true });
      }
      if (user) {
        navigate("../dashboard", { replace: true });
      }
      if (error) {
      alert(error.message);
      }
  }, [user, loading, error]);
    $(document).ready(function () {
      $(window).scroll(function () {
  
        if (this.scrollY > 20) {
          var a = document.querySelector(".navbar");
          if (a) {
          //   a.style.backgroundColor = "crimson";
            a.style.height = "50px";
          }
        } else {
          var a = document.querySelector(".navbar");
          if (a) {
          //   a.style.backgroundColor = "transparent";
            a.style.height = "92px";
          }
        }
      });
    });

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [company, setcompany] = useState("");
    const [message, setmessage] = useState("");
    const [job, setjob] = useState("");

    return <Container>
     <Navbar1 className='navbar'>
        <Link style={{textDecoration:"none"}} to='/'>
            
        <h1 style={{color:"#007aff"}}><MusicNoteIcon/>Music App</h1>
        </Link>
        <div style={{ display: "flex" }}>
          <ul className={isMobile ? "navfeat active" : "navfeat"}>
            <li className="lists">
              <div className="nav-link" onClick={movetotop}>
                Home
              </div>
            </li>
            <li className="lists">
              <a href="#aboutus1" className="nav-link">
                About us
              </a>
            </li>           
            <li className="lists">
              <a href="#contactus1" className="nav-link">
                Contact us
              </a>
            </li>
          </ul>
        </div>
        
        <div>
            <ul style={{ paddingLeft: "0",display:"flex" }}>
                <li className="lists2">
                <Link style={{textDecoration:"none"}} to='/login'>
                    <div className="nav-link2">
                        login
                    </div>
                    </Link>
                </li>
                <li className="lists2">
                <Link style={{textDecoration:"none"}} to='/signup'>
                    <div className="nav-link2">
                        Sign up
                    </div>
                </Link>
                </li>
            </ul>
        </div>
       
       
        <div className="mobile-menu-icon" onClick={clickHandler}>
          {isMobile ? (
            <CloseIcon
              style={{
                cursor: "pointer",
                width: "40px",
                height: "40px",
                border: "1px solid white",
                borderRadius: "10px",
              }}
            />
          ) : (
            <MenuIcon
              style={{
                cursor: "pointer",
                width: "40px",
                height: "40px",
                border: "1px solid white",
                borderRadius: "10px",
              }}
            />
          )}
        </div>
      </Navbar1>   
      <Homesection>
        <img id="musicimg1" alt="musicimg1" src={musicimage1}/>
        <p style={{width:"50%",fontSize:"30px",fontWeight:"600", color:"white"}}>
        Music is the language of the spirit. It opens the secret of life bringing peace, abolishing strife. In this website you can find popular songs.
        </p>
      </Homesection>
      <br id="aboutus1"/>
      <br/>
      <br/>
      <br/>
      <br/>
      
      
      <h1 style={{fontSize:"50px",color:"white"}}>About us</h1>
      <Aboutussection>
            <p style={{width:"50%",fontSize:"30px",fontWeight:"600", color:"white",display:"inline-block"}}>
            Music is the language of the spirit. It opens the secret of life bringing peace, abolishing strife. In this website you can find popular songs.
            </p>
            <img className="musicimg2" alt="musicimg2" src={musicimage2}/>
      </Aboutussection>

      <br id="contactus1"/>
      <br/>
      <br/>
      <br/>

      <Getintouch1 >
      <div className="getheaddiv">
        <h1 className="gethead">Make Contact</h1>
        <p style={{color:"white", textAlign: "center" }}>
          Fill out the form and we will get in touch with you
        </p>
      </div>
      <div className="contactform" >
        <form>
          <TextField
            id="outlined-basic name"
            label="Name"
            name="uname"
            type="text"
            variant="outlined"
            onChange={(e) => setname(e.target.value)}
            style={{
              width: "85%",
              margin: "40px",
              marginTop: "50px",
              marginBottom: "25px",
              background: "rgba(255, 123, 123, 0.2)",
            }}
            required
          />
          <TextField
            id="outlined-basic fname"
            label="Email"
            type="email"
            variant="outlined"
            onChange={(e) => setemail(e.target.value)}
            style={{
              width: "85%",
              margin: "0px 40px",
              marginBottom: "25px",
              background: "rgba(255, 123, 123, 0.2)",
            }}
            required
          />
          <TextField
            id="outlined-basic fname"
            label="Phone"
            type="tel"
            variant="outlined"
            onChange={(e) => setphone(e.target.value)}
            style={{
              width: "85%",
              margin: "0px 40px",
              marginBottom: "25px",
              background: "rgba(255, 123, 123, 0.2)",
            }}
            required
          />
          
          <TextField
            id="outlined-multiline-flexible"
            label="Message"
            multiline
            rows={4}
            type="text"
            onChange={(e) => setmessage(e.target.value)}
            style={{
              width: "85%",
              margin: "0px 40px",
              marginBottom: "25px",
              background: "rgba(255, 123, 123, 0.2)",
            }}
            required
          />
          <input className="formsend" type="submit" value="Send" />
        </form>
        <p style={{ color: "black", textAlign: "center" }}>
          We will process your personal information in accordance with our
          <a style={{ textDecoration: "none" }} href="">
            {" "}
            Privacy policy
          </a>
        </p>
      </div>
    </Getintouch1>

    <Footer1>
        <div className="footer11">
          <p style={{ fontSize: "30px", marginBottom: "15px" }}>MUSIC WEB APP</p>
          <p>Made for fun</p>
          <div
            style={{
              display: "flex",
              width:"50%",
              justifyContent: "space-around",
              marginTop: "15px",
              marginLeft:"25%",
              alignItems: "center",
            }}
          >
           
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/"
            >
              <i
                style={{
                  backgroundColor: "white",
                  // width: "46px",
                  // height: "46px",
                  padding: "15px",
                  borderRadius: "50%",
                  color: "#757cff",
                  marginRight: "10px",
                }}
                class="fab fa-linkedin-in"
              ></i>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/"
            >
              <i
                style={{
                  backgroundColor: "white",
                  // width: "46px",
                  // height: "46px",
                  padding: "15px",
                  paddingLeft: "16px",
                  borderRadius: "50%",
                  color: "#757cff",
                  marginRight: "10px",
                }}
                class="fa fa-instagram"
              ></i>
            </a>
          </div>
        </div>
        
        <div className="footer1">
          <p
            style={{
              fontSize: "30px",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            Contact us
          </p>
          <p style={{ textAlign: "center", width: "300px" }}>
            Amity University Lucknow Campus
          </p>
          <p
            style={{
              marginTop: "10px",
              display: "flex",
            }}
          >
            <EmailOutlinedIcon /> shudanshu@gmail.com
          </p>
        </div>
      </Footer1>
    </Container>;
}

export default Welcome;

const Container = styled.div`
text-align:center;
background: linear-gradient(to right,#ff512f , #dd2476);
width:100vw;
`;

const Homesection = styled.div`
    padding-top: 230px;
    display:flex;
    align-items:center;
    justify-content:space-around;
    #musicimg1{
        width:450px;
    }
`;

const Aboutussection = styled.div`
    margin-top:40px;
    diplay:flex;
    align-items:center;
    justify-content:space-around;
    .musicimg2{
        width:350px;
    }
`;
const Navbar1 = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  position: fixed;
  border-bottom: 2px solid #50505026;
  top: 0;
  width: 95%;
  z-index: 1000;
  transition: all 0.3s ease;
  .navfeat {
    display: flex;
  }
  .lists {
    list-style: none;
    margin: 12px 25px;
    font-size: 20px;
    font-weight: 600;
    line-height: 34.05px;
    color: #1938a7;
  }
  .lists2 {
    list-style: none;
    margin:0px 5px;
    font-size: 20px;
    font-weight:600;
    color: #1938a7;
  }

  .mobile-menu-icon {
    display: none;
  }
  .nav-link {
    color: rgba(80, 80, 80, 0.5);
    text-decoration: none;
    transition: all 300ms ease-out;
    font-size: 18px;
    cursor:pointer;
  }
  .nav-link:hover {
    color: black;
  }
  
  .nav-link2 {
    color: white;
    background: #007aff;
    text-decoration: none;
    // padding: 1rem;
    padding: 4px 15px;
    border: 3px solid #007aff;
    border-radius: 5px;
    transition: all 300ms ease-out;
    font-size: 19px;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: space-around;
    width: 90px;
  }
  .nav-link2:hover {
    border: 3px solid #007aff;
    color: #007aff;
    background: white;
    border-radius: 5px;
    img {
      color: #007aff;
    }
  }
  .submenulist {
    position: absolute;
    top: 100px;
    right: 80px;
    list-style: none;
    li {
      background-color: #007aff;
      color: white;
      padding: 3px 20px;
      // border-radius: 5px;
      border: 1px solid white;
      transition: 0.3s ease-out;
      cursor: pointer;
    }
    li:hover {
      background-color: white;
      color: #007aff;
      border: 1px solid #007aff;
    }
  }
  .hidden3 {
    display: none;
  }
  @media screen and (max-width: 500px) {
    .nav-link2 {
      width: 100px;
    }
  }
  @media screen and (max-width: 1111px) {
    padding: 15px 15px;
    height: 100px;
    padding-bottom: 0px;
    .log {
      display: flex;
      position: absolute;
      top: 15px;
      left: 35px;
    }
    // .navfeat {
    //   display: none;
    // }

    .navfeat {
      position: fixed;
      top: 100px;
      left: -100%;
      flex-direction: column;
      align-items: center;
      background-color: #242424;
      width: 100%;
      height: 100%;
      padding: 1.6rem 0;
      transition: all 300ms ease-in-out;
      z-index: 100;
    }
    .navfeat.active {
      left: 0%;
      transition: all 300ms ease-in-out;
    }
    .lists {
      color: white;
      width: 100%;
      text-align: center;
    }
    .nav-link {
      font-size: 1.8rem;
      width: 100%;
      color: white;
      border: 3px solid #242424;
    }
    .nav-link1 {
      font-size: 1.8rem;
      width: 100%;
      color: white;
      border: 3px solid #242424;
    }
    .mobile-menu-icon {
      display: block;
    }
    .nav-link2 {
      // width: 110px;
    }
    .submenulist {
      right: 30%;
    }
  }
`;

const Getintouch1 = styled.div`
  width: 86%;
  height: 600px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background:#007aff;
  margin-left:7%;
  border-radius:30px;
  margin-top:50px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

  display: flex;
  justify-content:space-between;
  flex-wrap: wrap;
  .gethead {
    color: white;
    font-size:75px;
    text-align:center;
    // padding-left:168px;
    // padding-right:168px;
    padding-top:50px;
    padding-bottom:50px;
    margin-top:5%;
    margin-bottom:0;
    padding-bottom:0;
  }
  .getheaddiv{
    flex: 1;
    flex-direction:column;
  }
  .contactform {
    width: 580px;
    height: 550px;
    margin-top:25px;
    margin-right:150px;
    background: white;
    box-shadow: 3.80118px 5.70178px 9.50296px rgba(0, 0, 0, 0.2);
    border-radius: 23.7574px;
  }
  .formsend{
      margin-left: 70%;
      background: #007aff;
      border-radius: 7.6259px;
      width: 130px;
      height: 50px;
      border: 1px solid;
      color: white;
      font-size: 17px;
      cursor:pointer;
  }
  @media screen and (max-width: 617px) {
    .contactform {
      margin-left: 0;
      width: 100vw;
    }
    .formsend {
      margin-left: 40%;
    }
  }
  @media screen and (max-width: 1010px) {
      height:750px;
      .getheaddiv{
          display:block;
          margin-top:0;
          height:5px;
          z-index:100;
      }
      .gethead{
          margin-top:0;
          font-size:45px;
          padding-top:15px;
          padding-bottom:15px;
          z-index:100;
      }
      .contactform{
          width:95%;
          margin-right:0px;
          // height:640px;
          // margin-top:0;
          margin-top:150px;
      }
  }
`;

const Footer1 = styled.div`
  background: #757cff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 50px;
  margin-top:100px;

  * {
    margin: 0;
  }
  .footer1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    margin-top: 50px;
    margin-bottom: 50px;
    p {
      color: white;
    }
    h1 {
      color: white;
    }
  }
  .footer11 {
    display: flex;
    flex-direction: column;
    color: white;
    margin-top: 50px;
    margin-bottom: 50px;
    p {
      color: white;
    }
    h1 {
      color: white;
    }
  }
  @media screen and (max-width: 617px) {
    .footer11 {
      // margin-left: 15%;
      align-items: center;
    }
  }
  // @media screen and (max-width: 520px) {
  //   width: 520px;
  //   // display: inline-block;
  // }
`;
import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import googleimg from "../images/google.png";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
  sendPasswordReset,
} from "../firebase-config.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { Alert } from '@mui/material';
import Collapse from '@mui/material/Collapse';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Login(){

    const navigate = useNavigate();
    const [userid, setuserid]=useState("");
    const [password, setpassword]=useState("");
    const [user, loading, error] = useAuthState(auth);
    const [openpasscheck, setpasscheck] = useState(false);
    const [errortext,seterrortext] = useState("");
    const [resetemail, setresetemail] = useState("");

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleClose1 = ()=>{
      setOpen(false);
      sendPasswordReset(resetemail);
      seterrortext("Reset link sended successfully");
      setpasscheck(true);
    }

    useEffect(() => {
      if (loading) return;
      if (user) navigate("../dashboard", { replace: true });
    }, [user, loading,navigate]);

    

    const login = () => {
      if (!userid) {
        seterrortext("Please enter email");
        setpasscheck(true);
      }
      else if(!password){
        seterrortext("please enter password");
        setpasscheck(true);
      }
      else{
      logInWithEmailAndPassword(userid, password);
      }
    };


  
  
    return(
        <Container>
        <Link style={{textDecoration:'none',cursor:'pointer'}} to='/'>
        <ArrowBackIcon style={{position:"absolute",color:"white",width:"50px",height:"50px",left:"20px",top:"20px",cursor:"pointer"}}/>
        </Link>
        <div class="center">
        <h1>Login</h1>
        {/* <p style={{textAlign:'center',marginTop:'10px'}}>{error}</p> */}
        <form>
          
            <br />
    
          <TextField id="outlined-basic" label="Enter Email id" type='email' variant="outlined" onChange={(e)=>setuserid(e.target.value)} style={{width:"100%"}} required/>
          <br />
            <br />
    
          <TextField id="outlined-basic" label="Password" type='password' variant="outlined" onChange={(e)=>setpassword(e.target.value)} style={{width:"100%"}} required/>
          <br />
            <br />
            <br/>
          
            <div class="loginbutton" onClick={login}>
            Login
            </div>
          
    
        </form>
        <h4 style={{ color: "#007aff",textAlign:"right",marginRight:"20px",textDecoration:"underLine",cursor:"pointer" }} onClick={handleClickOpen}>
                Forgot password?
              </h4>
        <p style={{fontSize:"20px",textAlign:"center",fontWeight:"600"}}>OR</p>
        <div
                style={{
                  padding: "10px",
                  width: "40%",
                  textAlign: "center",
                  color: "#007aff",
                  margin: "5px auto",
                  borderRadius: "10px",
                  cursor: "pointer",
                  boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
                onClick={signInWithGoogle}
              >
                <img style={{ width: "30px", height: "30px" }} src={googleimg} alt='googleimg'/>
                Login with Google
              </div>
        
        <div class="signup_link">
              Not Registered? <Link style={{textDecoration:'none',cursor:'pointer'}} to='/signup'><a>Signup</a></Link>
            </div>
        </div>

        <Collapse in={openpasscheck}>
        <Alert severity='error' style={{width:"30%",position:"absolute",right:"10px",top:"10px"}} onClose={() => {setpasscheck(false)}}>{errortext}</Alert>
        </Collapse>

        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset your password, please enter your email address here. We
            will send the reset link to your email.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=>setresetemail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose1}>Submit</Button>
        </DialogActions>
      </Dialog>
        </Container>
        )
}

export default Login;

const Container = styled.div`
    min-width: 100vw;
    min-height: 100vh;
    // background: linear-gradient(120deg,#2980b9, #8e44ad);
    background:#007aff;
    overflow: hidden;
    font-family: "Poppins", sans-serif;
    .center{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      background: white;
      border-radius: 10px;
      box-shadow: 10px 10px 15px rgba(0,0,0,0.05);
      border: 6px solid yellow;
    }
    .center h1{
      text-align: center;
      padding: 20px 0;
    }
    .center form{
      padding: 0 40px;
      box-sizing: border-box;
    }
    .center h1{
      text-align: center;
      padding: 20px 0;
      border-bottom: 1px solid silver;
    }
    .signup_link{
      margin: 30px 0;
      text-align: center;
      font-size: 16px;
      color: #666666;
    }
    .signup_link a{
      color: #007aff;
      text-decoration: none;
    }
    .signup_link a:hover{
      text-decoration: underline;
    }

    .loginbutton{
      width: 100%;
    //   height: 50px;
    padding-top:15px;
    padding-bottom:15px; 
      border: 1px solid;
      background: #007aff;
      border-radius: 25px;
      font-size: 18px;
      color: #e9f4fb;
      font-weight: 700;
      cursor: pointer;
      outline: none;
      text-align:center;
    }
    .loginbutton:hover{
      background:#14279B;
      transition: .5s;
    }

`

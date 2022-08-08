// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDDQ8zSkslXsoYQ8H0_SkoUgfWBU1xI1CI",
  authDomain: "musicapp-29733.firebaseapp.com",
  projectId: "musicapp-29733",
  storageBucket: "musicapp-29733.appspot.com",
  messagingSenderId: "323042671581",
  appId: "1:323042671581:web:43aa12de8c1e7251a41434",
  measurementId: "G-CPE996MYKL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "usersfromwebsite"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "usersfromwebsite"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        photo: user.photoURL,
        favouritesongs:[]
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "usersfromwebsite"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      favouritesongs:[]
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    // alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
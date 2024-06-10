import { createContext, useContext,useEffect,useState } from "react";
import {initializeApp} from 'firebase/app'
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged} from 'firebase/auth'
import {getFirestore,collection,addDoc,getDocs} from 'firebase/firestore'
import {getStorage,ref,uploadBytes} from  'firebase/storage'

const FirebaseContext = createContext(null);

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrt5O1pIxMI6wBV4jUOe37SZOFnzncU8s",
  authDomain: "bookify-c5ee1.firebaseapp.com",
  projectId: "bookify-c5ee1",
  storageBucket: "bookify-c5ee1.appspot.com",
  messagingSenderId: "703929495144",
  appId: "1:703929495144:web:07a3fa886166ad816895dd"
};

// Initialize Firebase
export const useFirebase = () => useContext(FirebaseContext);


const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export const FirebaseProvider = (props) => {
    const [user,setUser] = useState(null)
    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,user=>{
            if(user) setUser(user)
            else setUser(null)
        })
    },[])

    const signUpUserWithEamilAndPassword = (email,password)=>{
        createUserWithEmailAndPassword(firebaseAuth,email,password)
    }
    const loginInUserWithEamilAndPassword =(email,password)=>{
        signInWithEmailAndPassword(firebaseAuth,email,password)
    }
    const signInWithGoogle = ()=>signInWithPopup(firebaseAuth,new GoogleAuthProvider())

    const handleCreateNewListing = async(name,isbn,price,cover) =>{
        const imageRef = ref(storage,`uploads/images/${Date.now()}/${cover.name}`)
        const uploadResult = await uploadBytes(imageRef,cover)
        await addDoc(collection(firestore,'books'),{
            name,
            isbn,
            price,
            imageURL:uploadResult.ref.fullPath,
            userID:user.uid,
            userEmail:user.email,
            displayName:user.displayName,
            photoURL:user.photoURL
        })
    }

    const listAllBooks = async()=>{
        return await getDocs(collection(firestore,`books`))
    }

    const isLoggedIn = user ? true : false 
    
    return (
        <FirebaseContext.Provider value={{signUpUserWithEamilAndPassword,loginInUserWithEamilAndPassword,signInWithGoogle,handleCreateNewListing,listAllBooks,isLoggedIn,
        }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};

// import { createContext, useContext,useEffect,useState } from "react";
// import {initializeApp} from 'firebase/app'
// import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged} from 'firebase/auth'
// import {getFirestore,collection,addDoc,getDocs,doc,getDoc,where,query} from 'firebase/firestore'
// import {getStorage,ref,uploadBytes,getDownloadURL} from  'firebase/storage'

// const FirebaseContext = createContext(null);

// // Import the functions you need from the SDKs you need
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBrt5O1pIxMI6wBV4jUOe37SZOFnzncU8s",
//   authDomain: "bookify-c5ee1.firebaseapp.com",
//   projectId: "bookify-c5ee1",
//   storageBucket: "bookify-c5ee1.appspot.com",
//   messagingSenderId: "703929495144",
//   appId: "1:703929495144:web:07a3fa886166ad816895dd"
// };

// // Initialize Firebase

// export const useFirebase = ()=> useContext(FirebaseContext);   


// const firebaseApp = initializeApp(firebaseConfig)
// const firebaseAuth = getAuth(firebaseApp)
// const firestore = getFirestore(firebaseApp)
// const storage = getStorage(firebaseApp)

// export const FirebaseProvider = (props) => {
//     const [isUser,setIsUser] = useState(null)
//     const [user,setUser] = useState(null)

//     useEffect(()=>{
//         checkAuth()
//     },[user])

//     const checkAuth = ()=>{
//         onAuthStateChanged(firebaseAuth,isUser=>{
//             if(isUser) {
//                 setUser(isUser)
//                 setIsUser(isUser)
//             }
//             else setUser(null)
//         })
//     }

//     const signUpUserWithEamilAndPassword = (email,password)=>{
//         createUserWithEmailAndPassword(firebaseAuth,email,password)
//     }
//     const loginInUserWithEamilAndPassword =(email,password)=>{
//         signInWithEmailAndPassword(firebaseAuth,email,password)
//     }
//     const signInWithGoogle = ()=>signInWithPopup(firebaseAuth,new GoogleAuthProvider())

//     const handleCreateNewListing = async(name,isbn,price,cover) =>{
//         const imageRef = ref(storage,`uploads/images/${Date.now()}/${cover.name}`)
//         const uploadResult = await uploadBytes(imageRef,cover)
//         await addDoc(collection(firestore,'books'),{
//             name,
//             isbn,
//             price,
//             imageURL:uploadResult.ref.fullPath,
//             userID:user.uid,
//             userEmail:user.email,
//             displayName:user.displayName,
//             photoURL:user.photoURL
//         })
//     }

//     const listAllBooks = ()=>{
//         return  getDocs(collection(firestore,`books`))
//     }

//     const getImageURL = (path)=>{
//         return getDownloadURL(ref(storage,path))
//     }

//     const getBookById = async(id)=>{
//         const docRef = doc(firestore,'books',id)
//         const result = await getDoc(docRef)
//         return result
//     }

//     const placeOrder = async(bookId,qty)=>{
//         const collectionRef = collection(firestore,"books",bookId,"order")
//         const result = await addDoc(collectionRef,{
//             userID:user.uid,
//             userEmail:user.email,
//             displayName:user.displayName,
//             photoURL:user.photoURL,
//             quantity:qty

//         })
//         return result
//     } 

//     const isLoggedIn = user?.uid ? true : false 

//     const fetchMyOrders = async () => {
//         if (user) {
//           console.error("User is not authenticated.",user);
//         }

      
//         try {
//           const collectionRef = collection(firestore, "books")
//           checkAuth()
//           const q = query(collectionRef, where("userID", "==", user?.uid));
            
//           const result =  await getDocs(q)
//           console.log(result,"orders")
//           return result

//         } catch (error) {
//           console.error("Error fetching orders: ", error);
//         }
//       };
      
//     return (
//         <FirebaseContext.Provider value={{checkAuth,fetchMyOrders,placeOrder,getBookById,signUpUserWithEamilAndPassword,loginInUserWithEamilAndPassword,signInWithGoogle,handleCreateNewListing,listAllBooks,isLoggedIn,getImageURL,
//         }}>
//             {props.children}
//         </FirebaseContext.Provider>

//     );
// };
import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  where,
  query
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const FirebaseContext = createContext(null);

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
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    unsubscribe()
  
  }, []);
  const unsubscribe =()=> onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  const signUpUserWithEmailAndPassword = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.error("Error signing up with email and password: ", error);
    }
  };

  const loginUserWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.error("Error logging in with email and password: ", error);
    }
  };

  const signInWithGoogle = () => signInWithPopup(firebaseAuth, new GoogleAuthProvider());

  const handleCreateNewListing = async (name, isbn, price, cover) => {
    try {
      const imageRef = ref(storage, `uploads/images/${Date.now()}/${cover.name}`);
      const uploadResult = await uploadBytes(imageRef, cover);
      const imageURL = await getDownloadURL(uploadResult.ref);
      await addDoc(collection(firestore, 'books'), {
        name,
        isbn,
        price,
        imageURL,
        userID: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      });
    } catch (error) {
      console.error("Error creating new listing: ", error);
    }
  };

  const listAllBooks = () => getDocs(collection(firestore, 'books'));

  const getImageURL = (path) => getDownloadURL(ref(storage, path));

  const getBookById = async (id) => {
    try {
      const docRef = doc(firestore, 'books', id);
      const result = await getDoc(docRef);
      return result.data();
    } catch (error) {
      console.error("Error getting book by ID: ", error);
    }
  };

  const placeOrder = async (bookId, qty) => {
    try {
      const collectionRef = collection(firestore, 'books', bookId, 'order');
      const result = await addDoc(collectionRef, {
        userID: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        quantity: qty
      });
      return result;
    } catch (error) {
      console.error("Error placing order: ", error);
    }
  };

  const fetchMyOrders = async () => {
    if (!user?.uid) {
        unsubscribe()

      console.error("User is not authenticated.");
      return null;
    }

    try {
      const collectionRef = collection(firestore, "orders"); // Assuming orders are stored under a different collection
      const q = query(collectionRef, where("userID", "==", user.uid));
      const result = await getDocs(q);
      result.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  const isLoggedIn = user?.uid ? true : false;

  return (
    <FirebaseContext.Provider value={{
      fetchMyOrders,
      placeOrder,
      getBookById,
      signUpUserWithEmailAndPassword,
      loginUserWithEmailAndPassword,
      signInWithGoogle,
      handleCreateNewListing,
      listAllBooks,
      isLoggedIn,
      getImageURL,
      user
    }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

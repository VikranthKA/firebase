import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'

const Home = async() => {
  const firebase = useFirebase()
  console.log(firebase)
  const [books,setBooks] = useState("")
  useEffect(()=>{
  firebase.listAllBooks().then((docs)=>console.log(docs.docs[0].data))

  },[])
  return (
    <div> 
      <h1>Listing Books</h1>
    </div>
  )
}

export default Home

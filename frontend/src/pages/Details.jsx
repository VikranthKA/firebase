import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'
const Details = () => {
    const [data,setData] = useState(null)
    const firebase = useFirebase()
    const {bookId} = useParams()
    useEffect(()=>{
        firebase.getBookById(bookId).then(value => console.log(value))
    },[bookId])
  return (
    <div>
    </div>
  )
}

export default Details

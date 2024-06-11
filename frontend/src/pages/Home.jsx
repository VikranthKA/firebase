

import React, { useEffect,useState } from 'react'
import { useFirebase } from '../context/Firebase'
import CardCom from '../components/Card'
import { CardGroup } from 'react-bootstrap'

const Home = () => {
  const [books,setBooks] = useState([])
  const firebase = useFirebase()
  

  useEffect(()=>{
    firebase.listAllBooks().then((docs)=>setBooks(docs.docs),"working")

  },[])
  return (
    <div>
      <h2>Listing Books</h2>

      {
        books.length > 0 ?
        <div> 
          { books.length >= 1 &&
          <CardGroup>
            {books.map((book)=>{
              return <div className='mt-5'>
                <CardCom key={book.id} id={book.id} data={book.data()}/>
                </div>
                
            })
          }
            </CardGroup>
          }
        </div>
        :
        <div>Loading</div>

        
      }
    </div>
  )
}

export default Home


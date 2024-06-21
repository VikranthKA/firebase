import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import Card from "../components/Card"

const ViewOrders = () => {
  const { fetchMyBooks, isLoggedIn,user } = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if(isLoggedIn){

      const getOrders = async () => {
        if (isLoggedIn) {
          const allBooks = await fetchMyBooks(user.uid);
          setBooks(allBooks.docs)
          console.log(allBooks)
  
  
        }
      };
      getOrders();
    }
    if(!isLoggedIn) <h1> Please Login In</h1>
    

  }, []);

  return (
    <div>
      <h1>Orders</h1>
      {books?.length > 0 ? (
        <ul>
          {/* {console.log(books)} */}
           {books.map(book =><Card key={book.id} id={book.id} data={book.data()}/>)}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default ViewOrders;

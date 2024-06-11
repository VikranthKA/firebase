import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';

const ViewOrders = () => {
  const { fetchMyOrders, isLoggedIn } = useFirebase();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      if (isLoggedIn) {
        const ordersSnapshot = await fetchMyOrders();
        console.log(ordersSnapshot,"orders")
        // const ordersList = ordersSnapshot.docs.map(doc => ({
        //   id: doc.id,
        //   ...doc.data()
        // }));
        // setOrders(ordersList);
      }
    };

    getOrders();
  }, [isLoggedIn, fetchMyOrders]);

  return (
    <div>
      <h1>Orders</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Book ID: {order.bookId}</p>
              <p>Quantity: {order.quantity}</p>
              {/* Add other order details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default ViewOrders;

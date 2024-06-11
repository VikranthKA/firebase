import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'
import { Button, Form } from 'react-bootstrap';
const Details = () => {
    const [data,setData] = useState(null)
    const [qty,setQty] = useState(1)
    const firebase = useFirebase()
    const {bookId} = useParams()
    const [url,setURL] = useState(null)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const result = await firebase.placeOrder(bookId,qty)
        console.log(result)
    }
    useEffect(()=>{
        firebase.getBookById(bookId).then(value => setData(value))
    },[bookId])

    useEffect(()=>{
        if(data) {
            const imageURL = data.imageURL
            firebase.getImageURL(imageURL).then(url => setURL(url))
        }
    },[data])

    if (data===null) return <h1>Loading...</h1>
  return (
    <div className='container mt-5'>
        <h1>{data.name}</h1>
        <img src={url} width="100%" alt='Loading..' style={{borderRadius:"10px"}} />
        <h4>Details</h4>
        ISBN : {data.isbn}<br/>
        Price : {data.price}<br/>

        <h3>Owner Details</h3>
        Name : {data.displayName}
        email : {data.userEmail}<br/><br/>
        <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" placeholder="Enter Quantity" value={qty} onChange={(e)=>setQty(e.target.value)}/>

                </Form.Group>
                <Button variant="primary" type="submit">
                Buy Now                </Button>
        </Form>

    </div>
  )
}

export default Details

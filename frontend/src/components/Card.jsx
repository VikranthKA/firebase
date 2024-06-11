import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';
function CardCom({data,id}) {
    const [url,setURL] = useState(null)
    const firebase = useFirebase()

    useEffect(()=>{
        firebase.getImageURL(data.imageURL).then(url=>setURL(url))
    },[])
    const navigate = useNavigate()
  return (
    <Card style={{ width: '18rem',margin:"20px" }} key={data.isbn}>
        {console.log(data)}
      <Card.Img variant="top" src={`${url}`}/>
      <Card.Body>
        <Card.Title>{console.log(data.name)}</Card.Title>
        <Card.Text>
                Price :{data.price} <br/> by : {data.displayName} <br/> {data.userEmail}
        </Card.Text>
        {console.log(data)}
        <Button onClick={e=>navigate(`/book/view/${id}`)} variant="primary">View</Button>

      </Card.Body>
    </Card>
  );
}

export default CardCom;
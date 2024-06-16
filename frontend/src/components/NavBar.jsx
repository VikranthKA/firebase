import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import { useEffect } from 'react';

function NavBar() {
    const navigate = useNavigate()
    const firebase = useFirebase()

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link onClick={()=>navigate("/book/list")}>Add Listing</Nav.Link>
            <Nav.Link href="/book/orders">Orders</Nav.Link>
            <Nav.Link href="/appoinment">Appointment</Nav.Link>




          </Nav>
        </Container>
      </Navbar>
      <br />
     
    </>
  );
}

export default NavBar;
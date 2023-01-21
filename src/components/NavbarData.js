import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../cssfiles/header.css';
import { Button } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext';
import { GiNotebook } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

function NavbarData() {

  const {logOut} = useUserAuth();
  const navigate = useNavigate();

  const handlelogOut = async(e) => {
    e.preventDefault();
    try {
      await logOut();
      localStorage.clear();
      navigate('/');
    } catch (error) {
      alert("Something went Wrong !");
    }

  }




  return (
    <Navbar collapseOnSelect expand="lg" className='header' variant="dark">
      <Container>
        <Navbar.Brand href="#" className='ms-2 font zoom'><GiNotebook className='fs-2'/>Keep Notes</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className='navtexts'>
            <Nav.Link href="/allnotes">All Notes</Nav.Link>
            <Nav.Link href="/archivedata">Archieved Notes</Nav.Link>
            <Nav.Link href='/trash'>Trash</Nav.Link>
            <Nav.Link href='/pinned'>Pinned Notes</Nav.Link>
            <Nav.Link href='/addnote'>Add Note</Nav.Link>
            <Button className='ms-2' onClick={handlelogOut}>LogOut</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>



 
  );
}

export default NavbarData;
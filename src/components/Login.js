import {Link, useNavigate} from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import { Form} from 'react-bootstrap';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import { useUserAuth } from '../context/UserAuthContext';
import Col from 'react-bootstrap/Col';
import GoogleButton from 'react-google-button';
import '../cssfiles/note.css';


const Login = () => {
    
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [username,setUsername] = useState("");
  const navigate = useNavigate();
  const {LogIn} = useUserAuth();
  const {googleSignIn} = useUserAuth();


  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    try {
    
      var d1 = document.getElementById("d1"); 

      if(d1.checked)
      {
        await LogIn(email, password);
        var arr=email.split('@');
        var loginId = arr[0];
        localStorage.setItem("loginId",loginId);
        localStorage.setItem("loginUsername",username);
        navigate("/addnote");    
      }

      else
      {
        setError("Not checked")    
      }

  } catch (err) {
    console.log(err.message);
    setError(err.message);
    }
};




  return (
    <div>
      <div className="p-4 box rounded vc">
      
        <h3>Sign in</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>


        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control type="name" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>

          <Row className='mb-3'>
              <Form.Group as={Col} className="mb-3">
              <Form.Check type="checkbox" id="d1" label="Remember me"/>
            </Form.Group>
        </Row>

          <div className="d-grid gap-2 mb-5">
            <Button variant="dark" type="Submit"> Login </Button>
          </div>
        </Form>
        
       

        <div className='ps-3 mt-4' style={{ color: 'grey'}}> Don't have an account? <Link to="/signup"   style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none'}}>Register</Link></div>
        
      </div>

      
    </div>
  );
};

export default Login;
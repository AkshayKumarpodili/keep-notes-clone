import React, {useState} from 'react';
import { Button,Form , Alert} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { auth } from '../firebase';
import { updateProfile } from 'firebase/auth';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import '../cssfiles/note.css';

const Signup = () => {
    
    const [email, setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    

     
    const navigate = useNavigate();
    //this signUp in below line is accessible via useUserAuth() in UseAuthContext.js file
    const {signUp} = useUserAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");
        try {
         
        if(password === confirmpassword) 
        {
          await signUp(email, password); 
          updateProfile(auth.currentUser, {
            displayName: username,
          })  
          
          
          const Obj={username,email,password,confirmpassword};
          await setDoc(doc(db, "user", username), Obj);
          localStorage.setItem("signupId",username);
          navigate('/');
        }
        
        
        else
        {
          setError("Passwords do not Match");
        }



        } catch (err) {
        setError(err.message);
        }
    };

  return (
    <div>
      <div className="p-4 rounded vc">
        <h6 className="mb-3">Welcome !</h6>
        <h3>Signup</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control type="name" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email </Form.Label>
            <Form.Control type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        

        <Form.Group className="mb-3" controlId="formBasicPassword">
           <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>


        <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" placeholder="Confirm your Password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        </Form.Group>
      

        <div className="d-grid gap-2 mb-4"> <Button variant="dark" type="Submit"> Register</Button> </div>
        </Form>


        <div className='ps-3' style={{ color: 'grey'}}> Already have an account? <Link to="/" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none'}} >Login</Link> </div>
     </div>

     
    </div>
  );
};

export default Signup;

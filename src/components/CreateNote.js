import React,{useState,useEffect} from 'react';
import '../cssfiles/note.css';
import { Form,Button,Alert } from 'react-bootstrap';
import NavbarData from './NavbarData';
import { doc, getDoc, addDoc, collection, updateDoc} from "firebase/firestore";
import { db } from '../firebase';




function CreateNote({id,setNoteId}) {

    const [title,setTitle] = useState("");
    const [message, setMessage] = useState({ error: false, msg: "" });
    const [note,setNote] = useState("");
    
  

    const handleSubmit = async(e) => {
        
       
        e.preventDefault();
        try {

           if(id !== undefined && id !== "")
           {

            const Obj = {title,note};
            const loginUsername = localStorage.getItem("loginUsername");
            await updateDoc(doc(db, `user/${loginUsername}/allnotes/`,id),Obj);       
            setNoteId("");
            setMessage({error: false, msg: 'Updated Successfully!'});
          }

           else
           {
            const Obj = {title,note};
            //const loginId = localStorage.getItem("loginId");
            const loginUsername = localStorage.getItem("loginUsername");
            console.log("loginUsername = ",loginUsername);

            const docRef = doc(db, "user", loginUsername);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              console.log("docRef = ",docSnap.data());
              await addDoc(collection(db,`user/${loginUsername}/allnotes`),Obj);
              setMessage({error: false, msg: 'Added Successfully!'});
            } else {
              console.log("No such document!");
            }   

           }
           
        } catch (err) {   
          setMessage({ error: true, msg: err.message });
          console.log(err.message);
        }
        setTitle("");
        setNote("");
}

const editHandler  =  async() => {
  try {

    console.log("PropsId = ",id);
    const loginUsername = localStorage.getItem("loginUsername");
    const docSnap = await getDoc(doc(db, `user/${loginUsername}/allnotes/`,id));       
    console.log("the doc is ",docSnap.data()); 
    setTitle(docSnap.data().title);
    setNote(docSnap.data().note);
   
  } catch (err) {
    setMessage({ error: true, msg: err.message });
     console.log(err.message);
  }
}
 
useEffect(() => {
  console.log("the id = ",id);
  if(id !== undefined  &&  id !== "")
  {
    editHandler();
  }
},[id])


const loginUsername = localStorage.getItem("loginUsername");


  return (
    <div>
       <NavbarData/>
    <div className='q'>
       <h1 className='m-4'>Hello, {loginUsername}</h1>
      <div className="p-4 rounded vc">
        {message?.msg && (<Alert variant={message?.error ? "danger" : "success"}  dismissible onClose={() => setMessage("")}>{message?.msg} </Alert> )}
            <Form onSubmit={handleSubmit}>


              
              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Control type="text" placeholder="Title" required  autoComplete='off' value={title} onChange={(e) => setTitle(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicNote">
                <Form.Control type="text" as="textarea" required rows={3} autoComplete='off' placeholder="Write a Note..."  value={note} onChange={(e) => setNote(e.target.value)}/>
              </Form.Group>
             
              <div className='button-right'>
                 <Button variant='success' type='submit'>Add/Update</Button> &nbsp; 
                </div>
            </Form>

       </div>
       </div> 
       </div>
  )
}

export default CreateNote
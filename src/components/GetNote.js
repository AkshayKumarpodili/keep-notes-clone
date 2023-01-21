import React,{useState,useEffect} from 'react';
import UserDataService from '../operations/AllOperations';
import { Button } from 'react-bootstrap';
import '../cssfiles/getallnotes.css'
import {AiFillDelete} from "react-icons/ai";
import {BiEdit} from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { BiArchiveIn } from "react-icons/bi";
import { db } from '../firebase';
import { Alert } from 'react-bootstrap';
import { Tooltip, IconButton } from '@mui/material';
import {BsPin} from "react-icons/bs";
import { collection, query, getDocs, doc, getDoc, deleteDoc, addDoc } from "firebase/firestore";
import NavbarData from './NavbarData';

function GetNote({ getNoteId }) {

  const [message, setMessage] = useState({ error: false, msg: "" });
  const [searchTerm,setSearchTerm] = useState("");
  const navigate=useNavigate();


    const [allnotes, setAllNotes] = useState([]);
    useEffect(() => {
      getUsers();
    }, []);
  
    const getUsers = async () => {

      const loginUsername = localStorage.getItem("loginUsername");
      const snapshot = await UserDataService.getAllUsers();
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(data);

      data.map(async(doc) => {

          const q = query(collection(db, `user/${loginUsername}/allnotes`));
          const userDetails = await getDocs(q);
          //console.log(userDetails.docs);
          const userInfo = userDetails.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setAllNotes(userDetails.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          console.log(userInfo);  
      })

    };


    const editHandler = async(id) => {    
      navigate('/addnote');
      getNoteId(id);
    };


    const deleteHandler = async (id) => {
      
      const loginUsername = localStorage.getItem("loginUsername");
      await deleteDoc(doc(db, `user/${loginUsername}/allnotes/`,id));       
      getUsers();

    };

    const deleteTrashHandler = async (id) => { 
      const loginUsername = localStorage.getItem("loginUsername");
      const docSnap = await getDoc(doc(db, `user/${loginUsername}/allnotes/`,id));       
      console.log("the DeletedDoc is ",docSnap.data()); 
      await addDoc(collection(db,`user/${loginUsername}/trash`),docSnap.data());
      deleteHandler(id);
      setMessage({error: false, msg: 'Note Trashed!'});
    };


    const archiveHandler = async(id) => { 
      const loginUsername = localStorage.getItem("loginUsername");
      const docSnap = await getDoc(doc(db, `user/${loginUsername}/allnotes/`,id));       
      console.log("the ArchivedDoc is ",docSnap.data()); 
      await addDoc(collection(db,`user/${loginUsername}/archive`),docSnap.data());
      deleteHandler(id);
      setMessage({error: false, msg: 'Note Archived!'})
      
    };


    const pinHandler = async(id) => { 
      const loginUsername = localStorage.getItem("loginUsername");
      const docSnap = await getDoc(doc(db, `user/${loginUsername}/allnotes/`,id));       
      console.log("the ArchivedDoc is ",docSnap.data()); 
      await addDoc(collection(db,`user/${loginUsername}/pin`),docSnap.data());
      deleteHandler(id);
      setMessage({error: false, msg: 'Note Pinned!'})
    };

  return (
    <div>
      <NavbarData/>
    <div className='notes'>
    <div className='container'>


    <h2 className='text-center p-2 mt-4 text-white bg-success rounded font'>All Your Notes</h2>
              

              <div className='d-flex justify-content-between mt-3'>
                
                <div class="input-group">
                  <div class="form-outline">
                    <input id="search-focus" type="search" placeholder="Search here..." class="form-control" onChange={(event) => {setSearchTerm(event.target.value);}} />
                    
                  </div>
                  
                </div>
                
               
  
              </div>
       
     
      <Button variant="dark edit m-4" onClick={getUsers}>Refresh Page</Button> 
      {message?.msg && (<Alert variant={message?.error ? "danger" : "success"}  dismissible onClose={() => setMessage("")}>{message?.msg} </Alert> )}

      <div className='cards row' >
              {
                  allnotes.filter((val) => {
                    if(searchTerm === ""){
                      return val;
                    }else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                      return val;
                    }
                  }).map((val) =>(
                    <div class="col-sm-6 col-md-4 mt-2 ">
                      <div key={val.id} className='card shadow h-100 zoom21'>
                      <div className="card-body w-75">
                        <h3 className='ofont1 text-center'>{val.title}</h3>
                        <div className="ofont1 d-flex m-4 w-75">
                            <div> {val.note}</div>
                        </div>

                        <div className='button-start'>
                           
                          <Tooltip title='delete'>
                            <IconButton>
                            <AiFillDelete className='fs-2' onClick={() => deleteTrashHandler(val.id)} />
                            </IconButton>
                        </Tooltip>


                        <Tooltip title='Edit'>
                            <IconButton>
                            <BiEdit className='fs-2' onClick={() => editHandler(val.id)} />
                            </IconButton>
                        </Tooltip>


                        <Tooltip title='Archive'>
                            <IconButton>
                            <BiArchiveIn className='fs-2' onClick={() => archiveHandler(val.id)}/> 
                            </IconButton>
                        </Tooltip>


                        <Tooltip title='Pin Note'>
                            <IconButton>
                            <BsPin className='fs-2' onClick={() => pinHandler(val.id)}/> 
                            </IconButton>
                        </Tooltip>

                      </div>
                      </div>
                      </div>
                    </div>
                  ))
              } 
              </div>

    </div>
    </div>    
    </div>
  )
}

export default GetNote
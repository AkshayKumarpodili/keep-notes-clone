import React,{useState,useEffect} from 'react';
import { BsFillTrashFill} from "react-icons/bs";
import {AiFillDelete} from "react-icons/ai";
import { Button } from 'react-bootstrap';
import { collection, query, getDocs, doc, getDoc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from '../firebase';
import { Alert } from 'react-bootstrap';
import { Tooltip, IconButton } from '@mui/material';
import NavbarData from './NavbarData';
import Loader from './Loader';


function TrashData() {
  
  const [allnotes, setAllNotes] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ error: false, msg: "" });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {

        setIsLoading(true);
        const loginUsername = localStorage.getItem("loginUsername");
        const q = query(collection(db, `user/${loginUsername}/trash`));
        const userDetails = await getDocs(q);
        //console.log(userDetails.docs);
        //const userInfo = userDetails.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setAllNotes(userDetails.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        //console.log(userInfo);
        setIsLoading(false);  
    
  
  };

  const deleteHandler = async (id) => {

    const loginUsername = localStorage.getItem("loginUsername");
    await deleteDoc(doc(db, `user/${loginUsername}/trash/`,id));
    setMessage({error: false, msg: 'Note Deleted!'})       
    getUsers();
  };


  const deleterecoverHandler = async (id) => {

    const loginUsername = localStorage.getItem("loginUsername");
    await deleteDoc(doc(db, `user/${loginUsername}/trash/`,id));       
    getUsers();

  };


 
  const RecoverHandler = async(id) => {

    const loginUsername = localStorage.getItem("loginUsername");
    const docSnap = await getDoc(doc(db, `user/${loginUsername}/trash/`,id));       
    console.log("the RecoverDoc is ",docSnap.data()); 
    await addDoc(collection(db,`user/${loginUsername}/archive`),docSnap.data());
    setMessage({error: false, msg: 'Note Recovered!'})
    deleterecoverHandler(id);
    
  };



  return (
    <div><NavbarData/>
    <div className='notes'>
    <div className='container'>

         <h2 className='text-center p-2 mt-4 text-white bg-success rounded font'>Trash Notes</h2>
              
              <div className='d-flex justify-content-between mt-3'>
                <div class="input-group">
                  <div class="form-outline">
                  <input id="search-focus" type="search"  placeholder="Search here..." className="form-control" onChange={(event) => {setSearchTerm(event.target.value);}} />        
                  </div>
                </div>
              </div>

   
      <Button variant="dark edit m-4" onClick={getUsers}>Refresh Page</Button> 

      {isloading ? (
            <div><Loader/></div> 

      ) :  (

          <>
                {message?.msg && (<Alert variant={message?.error ? "danger" : "success"}  dismissible onClose={() => setMessage("")}>{message?.msg} </Alert> )}

                      {allnotes.length !== 0 ? (
                          <>
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
                                                          
                                                          <Tooltip title='Delete forever'>
                                                          <IconButton>
                                                              <AiFillDelete className='fs-2' onClick={() => deleteHandler(val.id)}/>
                                                          </IconButton>
                                                      </Tooltip>
                                                      
                                                        <Tooltip title='Restore'>
                                                          <IconButton>
                                                              <BsFillTrashFill className='fs-2' onClick={() => RecoverHandler(val.id)}/> 
                                                          </IconButton>
                                                      </Tooltip>
                                                          
                                                          </div>
                                                          
                                                      </div>
                                                    </div>
                                                  </div>
                                                ))
                                            } 
                                            </div>
                          </>


                      ) : (

                        <h3 className="text-center p-3 mt-5">No notes trashed yet!!</h3>

                      )}
                                    
          </>

      )}   
      
    </div>
    </div>
    </div>
  )
}

export default TrashData
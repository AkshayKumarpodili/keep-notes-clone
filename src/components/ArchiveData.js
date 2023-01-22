import React,{useEffect,useState} from 'react';
import { Button } from 'react-bootstrap';
import {AiFillDelete} from "react-icons/ai";
import { db } from '../firebase';
import { Alert } from 'react-bootstrap';
import { BiArchiveOut } from "react-icons/bi";
import { IconButton,Tooltip } from '@mui/material';
import { collection, query, getDocs, doc, getDoc, deleteDoc, addDoc } from "firebase/firestore";
import NavbarData from './NavbarData';
import Loader from './Loader';
 
function ArchiveData() {

  
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
        const q = query(collection(db, `user/${loginUsername}/archive`));
        const userDetails = await getDocs(q);
        //console.log(userDetails.docs);
        setAllNotes(userDetails.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        //console.log(userInfo);
        setIsLoading(false);  
    
  
  };

  
  const deleteHandler = async (id) => {

    const loginUsername = localStorage.getItem("loginUsername");
    await deleteDoc(doc(db, `user/${loginUsername}/archive/`,id));       
    getUsers();

  };


  const deleteTrashHandler = async (id) => {

    const loginUsername = localStorage.getItem("loginUsername");
    const docSnap = await getDoc(doc(db, `user/${loginUsername}/archive/`,id));       
    console.log("the ArchiveDeletedDoc is ",docSnap.data()); 
    await addDoc(collection(db,`user/${loginUsername}/trash`),docSnap.data());
    deleteHandler(id);
    setMessage({error: false, msg: 'Note Trashed!'});
  };

 
  const unarchiveHandler = async(id) => { 
    const loginUsername = localStorage.getItem("loginUsername");
      const docSnap = await getDoc(doc(db, `user/${loginUsername}/archive/`,id));       
      console.log("the UnarchivedDoc is ",docSnap.data()); 
      await addDoc(collection(db,`user/${loginUsername}/allnotes`),docSnap.data());
      deleteHandler(id);
      setMessage({error: false, msg: 'Note Unarchived!'});
    
  };

  return (

    <div>
      <NavbarData/>
    <div className='notes'>
    <div className='container'>


         <h2 className='text-center p-2 mt-4 text-white bg-success rounded font'>Archived Notes</h2>
              
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
                                                  <AiFillDelete className='fs-2' onClick={() => deleteTrashHandler(val.id)}/>
                                              </IconButton>
                                          </Tooltip>
                                          
                                            <Tooltip title='UnArchive'>
                                              <IconButton>
                                                  <BiArchiveOut className='fs-2' onClick={() => unarchiveHandler(val.id)}/>
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
         )}
      

    </div>
    </div>
    </div>

  )
}

export default ArchiveData
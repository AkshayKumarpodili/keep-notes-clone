import CreateNote from './components/CreateNote';
import GetNote from './components/GetNote';
import { Routes,Route } from 'react-router-dom';
import { useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import ArchiveData from './components/ArchiveData';
import TrashData from './components/TrashData';
import PinnedData from './components/PinnedData';
import { UserAuthContextProvider } from './context/UserAuthContext';
import DefaultPage from './components/DefaultPage';
import DefaultSignupPage from './components/signupdefault';


function App() {
  const [noteid,setNoteId] = useState("");
  const getNoteHandler = (id) => {
    //console.log(id);
    setNoteId(id);
  }
  return (
    <div>
     {/* <h1 className='p-4 box rounded'>Welcome to Keep Note</h1> */}
      <UserAuthContextProvider>    
      <Routes>
          <Route path="/allnotes" element={<GetNote getNoteId={getNoteHandler}/>} />
          <Route path="/archivedata" element={<ArchiveData/>} />
          <Route path="/addnote" element={<ProtectedRoute><CreateNote id={noteid} setNoteId={setNoteId}/>  </ProtectedRoute>} />
          <Route path="/trash" element={<TrashData/>} />
          <Route path="/pinned" element={<PinnedData/>} />
          <Route path='/' element={<DefaultPage/>}/>
          <Route path='/signup' element={<DefaultSignupPage/>}/>
       </Routes>  
       </UserAuthContextProvider>    
    </div>
  );
}

export default App;

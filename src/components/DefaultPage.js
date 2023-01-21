import React from 'react';
import Login from './Login';
import loginsvg from '../images/3.svg';
import '../cssfiles/defaultpage.css';


function DefaultPage() {

 
  return (
    <div className='d-flex justify-content-between '>      
      <div className='qwer '>
          <div>
            <div className='row '>
              <Login />
            </div>
          </div>
        </div>
        <img className="er" src={loginsvg} alt='login'/>
    </div>
)}

export default DefaultPage;
import React from 'react';
import loginsvg from '../images/3.svg';
import '../cssfiles/defaultpage.css';
import Signup from './Signup';


function DefaultSignupPage() {

 
  return (
    <div className='d-flex justify-content-between '>
     
      
      <div className='qwer '>
          

          <div>
            <div className='row '>
              <Signup />
            </div>
              
          </div>
        </div>
        <img className="er" src={loginsvg} alt='signup'/>
    </div>
)}

export default DefaultSignupPage;
// Success route handler in your frontend application
import React, { useContext, useEffect } from 'react';
import {  useLocation} from 'react-router-dom';
import { UserContext } from './Context Api/UserAuthContext';
import { Button } from '@mui/material';

const PaymentSuccess = () => {
  const { setisHeaderFooter} = useContext(UserContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');


  useEffect(() => {
    setisHeaderFooter(false);

    // Handle the session_id if needed
    console.log('Payment successful with session ID:', sessionId);
  }, [sessionId]);

  const handleGoHome = () => {
    window.location.href = "/"
  };

  return (
    <div className='d-flex flex-column justify-content-center align-items-center  mt-4 p-5' style={{width:'50%', margin:'auto', borderRadius:"30px", backgroundColor:"ButtonShadow"}}>
      <h3>Payment Successful!</h3>
      <p>Your payment was processed successfully. Thank you for your purchase.</p>
      <Button onClick={handleGoHome} variant='contained' className='' >Go Back Home Page</Button>
    </div>
  );
};

export default PaymentSuccess;

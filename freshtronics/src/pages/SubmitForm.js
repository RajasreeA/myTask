import { Button, Divider } from '@mui/material';
import React from 'react';
import { FaBell, FaGooglePlay } from 'react-icons/fa';
import check from "../assets/check.svg"

export const SubmitForm = () => {
  return (
    <>
        <div className="container d-flex justify-content-center" style={{marginTop:"5rem",fontFamily:"Varela Round",fontSize:"20px"}}>
        <div className="row">
          <div className="col-md-12">
          <img src={check} style={{marginLeft:"5rem"}}/>
            <p className="text-center">           
              Thank you for signing up!
              <br/>
              Your website will be ready in 7 minutes.
              <br/>
              Download the
<span style={{color:"rgb(77, 99, 221)",fontWeight:"700",cursor:"pointer"}}>  Paperplane Clinic App</span> to proceed.
              <br/>
              <FaBell color="goldenrod"/>We'll notify you on <span style={{fontWeight:"700"}}>WhatsApp</span> once the website is ready.
            </p>
          </div>
        </div>       
      </div>
      <Divider className='mb-2'/>
      <div className='text-center'>
      <Button
           variant="contained"
          // className=" mdb-btn-raised mdb-btn-block"
          style={{textTransform:"none",borderRadius:"3rem"}}
          startIcon={<FaGooglePlay/>}
        >
          Go to Paperplane Clinic App
        </Button>
      </div>
    
    </>
  );
};

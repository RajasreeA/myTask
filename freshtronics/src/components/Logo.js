import React from 'react';
import logo from "../assets/Logo.png"
import {
    MDBCol,
   
  } from "mdb-react-ui-kit";

function Logo() {
  return (
    <MDBCol md="12" className="text-center p-3">
    <img src={logo} 
    style={{
        width:"230px",
    }}
    />
    </MDBCol>
  )
}

export default Logo
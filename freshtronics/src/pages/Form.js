import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBContainer,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import { options } from "../assets/Data";
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';
import SimpleBackdrop from "../components/loader";


export default function Form() {
  const [formValue, setFormValue] = useState({
    name: "",
    specialization: "",
    medicalqualification: "",
    staff: "",
    experience:"",
    instagram: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    variant: "success",
  });
  const [loading,setLoading]=useState(false);
  const handleSnackbarClose = () => {
    setSnackbar({
      open: false,
      message: "",
      // variant: "success",
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
    console.log(formValue);
  };
  const navigate = useNavigate();
  const renderSnackbar = () => {
    if (snackbar.open) {
      return (
        <MDBRow>
          <MDBCol md="12">
            <Snackbar
              style={{ marginLeft: "50%", transform: "translateX(-50%)", maxWidth: "95vw" }}
              open={snackbar.open}
              autoHideDuration={1000}
              onClose={handleSnackbarClose}
            >
              <Alert
                severity={snackbar.variant}
                onClose={handleSnackbarClose}
                sx={{ width: "100%", borderRadius: "5rem" }}
              >
                {snackbar.message}
              </Alert>
            </Snackbar>
          </MDBCol>
        </MDBRow>
      );
    }
    return null;
  };
  const renderLoader = () => {
    if (loading) {
      return <SimpleBackdrop open={loading}/>;
    }
    return null;
  };
  const handleNext = () => {
    const requiredFields = ["name", "specialization", "qualification", "experience"];
    const msg=[];
    const isValid = requiredFields.every((field) => formValue[field]!="");
    if (!isValid) {
      const errors = requiredFields.filter((field) => formValue[field] === "");
      const errorMsgs = errors.find((field) => field);
      if(errorMsgs=="name"){
        msg.push("Please enter name");
      }
      else if(errorMsgs=="specialization"){
        msg.push("Please enter specialization")
      }
      else if(errorMsgs=="qualification"){
        msg.push("Please enter medical qualification")
      }
      else if(errorMsgs=="experience"){
        msg.push("Please enter how many years of experience do you have ")
      }
      setSnackbar({
        open: true,
        message:msg,
        variant: "error",
      });
      return;
    }
    const formValues = { ...formValue };
    localStorage.setItem("formValues", JSON.stringify(formValues));

      
    
    const navigateToNextPage = () => {
      navigate("/form-next",{
        state:{
          name:formValue.name
        }
      });
    };
  setLoading(true);
    setTimeout(() => {
      navigateToNextPage();
    }, 3000);
  };
  const getFormValuesFromLocalStorage = () => {
    const formValues = localStorage.getItem("formValues");
    if (formValues) {
      const formValueFromJson = JSON.parse(formValues);
      setFormValue(formValueFromJson);
    }
  };
  
  useEffect(() => {
    getFormValuesFromLocalStorage();
  }, []);
  
  

  return (
    <>
    <MDBContainer style={{ fontFamily: "Varela Round", fontSize: "18px",color:" #6A6488" }}>
      <Logo />
      <MDBCard className="my-4 p-5" style={{ backgroundColor: "ghostwhite",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"  }}>
        <MDBRow className="g-3 justify-content-center">
          <MDBCol md="5">
            <label className="m-1">Name</label>
            <input
              value={formValue.name}
              name="name"
              onChange={handleChange}
              class="form-control form-rounded  p-2"
            />
             <span className="m-2" style={{fontSize:"15px"}}>Enter your name withour Dr.</span>
          </MDBCol>
          <MDBCol md="5">
            <label className="m-1">Specialization</label>
            <select
              id="specialization"
              value={formValue.specialization}
              name="specialization"
              onChange={handleChange}
              class="form-control form-rounded mb-4 p-2 md-4"
              style={{ padding: '8px' }} 
            >
              {options.map(({ label, value }) => (
                <option value={value}  style={{ padding: '8rem' }}>
                  {label}
                </option>
              ))}
            </select>
          </MDBCol>
          <MDBCol md="10" className="justify-content-center">
            <label className="m-1">Medical qualifications</label>
            <input
              type="text"
              class="form-control form-rounded  p-2 md-4"
              name="qualification"
              value={formValue.qualification}
              onChange={handleChange}
              placeholder="eg.MBBS"
            />
            <span className="m-2" style={{fontSize:"15px"}}>Enter medical degrees separated by commas</span>
          </MDBCol>
          
          <MDBCol md="10" className="justify-content-center">
            <label className="m-1">
              Do you have staff/help to manage clinic(s) ?
              <span style={{ fontSize: "1rem" }}>(Optional)</span>
            </label>
            <input
              type="text"
              class="form-control form-rounded mb-4 p-2 md-4"
              name="staff"
              value={formValue.staff}
              onChange={handleChange}
              placeholder="eg.2"
            />
          </MDBCol>
          <MDBCol md="10" className="justify-content-center">
            <label className="m-1">How many years of experience do you have ?</label>
            <input
              type="number"
              name="experience"
              class="form-control form-rounded mb-4 p-2 md-4"
              value={formValue.experience}
              onChange={handleChange}
              placeholder="eg.5"
            />
          </MDBCol>
          <MDBCol md="10" className="justify-content-center">
            <label className="m-1">Instagram Username (Optional)</label>
            <MDBInputGroup textBefore="@">
            <input
              type="text"
              class="form-control form-rounded mb-4 p-2 md-4"
              value={formValue.instagram}
              name="instagram"
              onChange={handleChange}
              placeholder="eg.paperplanetech"
            />
            </MDBInputGroup>
           
          </MDBCol>

          <MDBCol size="12" className="text-center">
            <MDBBtn rounded style={{textTransform:"none",fontSize:"1rem"}} className="mdb-btn-raised mdb-btn-block" type="submit" onClick={handleNext}>
              Save & Continue
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
    {renderLoader()}
    <MDBContainer>
      {renderSnackbar()}

      </MDBContainer>
    </>
  );
}

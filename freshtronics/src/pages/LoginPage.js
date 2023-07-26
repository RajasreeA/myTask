import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LoginImage from "../assets/loginImage.svg";
import otpImage from "../assets/otpImage.svg";
import "../assets/login.css";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { FaPencilAlt, FaWhatsapp } from "react-icons/fa";
import { sendOTP } from "../utils/whatsapp";
import createAccount from "../assets/otp.svg";
import OtpTextBox from "../components/OtpTextBox"; // Import the OtpTextBox component
import { useDispatch, useSelector } from "react-redux";
import { sendOTPAsync } from "../redux/ActionTypes";
import SimpleBackdrop from "../components/loader";

function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpPage, setShowOtpPage] = useState(false);
  const navigate = useNavigate();
  const randomNumber = Math.floor(Math.random() * 10000) + 1;
  const OTP = randomNumber.toString();
  const [generateOTP, setgenerateOTP] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    variant: "success",
  });
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [loading,setLoading]=useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "phone") {
      setPhone(value);
    } else {
      setOtp(value);
    }
  };

  const validatePhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };
  useEffect(() => {
    const storedShowOtpPage = localStorage.getItem("showOtpPage");
    const number = localStorage.getItem("phoneNumber");
    setPhone(number);
    setShowOtpPage(storedShowOtpPage === "true");
  }, []);
  const updateShowOtpPage = (newValue) => {
    localStorage.setItem("showOtpPage", newValue);
    setShowOtpPage(newValue);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validatePhone(phone)) {
      setSnackbar({
        open: true,
        message: "Please enter a valid phone  number",
        variant: "error",
      });
    } else {
      dispatch(sendOTPAsync(phone, OTP));
      localStorage.setItem("phoneNumber", phone);
      setLoading(true);
      setTimeout(() => {
      setShowOtpPage(true);
      },3000);
      updateShowOtpPage(true);
      setgenerateOTP(OTP);
      setSnackbar({
        open: true,
        message: "OTP sent successfully!",
        variant: "success",
      });
    }
  };
  const handleResendOtp = (event) => {
    event.preventDefault();
    sendOTP(phone, otp);
    setgenerateOTP(OTP);
  };
  const handleSnackbarClose = () => {
    setSnackbar({
      open: false,
      message: "",
    });
  };
  const handleEdit = () => {
    setShowOtpPage(false);
  };
  const handleNext = () => {
    if (otp === generateOTP) {
      // Navigate to the next page
      localStorage.clear();
      setLoading(true);
      setTimeout(()=>{
        navigate("/form");
      },3000)
     
    } else {
      // Show snackbar message
      setSnackbar({
        open: true,
        message: "Incorrect OTP",
        variant: "error",
      });
    }
  };
  const renderSnackbar = () => {
    if (snackbar.open) {
      return (
        <MDBContainer className="my-3">
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
      </MDBContainer>
      );
    }
    return null;
  };

  const renderOtpPage = () => {
    if(loading && !otp) {
      setLoading(false);

    }
    return (
      <MDBCol md="7">
      <MDBCardBody>
        <MDBCol md="12" className="text-center">
          <h4 className="mt-1 mb-4 pb-1">Create an account</h4>
          <img
            src={otpImage}
            style={{ width: "183px" }}
            alt="logo"
          />
        </MDBCol>
        <h5 className="text-center">
          OTP sent to +91-{phone}
        <FaPencilAlt
              color="rgb(77, 99, 221)"
              style={{ cursor: "pointer" }}
              onClick={handleEdit}
            />{" "}
            <br />
            on Whatsapp
            <FaWhatsapp color="green" />
          </h5>
          <OtpTextBox value={otp} onChange={(value) => setOtp(value)} />
          <MDBCol md="8" className="text-center mb-1">
          <a className="m-2" style={{ cursor: "pointer"}} onClick={handleResendOtp}>
            Resend
          </a>
          </MDBCol>
        <MDBCol md="12" className="text-center">
        <MDBBtn rounded className="w-80" style={{textTransform:"none",fontSize:"16px"}} onClick={handleNext}>
             Verify OTP
         </MDBBtn>
        </MDBCol>
      </MDBCardBody>
    </MDBCol>
    );
  };
  const renderLoader = () => {
    if (loading) {
      return <SimpleBackdrop open={loading}/>;
    }
    return null;
  };

  return (
    <>
      <MDBContainer className="my-5 mx-7">
        <Logo />
        <MDBCard
          style={{
            backgroundColor: "ghostwhite",
            boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <MDBRow className="g-0 d-flex align-items-center">
            <MDBCol md="4">
              <MDBCardImage
                src={LoginImage}
                alt="phone"
                className="rounded-t-5 p-2 m-1 pr-10 rounded-tr-lg-0"
                fluid
              />
            </MDBCol>
            {!showOtpPage ? (
              <>
              
                <MDBCol md="7">
                  <MDBCardBody>
                    <MDBCol md="12" className="text-center">
                      <h4 className="mt-1 mb-4 pb-1" style={{
                        // marginLeft:"15rem"
                        }}>Create an account</h4>
                      <img
                        src={createAccount}
                        style={{ width: "183px",
                        // marginLeft:"15rem" 
                      }}
                        alt="logo"
                      />
                    </MDBCol>

                    <h4 className="label">Phone number</h4>
                    <MDBInputGroup className="form-rounded" textBefore='+91-' style={{border:"none"}}>
                    <input
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={handleChange}
                      className="form-control form-rounded mb-4 p-2 md-4"
                    />
      </MDBInputGroup>
                    
                    <MDBCol md="12" className="text-center">
                      <MDBBtn rounded className="w-80" style={{textTransform:"none",fontSize:"14px"}} onClick={handleSubmit}>
                        Send OTP
                      </MDBBtn>
                    </MDBCol>
                  </MDBCardBody>
                </MDBCol>
              </>
            ) : (
              <>{renderOtpPage()}</>
            )}
          </MDBRow>
        </MDBCard>
      </MDBContainer>
      {renderLoader()}
      <MDBContainer>{renderSnackbar()}</MDBContainer>
    </>
  );
}

export default LoginPage;

import React, { useEffect, useState } from "react";
import {
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBContainer,
  MDBIcon,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Colors } from "../components/loader";
import { Button, Divider } from "@mui/material";
import { buttonValues } from "../assets/Data";
import { data } from "../assets/Data";
import { colors } from "../assets/Data";
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { BsCheckCircle } from "react-icons/bs";
import BasicAccordion from "../components/Accordion";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
// import Backdrop from "@mui/material";
import "../assets/Image.css";
import SimpleBackdrop from "../components/loader";

export default function FormNext() {
  const location = useLocation();
  const {state:{name}}=location;
  const [formValue, setFormValue] = useState({
    about: "",
    clinic: "",
    color: "",
    location: "",
    domain: "",
  });
  const [loading,setLoading]=useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const[userName,setUserName]=useState("");
  const [selectedColor, setSelectedColor] = React.useState("");

  const navigate = useNavigate();
  const handleBack = () => {
    const formValues = { ...formValue };
    localStorage.setItem("formNext", JSON.stringify(formValues));
    navigate(-1);
  };
  const handleChange = (event, index, item, field) => {
    // console.log(field=="color");
    if (field != "image" && field != "color") {
      const { name, value } = event.target;
      setFormValue({ ...formValue, [name]: value });
    } else if (field == "color") {
      const checked = colors[index];
      setSelectedColor(checked);
      setFormValue({ ...formValue, color: checked });
    } else {
      console.log(item, "image selected");
      const newSelectedImage = data[index];
      setSelectedImage(newSelectedImage);
      setFormValue({ ...formValue, clinic: item });
    }
  };
  console.log(formValue);
  const boxes = colors.map((color, index) => (
    <div
      key={index}
      style={{
        backgroundColor: color,
        borderRadius: "1rem",
        width: 120,
        height: 100,
        margin: 10,
        cursor: "pointer",
      }}
      onClick={(event) => handleChange(event, index, color, "color")}
    >
      {selectedColor == color && (
        <BsCheckCircle
          icon="check"
          size="3rem"
          style={{ margin: "1.9rem" }}
          color="white"
        />
      )}
    </div>
  ));
 
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    variant: "success",
  });
  const handleSnackbarClose = () => {
    setSnackbar({
      open: false,
      message: "",
    });
  };
  
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

  const handleSubmit = () => {
    const requiredFields = ["about", "clinic", "color", "domain"];
    const msg=[];
    const isValid = requiredFields.every((field) => formValue[field] != "");
    if (!isValid) {
      const errors = requiredFields.filter((field) => formValue[field] === "");
      const errorMsgs = errors.find((field) => field);

      if(errorMsgs=="about"){
        msg.push("Please tell us about yourself");
      }
      else if(errorMsgs=="clinic"){
        msg.push("Choose a clinic that you like")
      }
      else if(errorMsgs=="color"){
        msg.push("choose a color for your website")
      }
      else if(errorMsgs=="domain"){
        msg.push("choose a domain for your website");
        
      }

     
      setSnackbar({
        open: true,
        message:msg,
        variant: "error",
      });
      return;
    }
    const formValues = { ...formValue };
    localStorage.setItem("formNext", JSON.stringify(formValues));
    setLoading(true);
    setTimeout(() => {
    navigate("/submit-form");
    },3000);
  };
  const getFormValuesFromLocalStorage = () => {
    const formValues = localStorage.getItem("formNext");
    const user=JSON.parse(localStorage.getItem("formValues")).name;
    if (formValues) {
      const formValueFromJson = JSON.parse(formValues);
      setFormValue(formValueFromJson);
      setSelectedImage(formValueFromJson.clinic);
      setSelectedColor(formValueFromJson.color);
      setUserName(user);
    }
  };
  const renderLoader = () => {
    if (loading) {
      return <SimpleBackdrop open={loading}/>;
    }
    return null;
  };

  useEffect(() => {
    getFormValuesFromLocalStorage();
    setUserName(name);
  }, []);

  const buttonValues=[
    {
     label:"I, (Dr."+userName+") have been...",
     value: "I, (Dr."+userName+") have been practicing medicine for 2+ years, I've had the privilege of helping more than 500 people, and I hope I can keep assisting people in need. Don't hesitate to reach out for any help! Here's the link to my digital clinic, you can also reach out to me via WhatsApp by clicking the button above.",
    },{
    label:"Hey! This is Dr."+userName+"...",
    value: "Hey! This is Dr."+ userName+". I have practiced medicine for 2+ years. 500+ happy patients so far. Here's the link to my digital clinic, you can also reach out to me via WhatsApp by clicking the button above.",
 }];

  return (
    <>
      <MDBContainer style={{ fontFamily: "Varela Round", fontSize: "20px" }}>
        <Logo />
        <MDBCard
          className=" mx-4"
          style={{
            backgroundColor: "ghostwhite",
            boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <MDBRow className="g-3 m-5 justify-content-center">
            <MDBCol md="10">
              <label className="m-2">Tell us about yourself</label>
              <textarea
                type="text"
                style={{ height: "5rem" }}
                value={formValue.about}
                maxLength={120}
                name="about"
                onChange={handleChange}
                class="form-control form-rounded   md-4"
              />
              <span className="m-2" style={{ fontSize: "14px",fontFamily:"Varela Round" }}>
                This helps patients learn more about you (max 120 words)
              </span>
              <div className="m-1" style={{ fontSize: "14px",fontFamily:"Varela Round" }}>
                Choose from our exisitng templates:
              </div>
            </MDBCol>

            <MDBCol md="10">
              {buttonValues.map(({ label, value }) => (
                <p>
                  <button
                    type="button"
                    style={{ textTransform: "none", fontSize: "16px" }}
                    class="btn btn-outline-primary form-rounded"
                    name="about"
                    value={value}
                    data-mdb-ripple-color="dark"
                    onClick={handleChange}
                  >
                    {label}
                  </button>
                </p>
              ))}
            </MDBCol>
            <MDBCol md="10" className="justify-content-center">
              <label className="m-2">Choose a logo for you clinic</label>
              <div className="m-2" style={{ fontSize: "18px", wordSpacing: "3px" }}>
                This represents your clinic brand, builds trust with patients
                and will be present on your WhatsApp <br />
                Clinic and E-Rx.
              </div>
              <div className="m-2">
              <div style={{ maxWidth: "100%" }}>
  <ImageList
    style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px" }}
  >
    {data.map((item, index) => (
      <ImageListItem key={item} className="m-2" id={index}>
        <img
          src={item}
          srcSet={item}
          name="clinic"
          value={item}
          loading="lazy"
          style={{
            backgroundColor: "white",
            boxShadow: "1px 1px 2px 2px whitesmoke",
            cursor: "pointer",
            outline: selectedImage === item ? "5px dashed blue" : "",
            width: "100%", // Ensure the image takes the full width of its container
          }}
          className="p-2"
          onClick={(event) => handleChange(event, index, item, "image")}
        />
      </ImageListItem>
    ))}
  </ImageList>
</div>
                <Divider />
              </div>
            </MDBCol>
            <MDBCol md="10" className="justify-content-center">
              <label className="m-2">What colour do you prefer?</label>
              <div className="m-2" style={{ fontSize: "18px", wordSpacing: "2px" }}>
                We use it to theme your website
              </div>
              <div className="m-2" 

              >
                <div
    style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px,1fr))", gap: "9.5px" }}

                >{boxes}</div>
              </div>
            </MDBCol>
            <MDBCol md="6" >
              <label className="m-2">
                Location Link{" "}
                <span style={{ fontSize: "1rem" }}>(optional)</span>
              </label>
              <input
                type="text"
                class="form-control form-rounded p-1 md-4"
                name="location"
                value={formValue.location}
                onChange={handleChange}
                placeholder="https://"
              />
              <BasicAccordion />
            </MDBCol>
            <MDBCol md="4">
              <label className="m-2">Choose your domain</label>
              <MDBInputGroup textAfter=".paperclane.health" style={{padding:"none"}}>
              <input
                type="text"
                class="form-control form-rounded w-80"
                name="domain"
                value={formValue.domain}
                onChange={handleChange}
                placeholder="eg.arunCardioCare"
              />
              </MDBInputGroup>
             
              <div className="mb-2" style={{ fontSize: "14px",fontFamily:"Varela Round" }}>
                This should be connected to your clinic name
                <br />
                Don't worry you can always change it later!
              </div>
            </MDBCol>
            <Divider />
            <MDBCol size="12" className="text-center md-2">
              <MDBBtn
                rounded
                style={{ textTransform: "none", fontSize: "16px" }}
                onClick={handleSubmit}
              >
                Submit&nbsp;
                <FaAngleDoubleRight size={"1.5rem"} />
              </MDBBtn>
            </MDBCol>
            <MDBCol size="12" className="text-center">
              <Button
                variant="outlined"
                style={{
                  textTransform: "none",
                  fontSize: "16px",
                  borderRadius: "3rem",
                }}
                onClick={handleBack}
              >
                <FaAngleDoubleLeft size={"1.5rem"} />
                Back
              </Button>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
      {renderLoader()}
      <MDBContainer>{renderSnackbar()}</MDBContainer>
    </>
  );
}

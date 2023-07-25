import first from "../assets/firstImage.png";
import second from "../assets/secondImage.png";
import third from "../assets/thirdImage.png";
import four from "../assets/fourth.png";
import five from "../assets/fifth.png";
import six from "../assets/sixth.png"
import seven from "../assets/seventh.png";
import eight from "../assets/eighth.png";
import nine from "../assets/ninth.png"
import ten from "../assets/tenth.png";
import eleven from "../assets/eleveth.png";
import twelve from "../assets/twelfth.png";
import thirteen from "../assets/thirtenth.png";
import fourteen from "../assets/fourtenth.png";
const userName="Rajasree";
const name=localStorage.getItem("formValues")
console.log(name,"username");


export const options = [
  // {
  //   label: "",
  //   value: "",
  // },
    {
      label: "Anesthia",
      value: "Anesthia",
    },
    {
      label: "Gynaecologist",
      value: "Gynaecologist",
    },
    {
      label: "Clinical Psychologist",
      value: "Clinical Psychologist",
    },
    {
      label: "Counselling Psychologist",
      value: "Counselling Psychologist",
    },
    {
      label: "Therapist",
      value: "Therapist",
    },
    {
      label: "Counselor",
      value: "Counselor",
    },
    {
      label: "Psychologist",
      value: "Psychologist",
    },
    {
      label: "Ayurveda",
      value: "Ayurveda",
    },
    {
      label: "Cardiology",
      value: "Cardiology",
    },
    {
      label:"Critical Care",
      value:"Critical Care"
    },
    {
      label:"Dentist",
      value:"Dentist"
    },
    {
      label:"Dermatology",
      value:"Dermatology"
    },
    {
      label:"Diabetology",
      value:"Diabetology"
    },
    {
      label:"General Physician",
      value:"General Physician"
    },
    {
      label:"Endocrinology",
      value:"Endocrinology"
    },
    {
      label:"ENT",
      value:"ENT"
    },
    {
      label:"Family Physician",
      value:"Family Physician"
    },
    {
      label:"Gastrenterology",
      value:"Gastrenterology",

    },
    {
      label:"Hematology",
      value:"Hematology"
    },
    {
      label:"Homeopathy",
      value:"Homeopathy"
    },
    {
      label:"Infection Control",
      value:"Infection Control"
    },
    {
      label:"IVF",
      value:"IVF"
    },
    {
      label:"Nephrology",
      value:"Nephrology"
    },
    {
      label:"Unani",
      value:"Unani"
    },
    {
      label:"Urology",
      value:"Urology"
    }


   

  ];

export const buttonValues=[
    {
     label:"I, (Dr."+userName+") have been...",
     value: "I, (Dr."+userName+") have been practicing medicine for 2+ years, I've had the privilege of helping more than 500 people, and I hope I can keep assisting people in need. Don't hesitate to reach out for any help! Here's the link to my digital clinic, you can also reach out to me via WhatsApp by clicking the button above.",
    },{
    label:"Hey! This is Dr."+userName+"...",
    value: "Hey! This is Dr."+ userName+". I have practiced medicine for 2+ years. 500+ happy patients so far. Here's the link to my digital clinic, you can also reach out to me via WhatsApp by clicking the button above.",
 }];
export const data = [first,second,third,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen];
export const colors = ['rgb(136, 36, 36)', 'rgb(0, 59, 174)', 'rgb(175, 158, 3)', 'rgb(12, 116, 51)'];
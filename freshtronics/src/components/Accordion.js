import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function BasicAccordion() {
  return (
    <div>
      <Accordion style={{backgroundColor:"ghostWhite",boxShadow:"none",fontFamily:"Varela Round"}}>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{fontSize:"14px",fontFamily:"Varela Round"}}>
          This helps patients fontto reach out to you immediately!
          <br/>
          How to get location link from Google Maps?
          <br/>
          Don't worry, you can always add it later.
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{fontSize:"14px",fontFamily:"Varela Round"}}>
          Step1: Go to your clinic location on google maps
          <br/>
          Step2: Click on share and copy the link
          <br/>
          Step3: Paste the link in the box above
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function SimpleBackdrop({open}) {
  const opendrop = React.useState(open);

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={opendrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import Form from './pages/Form';
import FormNext from "./pages/FormNext";
import { SubmitForm } from "./pages/SubmitForm";

const App = () => {
  
  return (
    <div>
       <BrowserRouter>
      <Routes>
      <Route path="/submit-form" element={<SubmitForm/>} />
      <Route path="/form-next" element={<FormNext/>} />
        <Route path="/form"element={<Form/>} />
        <Route path="/" element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
    
       
    </div>
  );
};

export default App;
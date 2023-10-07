import React from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";

import SignupPage from "./SingupPage";
const LoginPage = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginPage/>}/>
  <Route path="signup" element={<SignupPage/>}/>
 
    </Routes>
    <div><p>
        this is the login page</p></div>
  </BrowserRouter>
    
  )
}

export default LoginPage
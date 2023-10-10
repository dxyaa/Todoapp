import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./components/SignupPage";
import LoginPage from './components/LoginPage';
import App from './components/mainpage';
const Application = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage/>} />
          <Route path="mainpage" element={<App />} />

        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default Application
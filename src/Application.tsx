import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./components/SignupPage";
import LoginPage from './components/LoginPage';
import App from './components/mainpage';
import MainPage from './components/mainpage';
import { UserProvider } from './components/usercontexts';
const Application = () => {
  return (
    <div>
      <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage/>} />
          <Route path="mainpage" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
      </UserProvider>
    </div>
  )
}

export default Application
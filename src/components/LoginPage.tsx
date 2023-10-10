import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersData } from './userData';
import { Link } from 'react-router-dom';
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = () => {

    const user = usersData.find(u => u.username === username && u.password === password);

    if (user) {
      navigate('/mainpage', { state: { user } });
    } else {
      alert('Invalid username or password');
    }
  };

  return (

   
      
      <div className='bg_image'>
        <div className="box">
          <form>
            <span className="text-center">login</span>
            <div className="input-container">
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
              <label>User Name</label>
            </div>
            <div className="input-container">
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              <label>Password</label>
            </div>
            <button type="button" className="btn" onClick={handleLogin}>login</button>
          </form>
          <p>
              Dont have an ccount?<br />
              <span className="line">
                <Link to="/signup">Sign Up</Link>
              </span>
            </p>
        </div>
      </div>


  );
};

export default LoginPage

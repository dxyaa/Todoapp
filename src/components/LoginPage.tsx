// loginpage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersData } from './userData';
import { Link } from 'react-router-dom';
import { useUser,User } from './usercontexts';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = () => {

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find((u: User) => u.username === username && u.password === password);

   

    if (user) {
      const userWithId: User = { ...user, id: Date.now() };


      login(userWithId);
      navigate('/mainpage');
    } else {
      alert('Invalid username or password');
    }
  };
  return (
    <div className='bg_image'>
      <div className="box">
        <form>
          <span className="text-center">Login</span>
          <div className="input-container">
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            <label>User Name</label>
          </div>
          <div className="input-container">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <label>Password</label>
          </div>
          <button type="button" className="btn" onClick={handleLogin}>Login</button>
        </form>
        <p>
          Don't have an account?<br />
          <span className="line">
            <Link to="/signup">Sign Up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

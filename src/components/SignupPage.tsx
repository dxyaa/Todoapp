import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";

type User = {
  username: string;
  password: string;
  todos: string[];
};


const SignupPage = () => {
  const userRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const addUserToStorage = (user: User) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("User added to local storage:", user);
  };

  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
  }
  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setValidName(user.length >= 4 && user.length <= 24);
  }, [user]);

  useEffect(() => {
    setValidPwd(pwd.length >= 4 && pwd.length <= 24);
  }, [pwd]);

  useEffect(() => {
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  const handleSignUp = () => {
    if (validName && validPwd && validMatch) {
      const newUser: User = { username: user, password: pwd, todos: [] };
      addUserToStorage(newUser);
      setSuccess(true);
      navigate("/");
    } else {
      setErrMsg("Please fill out the form correctly.");
    }
    console.log("Sign Up button clicked!");
  };
  return (
    <div className="bg_image">
      <div className="box">
        {success ? (
          <section>
            <h1>Success!</h1>
            <p>
              <a href="/">Sign In</a>
            </p>
          </section>
        ) : (
          <section>
            <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
              {errMsg}
            </p>

            <form onSubmit={handleSignUp}>
              <div className="text-center">Register</div>
              <div className="input-container">
                <input
                  type="text"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  aria-invalid={!validName}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <label>Username</label>
                <p
                  id="uidnote"
                  className={userFocus && user && !validName ? "instructions" : "offscreen"}
                >
                  4 to 24 characters.<br />
                  Must begin with a letter.<br />
                </p>
              </div>
              <div className="input-container">
                <input
                  type="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={!validPwd}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <label>Password</label>
                <p
                  id="pwdnote"
                  className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
                >
                  Password must be between 4 to 24 characters.
                </p>
              </div>
              <div className="input-container">
                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={!validMatch}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <label>Confirm Password</label>
                <p
                  id="confirmnote"
                  className={matchFocus && !validMatch ? "instructions" : "offscreen"}
                >
                  Password and Confirm Password must be the same.
                </p>
              </div>
              <button
                className="btn"
                disabled={!validName || !validPwd || !validMatch}
                onClick={handleSignUp}
              >
                Submit
              </button>
            </form>
            <p>
              Already registered?<br />
              <span className="line">
                <Link to="/">Log In</Link>
              </span>
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default SignupPage;



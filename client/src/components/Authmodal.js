import Headerbuttons from "./Headerbuttons";
import Input from "./Input";
import { useState } from "react";

const Authmodal = () => {
  const [modalType, setModalType] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="auth-page">
      <div className="auth-sub">
        {modalType === "login" && <h1>Login</h1>}
        {modalType === "register" && <h1>Register</h1>}
        {modalType === "register" && (
          <label>
            <span>E-mail: </span>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        )}
        <label>
          <span>Username: </span>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <span>Password: </span>

          <Input type="password"  value={password}
              onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <Headerbuttons>
          {modalType === "login" ? "Log in" : "Sign Up"}
        </Headerbuttons>
        {modalType === "login" && (
          <div className="login-state">
            <p className="login-p-1">New to Reddit?</p>
            <button className="btn" onClick={() => setModalType("register")}>
              SIGN UP
            </button>
          </div>
        )}
        {modalType === "register" && (
          <div className="login-state">
            <p className="login-p-1">Already have an account?</p>
            <button className="btn" onClick={() => setModalType("login")}>
              LOG IN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Authmodal;

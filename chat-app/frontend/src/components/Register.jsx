import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import "../css/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(registerUser({ username, email, password }));
    if (!error) {
      navigate("/login");
    }
  };

  return (
    <div className="register">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="formComponent">
        <h2 style={{ textAlign: "center" }}>Register</h2>
        <div className="emailField">
          <b>
            <label>Username</label>
          </b>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="emailField">
          <b>
            <label>Email</label>
          </b>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{marginLeft:"38px"}}
          />
        </div>
        <div className="passwordField">
          <b>
            <label>Password</label>
          </b>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="submitBtn" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <p>
          Already have account. <Link to={"/login"}>Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

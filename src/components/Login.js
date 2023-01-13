import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/user";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/user/login", {
        email: email,
        password: password,
      })
      .then((res) => res.data)
      .then((user) => dispatch(setUser(user)))
      .then((fin) => navigate("/misfavs"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="notification is-info">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">email:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Tu email"
                value={email}
                onChange={handleEmail}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">contraseña:</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Tu contraseña"
                value={password}
                onChange={handlePassword}
              />
            </div>
          </div>
          <div className="control">
            <button className="button is-white">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

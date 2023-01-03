import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewUser() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/newuser", {
        name: name,
        lastName: lastName,
        email: email,
        password: password,
      })
      .then((res) => res.data)
      .then((user) => navigate("/bienvenido"));
  };

  return (
    <div className="container">
      <div className="notification is-primary">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Escribí tu nombre"
                value={name}
                onChange={handleName}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Apellido</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Escribí tu apellido"
                value={lastName}
                onChange={handleLastName}
              />
            </div>
          </div>

          <div cclassName="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="Escribí tu mail"
                value={email}
                onChange={handleEmail}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Contraseña</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Creá una contraseña"
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
}

export default NewUser;

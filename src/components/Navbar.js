//import { useState } from "react";
import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/user";
import { useNavigate } from "react-router";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => {
    return state.user;
  });

  const handleLogout = () => {
    axios
      .post("/api/logout")
      .then((res) => {
        dispatch(setUser({}));
        console.log("logged out");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav className="navbar has-background-info-dark mb-4">
      <div className="navbar-brand">
        <a className="navbar-item" href="http://localhost:3000/">
          <img
            src={
              "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
            }
            alt="logo"
            width="200"
          />
        </a>
      </div>
      <div className="navbar-item navbar-end">
        {user.id ? (
          <div>
            <p className="has-text-white">{user.name}</p>

            <a
              href="http://localhost:3000/misfavs"
              className="button is-rounded"
            >
              <strong>Favoritos</strong>
            </a>
            <button className="button is-rounded" onClick={handleLogout}>
              <strong>Salir</strong>
            </button>
          </div>
        ) : (
          <div>
            <a href="http://localhost:3000/login" className="button is-rounded">
              <strong>Ingresar</strong>
            </a>
            <a
              href="http://localhost:3000/newuser"
              className="button is-rounded"
            >
              <strong>Registrarse</strong>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

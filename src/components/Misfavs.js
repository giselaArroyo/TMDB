import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../commons/Card.js";

const Misfavs = () => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    axios
      .get("/api/fav/misfavs")
      .then((res) => res.data)
      .then((todos) => setFavoritos(todos));
  }, []);

  return (
    <div>
      <div className="container">
        <h2 className="title is-4">Estas son tus pelis favoritas:</h2>
        <div className="columns is-multiline layout">
          {favoritos[0]
            ? favoritos.map((data, i) => (
                <div className="column is-2" key={i}>
                  <Link to={`/${data.type}/${data.idFilm}`}>
                    <Card data={data} />
                  </Link>
                </div>
              ))
            : console.log("Buscado")}
        </div>
      </div>
    </div>
  );
};

export default Misfavs;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../commons/Card.js";
import { useNavigate } from "react-router-dom";

const Misfavs = () => {
  const [favoritos, setFavoritos] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/fav/misfavs")
      .then((res) => res.data)
      .then((todos) => setFavoritos(todos));
  }, []);

  return (
    <div>
      <div className="container">
        <h2 className="title is-4">Estas son tus pelis y series favoritas:</h2>
        <div className="columns is-multiline layout">
          {favoritos[0] ? (
            favoritos.map((data, i) => (
              <div className="column is-2" key={i}>
                <Link to={`/${data.type}/${data.idFilm}`}>
                  <Card data={data} />
                </Link>
              </div>
            ))
          ) : (
            <div>
              <div className="columns">
                <div className="column column is-three-fifths is-offset-one-fifth">
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <p className="has-text-link has-text-centered is-size-4">
                    Todavía no agregaste ninguna película a favoritos.
                  </p>

                  <p className="has-text-link has-text-centered">
                    Volver al home ⇓
                  </p>
                  <br></br>
                  <div className="is-flex is-justify-content-center">
                    <button
                      className="button is-info is-rounded"
                      onClick={() => navigate("/")}
                    >
                      ✨ Descubrí millones de peliculas ✨
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Misfavs;

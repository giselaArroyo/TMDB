import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "../commons/Card.js";

const Resultado = () => {
  const params = useParams();
  const query = params.value;
  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=e8ff6e05340d323b4edab8db8b289155&language=es&query=${query}&page=1&include_adult=false`
      )
      .then((res) => res.data)
      .then((matches) => setResultado(matches.results));
  }, []);

  return (
    <div>
      <div className="container">
        <h2 className="subtitle is-1">
          Este es el resultado de su búsqueda: {query}
        </h2>
        <div className="columns is-multiline layout">
          {resultado[0]
            ? resultado.map((data, i) =>
                data.known_for ? (
                  data.known_for.map((data, i) => (
                    <div className="column is-2" key={i}>
                      <Link to={`/${data.media_type}/${data.id}`}>
                        <Card data={data} />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="column is-2" key={i}>
                    <Link to={`/${data.media_type}/${data.id}`}>
                      <Card data={data} />
                    </Link>
                  </div>
                )
              )
            : console.log("Buscado")}
        </div>
      </div>
    </div>
  );
};

export default Resultado;

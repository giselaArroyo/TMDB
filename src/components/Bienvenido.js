import React from "react";
import { useNavigate } from "react-router-dom";

const Bienvenido = () => {
  let navigate = useNavigate();

  return (
    <div>
      <div className="columns">
        <div className="column column is-three-fifths is-offset-one-fifth">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <p className="has-text-link has-text-centered is-size-4">
            Se creó su usuario con éxito
          </p>
          <p className="has-text-link has-text-centered">
            ¡Bienvenido al sitio más completo de películas y series!
          </p>
          <p className="has-text-link has-text-centered">
            Comience a disfrutar de todo nuestro contenido.
          </p>
          <br></br>
          <div className="is-flex is-justify-content-center">
            <button
              className="button is-info is-rounded"
              onClick={() => navigate("/")}
            >
              Ir al home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bienvenido;

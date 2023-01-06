import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

function Info() {
  const [film, setFilm] = useState({});
  const params = useParams();
  const id = params.id;
  const type = params.type;

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/" +
          type +
          "/" +
          id +
          "?api_key=e8ff6e05340d323b4edab8db8b289155&language=es"
      )
      .then((res) => res.data)
      .then((data) => {
        setFilm(data);
      })
      .catch(() =>
        console.error("No se pudo acceder a las películas más populares")
      );
  }, []);

  let titulo;
  let titOriginal;
  if (type === "movie") {
    titulo = film.title;
    titOriginal = film.original_title;
  } else {
    titulo = film.name;
    titOriginal = film.original_name;
  }

  return (
    <div className="container">
      <div className="box">
        <h1 className="is-size-2">{titulo}</h1>
      </div>
      <div className="columns">
        <div className="column is-one-quarter">
          <img
            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
            alt="poster"
          />
        </div>
        <div className="column">
          <p>Sinopsis: {film.overview}</p>
          <p>Título original: {titOriginal}</p>
          <p>Valoración del público: {Math.round(film.vote_average)}</p>
          <button className="button is-primary">Agregar a Favoritos</button>
        </div>
      </div>
    </div>
  );
}

export default Info;

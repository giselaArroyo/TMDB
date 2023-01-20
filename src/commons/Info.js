import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Button from "./Button";

function Info() {
  const [film, setFilm] = useState({});
  const params = useParams();
  const idFilm = params.id;
  const type = params.type;
  const [inFav, setInFav] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/" +
          type +
          "/" +
          idFilm +
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

  useEffect(() => {
    setInFav(false);
    let getFavs = async () => {
      let res = await axios.get("/api/fav/misfavs");
      let data = await res.data.map(function (e) {
        let idPeli = e.idFilm;
        if (idPeli === idFilm) setInFav(true);
      });
    };

    getFavs();
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/" +
          type +
          "/" +
          idFilm +
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
  const title = titulo;
  const poster_path = film.poster_path;

  return (
    <div className="container">
      <div className="box">
        <h1 className="is-size-2">{titulo}</h1>
      </div>
      <div className="columns">
        <div className="column is-one-quarter">
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt="poster"
          />
        </div>
        <div className="column">
          <div className="box">
            <br />
            <strong>Título original: </strong>
            {titOriginal}
            <p></p>
            <br />
            <strong>Sinopsis: </strong>
            {film.overview}
            <p></p>
            <br />
            <strong>Valoración del público: </strong>
            {Math.round(film.vote_average)}
            <p></p>
            <br />

            <Button
              inFav={inFav}
              setInFav={setInFav}
              type={type}
              title={title}
              poster_path={poster_path}
              idFilm={idFilm}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;

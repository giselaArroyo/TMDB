import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Button from "./Button";

function Info() {
  const [film, setFilm] = useState({});
  const params = useParams();
  const idFilm = params.id;
  const type = params.type;
  let existe = false;
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

  const handleAdd = () => {
    axios
      .post("/api/fav/add", {
        id: idFilm,
        type: type,
        title: title,
        poster_path: poster_path,
      })
      .then((res) => res.data);
    // .then((fin) => alert("Se agregó a favoritos"));
  };
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
          <p>Sinopsis: {film.overview}</p>
          <p>Título original: {titOriginal}</p>
          <p>Valoración del público: {Math.round(film.vote_average)}</p>

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
  );
}

export default Info;

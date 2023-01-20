import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Button from "./Button";
import { Link } from "react-router-dom";
import Card from "../commons/Card.js";

function Info() {
  const [film, setFilm] = useState({});
  const params = useParams();
  const idFilm = params.id;
  const type = params.type;
  const [inFav, setInFav] = useState(false);
  const [similares, setSimilares] = useState([]);
  const [casting, setCasting] = useState([]);

  useEffect(() => {
    let getDataPeli = async () => {
      let res = await axios.get(
        "https://api.themoviedb.org/3/" +
          type +
          "/" +
          idFilm +
          "?api_key=e8ff6e05340d323b4edab8db8b289155&language=es"
      );
      let info = await setFilm(res.data);
    };
    getDataPeli();

    let getCast = async () => {
      let res = await axios.get(
        "https://api.themoviedb.org/3/" +
          type +
          "/" +
          idFilm +
          "/credits?api_key=e8ff6e05340d323b4edab8db8b289155&language=es"
      );
      let info = await setCasting(res.data.cast);
    };
    getCast();
  }, []);
  // Prueba B

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
  }, [idFilm]);

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
  }, [idFilm]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/" +
          type +
          "/" +
          idFilm +
          "/similar?api_key=e8ff6e05340d323b4edab8db8b289155&language=es&page=1"
      )
      .then((res) => res.data)
      .then((parecidos) => setSimilares(parecidos.results))
      .catch(() =>
        console.error("No se pudo acceder a las películas similares")
      );
  }, [idFilm]);

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

  let actores = [];
  const functionActores = () => {
    casting.map((e, i) => {
      actores.push(e.name);
    });
  };
  functionActores();

  return (
    <div>
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
            <div>
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
              <strong>Actores: </strong>
              {actores.join(", ")}
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

      <div className="container">
        <div style={{ margin: "4%" }}>
          <h2 className="subtitle is-3">Quizás podrian gustarte también:</h2>
          <div className="columns is-multiline layout">
            {similares[0]
              ? similares.map((data, i) => (
                  <div className="column is-2" key={i}>
                    <Link to={`/${type}/${data.id}`}>
                      <Card data={data} />
                    </Link>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;

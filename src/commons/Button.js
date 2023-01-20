import axios from "axios";

function Button({ inFav, type, title, poster_path, idFilm, setInFav }) {
  const handleRemove = () => {
    console.log("idfilm", idFilm);
    axios
      .delete(`/api/fav/remove/${idFilm}`)
      .then((res) => res.data)
      .then((fin) => setInFav(false))
      .catch((err) => console.error(err));
  };

  // console.log(typeof idFilm);

  const handleAdd = () => {
    axios
      .post("/api/fav/add", {
        id: idFilm,
        type: type,
        title: title,
        poster_path: poster_path,
      })
      .then((res) => res.data)
      .then((fin) => setInFav(true))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {inFav === true ? (
        <button className="button is-danger is-rounded" onClick={handleRemove}>
          Quitar de Favoritos
        </button>
      ) : (
        <button className="button is-info is-rounded" onClick={handleAdd}>
          <span>Agregar a favoritos</span>
        </button>
      )}
    </div>
  );
}

export default Button;

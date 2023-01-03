function Card({ data }) {
  let titulo;
  if (data.media_type === "movie") {
    titulo = data.title;
  } else {
    titulo = data.name;
  }

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt="poster"
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <p className="title is-6">{titulo}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;

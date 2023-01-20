import React from "react";

function Card({ data }) {
  let titulo, poster;
  poster = data.poster_path;

  if (data.media_type === "tv") {
    titulo = data.name;
  } else if (data.media_type === "movie") {
    titulo = data.title;
  } else {
    titulo = data.title;
  }

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={`https://image.tmdb.org/t/p/w500${poster}`} alt="poster" />
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

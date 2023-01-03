import Card from "../commons/Card.js";
import { Link } from "react-router-dom";
import Panel from "./Panel";

function Main({ films, series }) {
  return (
    <div className="container">
      <Panel />
      <progress className="progress is-white" value="100" max="100"></progress>
      <div className="container">
        <h2 className="title is-1">Las películas más populares de la semana</h2>
        <progress
          className="progress is-primary"
          value="100"
          max="100"
        ></progress>
        <div className="columns is-multiline layout">
          {films.map((data, i) => (
            <div className="column is-2" key={i}>
              <Link to={`/${data.media_type}/${data.id}`}>
                <Card data={data} />
              </Link>
            </div>
          ))}
        </div>
        <h2 className="title is-1">Las series más populares de la semana</h2>
        <progress
          className="progress is-primary"
          value="100"
          max="100"
        ></progress>
        <div className="columns is-multiline layout">
          {series.map((data, i) => (
            <div className="column is-2" key={i}>
              <Link to={`/${data.media_type}/${data.id}`}>
                <Card data={data} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;

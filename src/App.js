import { Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Info from "./commons/Info";
import Resultado from "./components/Resultado";
import NewUser from "./components/NewUser";
import Bienvenido from "./components/Bienvenido";
import Login from "./components/Login";
import Misfavs from "./components/Misfavs";
import { useDispatch } from "react-redux";
import { setUser } from "./store/user";

function App() {
  const dispatch = useDispatch();

  const [films, setFilms] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=e8ff6e05340d323b4edab8db8b289155&language=es"
      )
      .then((res) => res.data)
      .then((data) => {
        setFilms(data.results);
      })

      .catch(() =>
        console.error("No se pudo acceder a las películas más populares")
      );

    axios
      .get(
        "https://api.themoviedb.org/3/trending/tv/week?api_key=e8ff6e05340d323b4edab8db8b289155&language=es"
      )
      .then((res) => res.data)
      .then((data) => {
        setSeries(data.results);
      })

      .catch(() =>
        console.error("No se pudo acceder a las películas más populares")
      );

    axios
      .get("/api/me")
      .then((res) => res.data)
      .then((user) => {
        console.log("EN APP", user);
        dispatch(setUser(user));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main films={films} series={series} />} />
        <Route path="/:type/:id" element={<Info />} />
        <Route path="/search/query:value" element={<Resultado />} />
        <Route path="/newuser" element={<NewUser />} />
        <Route path="/bienvenido" element={<Bienvenido />} />
        <Route path="/login" element={<Login />} />
        <Route path="/misfavs" element={<Misfavs />} />
      </Routes>
    </div>
  );
}

export default App;

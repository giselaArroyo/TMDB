import axios from "axios";
import React, { useEffect, useState } from "react";

const Misfavs = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/misfavs")
      .then((res) => res.data)
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="container">
        <h2 className="title is-4">Estas son tus pelis favoritas:</h2>
      </div>
    </div>
  );
};

export default Misfavs;

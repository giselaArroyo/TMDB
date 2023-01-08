import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Panel() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${value}`);
  };

  return (
    <div>
      <nav className="panel">
        <p className="panel-heading has-text-link">
          Millones de peliculas y series para descubrir.
        </p>
        <div className="panel-block">
          <div className="control has-icons-left">
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleChange}
                className="input"
                type="text"
                placeholder="Busque por título o persona..."
              />
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Panel;

import { useState } from "react";

export const BuscadorPeliculas = () => {
  const urlBase = "https://api.themoviedb.org/3/search/movie";
  const APP_KEY = "b187874a49096f8a880a9d4ba5aafcc7";

  const [busqueda, setBusqueda] = useState("");
  const [peliculas, setPeliculas] = useState([]);

  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
  };

  const fetchPeliculas = async () => {
    try {
      const response = await fetch(
        `${urlBase}?query=${busqueda}&api_key=${APP_KEY}`
      );
      const data = await response.json();
      const peliculasArray = data.results || [];
      setPeliculas(peliculasArray);
    } catch (error) {
      console.error(`Ha ocurrido un error: ${error}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPeliculas();
  };

  return (
    <div className="container">
      <h1>Buscador de Peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribi una pelicula"
          value={busqueda}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
      <div className="movie-list">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
              alt={pelicula.title}
            />
            <h2>{pelicula.title}</h2>
            <p>{pelicula.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

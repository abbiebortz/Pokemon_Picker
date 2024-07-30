import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import About from './About';
import './App.css';
import randomImage from './random1.png';
import top1 from './top1.png';
import top2 from './top2.png';
import top3 from './top3.png';
import top4 from './top4.png';
import top5 from './top5.png';
import top6 from './top6.png';
import top7 from './top7.png';
import top8 from './top8.png';
import top9 from './top9.png';
import top10 from './top10.png';
import top11 from './top11.png';
import bottomLogo from './bottomLogo.png';

function App() {
  const [pokemonsData, setPokemonsData] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=300")
      .then((res) => res.json())
      .then((data) => {
        const results = data.results.map(pokemon => {
          const id = pokemon.url.split('/').filter(Boolean).pop();
          return { ...pokemon, id };
        });
        setPokemonsData(results);
      });
  }, []);

  useEffect(() => {
    if (!inputSearch) {
      setFilteredPokemon([]);
      return;
    }
    const filtered = pokemonsData.filter(pokemon =>
      pokemon.name.toLowerCase().includes(inputSearch.toLowerCase())
    );
    setFilteredPokemon(filtered);
  }, [inputSearch, pokemonsData]);

  const handleRandomPokemon = () => {
    if (pokemonsData.length > 0) {
      const randomIndex = Math.floor(Math.random() * pokemonsData.length);
      const randomPokemon = pokemonsData[randomIndex];
      navigate(`/about/${randomPokemon.id}`);
    }
  };

  const handlePokemonClick = (id) => {
    setInputSearch('');
    navigate(`/about/${id}`);
  };

  return (
    <div className="App">
      <nav className="App-nav">
        <Link to="/" className="App-title">PokéGuide</Link>
        <button onClick={handleRandomPokemon} style={{ position: 'absolute', right: '20px' }}>
          <img src={randomImage} alt="Random Pokemon" style={{ width: '50px', height: '50px' }} />
        </button>
      </nav>
      <div className="slideshow">
        <img src={top1} alt="Top 1" />
        <img src={top2} alt="Top 2" />
        <img src={top3} alt="Top 3" />
        <img src={top4} alt="Top 4" />
        <img src={top5} alt="Top 5" />
        <img src={top6} alt="Top 6" />
        <img src={top7} alt="Top 7" />
        <img src={top8} alt="Top 8" />
        <img src={top9} alt="Top 9" />
        <img src={top10} alt="Top 10" />
        <img src={top11} alt="Top 11" />
      </div>
      <div className="search-container">
        <input
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          placeholder="Search for a Pokémon"
          type="text"
          className="search-input"
        />
        <div className="search-results">
          {filteredPokemon.length > 0 ? (
            filteredPokemon.map((pokemon) => (
              <div
                key={pokemon.id}
                onClick={() => handlePokemonClick(pokemon.id)}
                style={{ cursor: 'pointer', padding: '10px', display: 'flex', alignItems: 'center' }}
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                  alt={pokemon.name}
                  style={{ width: '50px', height: '50px', marginRight: '10px' }}
                />
                {pokemon.name}
              </div>
            ))
          ) : (
            inputSearch && <div style={{ padding: '10px', color: 'red' }}>Sorry, we don't have the pokemon you have searched for! Try again!</div>
          )}
        </div>
      </div>
      <Routes>
        <Route path="/about/:pokemonId" element={<About />} />
      </Routes>
      <footer className="App-footer">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={bottomLogo} alt="Bottom Logo" style={{ width: '100px', height: '50px', marginRight: '10px' }} />
          @all rights reserved PokéGuide
        </div>
      </footer>
    </div>
  );
}

export default App;

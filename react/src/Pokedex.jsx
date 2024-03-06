import React, { useState, useEffect, useCallback, useMemo, useRef, useLayoutEffect, useDebugValue } from 'react';
import './App.css';
import './pokedex.jpg'

const Pokedex = () => {
  const [pokemon, setPokemon] = useState({
    number: '',
    name: '',
    height: '',
    weight: '',
    imageUrl: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = event => {
    event.preventDefault();
    fetchPokemon(searchTerm.toLowerCase());
  };

  const fetchPokemon = async (pokemonName) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      const data = await response.json();
      const formattedData = {
        number: data.id,
        name: data.name,
        height: (data.height * 0.1).toFixed(2) + 'm',
        weight: (data.weight / 10) + 'kg',
        imageUrl: data.sprites.front_default,
      };
      setPokemon(formattedData);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchPokemon('1'); 
  }, []);

  const cachedSearchTerm = useRef('');

  const searchPokemon = useCallback(() => {
    if (cachedSearchTerm.current === searchTerm) return;
    cachedSearchTerm.current = searchTerm;
    fetchPokemon(searchTerm.toLowerCase());
  }, [searchTerm]);

  useEffect(() => {
    searchPokemon();
  }, [searchPokemon]);

  const pokemonNameLength = useMemo(() => pokemon.name.length, [pokemon.name]);

  useLayoutEffect(() => {
    console.log('Layout effect executed.');
  });

  useDebugValue(pokemonNameLength, length => `Pokemon name length: ${length}`);

  return (
    <main>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <img className="pokemon__image" src={pokemon.imageUrl} alt={pokemon.name} />
          <h1 className="pokemon__data">
            <span className="pokemon__number">{pokemon.number}</span>
            <br />
            <span className="pokemon__name">{pokemon.name}</span>
          </h1>
          <h1 className="pokemon__infos">
            <span className="pokemon__height">Height: {pokemon.height}</span>
            <br />
            <span className="pokemon__weight">Weight: {pokemon.weight}</span>
          </h1>
        </>
      )}

      <form className="form" onSubmit={handleSearchSubmit}>
        <input
          type="search"
          className="input__search"
          placeholder="Encontrar Pokémon"
          value={searchTerm}
          onChange={handleSearchChange}
          required
        />
        <button className=''  type="submit">Search</button>
      </form>
    </main>
  );
};

export default Pokedex;
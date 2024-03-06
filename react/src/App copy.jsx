import React, { useState, useEffect } from 'react';
import './App.css';
import pokedexImage from './pokedex.jpg'; // Importe a imagem usando o caminho relativo ao diretório 'public'

const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const Pokedex = () => {
  // useState - Pokébola
  const [pokemons, setPokemons] = useState([]);

  // useEffect - Centro Pokémon
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const pokemonPromises = Array(150).fill().map((_, index) =>
          fetch(getPokemonUrl(index + 1)).then(response => response.json())
        );
        const pokemonDataArray = await Promise.all(pokemonPromises);
        const formattedPokemonData = pokemonDataArray.map(pokemonData => ({
          id: pokemonData.id,
          name: pokemonData.name,
          types: pokemonData.types,
          imageUrl: pokemonData.sprites.front_default
        }));
        setPokemons(formattedPokemonData);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <div className="container">
      <h1>Pokédex</h1>
      {/* Use a variável pokedexImage que contém o caminho para a imagem */}
      <img className="pokedex-logo" src={pokedexImage} alt="Pokédex" />
      <ul className="pokedex">
        {/* Removemos a iteração sobre os pokémons */}
      </ul>
    </div>
  );
};

export default Pokedex;

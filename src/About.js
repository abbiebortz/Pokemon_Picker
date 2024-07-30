import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";

function About(props) {
    let { pokemonId } = useParams();
    const [pokemon, setPokemon] = useState([]);
    const navigate = useNavigate();

    const handleNextPokemon = () => {
        const nextPokemonId = Number(pokemonId) + 1;
        navigate(`/about/${nextPokemonId}`);
    }

    const handlePreviousPokemon = () => {
        const previousPokemonId = Number(pokemonId) - 1;
        if (previousPokemonId > 0) {
            navigate(`/about/${previousPokemonId}`);
        }
    }
    useEffect(() => {
        if (pokemonId) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
                .then((res) => res.json())
                .then((data) => {
                    setPokemon(data);
                    console.log(data);
                });
        }
    }, [pokemonId]);

    return (
        <>
            {pokemon && pokemon.sprites && (
                <div className="w-2x3 max-w-4xl m-auto bg-purple-100 mt-4 shadow-2xl flex justify-center flex-col items-center">
                <h3 className="text-3xl text-green-900 uppercase">{pokemon.name}</h3>
                <div className="flex justify-center items-center">
                    <button onClick={handlePreviousPokemon} style={{ fontSize: '2em', marginRight: '20px', color: '#003366' }}>&lt;</button>
                    <img className="w-auto h-96" src={pokemon.sprites.front_shiny} alt="front shiny" />
                    <img className="w-auto h-96" src={pokemon.sprites.back_shiny} alt="back shiny" />
                    <button onClick={handleNextPokemon} style={{ fontSize: '2em', marginLeft: '20px', color: '#003366' }}>&gt;</button>
                </div>
            </div>
            
            )}
        </>
    );
}

export default About
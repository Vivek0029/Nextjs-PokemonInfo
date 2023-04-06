"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Pokecard from "./Pokecard";
import Pagination from "./Pagination";
import styles from "../Style/Maincomponent.module.css";

function Maincomponent() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardsPerPage = 10
  const [currentUrl, setCurrentUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon?limit=${cardsPerPage}`
  );
  const [previousUrl, setPreviousUrl] = useState();
  const [nextUrl, setNextUrl] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get(currentUrl)
      .then((response) => {
        const pokemonData = response.data.results;
        setPreviousUrl(response.data.previous);
        setNextUrl(response.data.next);

        const pokemonDetails = pokemonData.map((pokemon) => {
          return axios.get(pokemon.url).then((res) => res.data);
        });

        return Promise.all(pokemonDetails);
      })
      .then((pokemonDetails) => {
        setPokemons(pokemonDetails);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [currentUrl]);

  function previousPage() {
    setCurrentUrl(previousUrl);
  }
  function nextPage() {
    setCurrentUrl(nextUrl);
  }

  return (
    <>
      <main className={styles.main}>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          pokemons.map((pokemon) => (
            <Pokecard
              key={pokemon.id}
              name={
                pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
              }
              image={pokemon.sprites.front_default}
              attacks={pokemon.abilities.map((ability) => ability.ability.name)}
            />
          ))
        )}
      </main>
      <Pagination
        previousProp={previousPage}
        previousUrl={previousUrl}
        nextUrl={nextUrl}
        nextProp={nextPage}
      />
    </>
  );
}

export default Maincomponent;

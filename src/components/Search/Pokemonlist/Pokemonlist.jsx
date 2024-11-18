import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Pokemonlist.css/'
import Pokemon from '../../Pokemon/Pokemon';
function Pokemonlist() {
   const [pokemonlist, setPokemonlist]= useState([]);
   const [isLoading, setIsLoading]=useState(true)
   const [pokedexUrl, setPokedexUrl]= useState('https://pokeapi.co/api/v2/pokemon')
   const [nextUrl, setNextUrl]= useState('');
   const [prevUrl, setPrevUrl]= useState('');

   async function downloadPokemons(){
     setIsLoading(true);
        const response= await axios.get(pokedexUrl)
        const pokemonResults= response.data.results;
        console.log(response.data);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
        const pokemonResultPromise=pokemonResults.map((pokemon)=> axios.get(pokemon.url))
        const pokemonData=await axios.all(pokemonResultPromise)
        console.log(pokemonData);
       const res=pokemonData.map((pokeData) =>{
            const pokemon=pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default: pokemon.sprites.front_shiny,
             types:pokemon.types}
        })
        console.log(res);
        setPokemonlist(res);
        setIsLoading(false)

   
}
   useEffect(()=>{
    downloadPokemons();
   },[pokedexUrl]);


  return (
    <div className='pokemon-list-wrapper'>
     <h3> Pokemon List</h3>
     <div className='pokemon-wrapper'>
     {(isLoading) ? 'Loading...': 
         pokemonlist.map((p)=> <Pokemon  name={p.name} image={p.image} key={p.id}/>)}
         </div>
         <div className='controls'>
          <button disabled={prevUrl === null} onClick={()=>setPokedexUrl(prevUrl)}>Prev</button>
          <button disabled={nextUrl === null} onClick={()=>setPokedexUrl(nextUrl)}>Next</button>

         </div>
    </div>
  )
}

export default Pokemonlist;

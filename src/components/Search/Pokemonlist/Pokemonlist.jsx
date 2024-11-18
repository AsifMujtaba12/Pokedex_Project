import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Pokemonlist.css/'
import Pokemon from '../../Pokemon/Pokemon';
function Pokemonlist() {
//    const [pokemonlist, setPokemonlist]= useState([]);
//    const [, setIsLoading]=useState(true)
//    const [pokedexUrl, setPokedexUrl]= useState('https://pokeapi.co/api/v2/pokemon')
//    const [nextUrl, setNextUrl]= useState('');
//    const [prevUrl, setPrevUrl]= useState('');
   const [pokemonlistState, setPokemonlistState]= useState({
     pokemonlist:[],
     isLoading:true,
     pokedexUrl:'https://pokeapi.co/api/v2/pokemon',
     nextUrl:'',
     prevUrl:''
   });


   async function downloadPokemons(){
     setPokemonlistState((state)=>({
          ...state,
          isLoading: true,

     }));
        const response= await axios.get(pokemonlistState.pokedexUrl)
        const pokemonResults= response.data.results;
        console.log(response.data);
        setPokemonlistState((state)=>({
         ...state,
          nextUrl:response.data.next, 
          prevUrl:response.data.previous}));
        
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
        setPokemonlistState((state)=>({
          ...state,
          pokemonlist: res,
          isLoading: false}));
        

   
}
   useEffect(()=>{
    downloadPokemons();
   },[pokemonlistState.pokedexUrl]);


  return (
    <div className='pokemon-list-wrapper'>
     <h3> Pokemon List</h3>
     <div className='pokemon-wrapper'>
     {(pokemonlistState.isLoading) ? 'Loading...': 
         pokemonlistState.pokemonlist.map((p)=> <Pokemon  name={p.name} image={p.image} key={p.id} id={p.id}/>)}
         </div>
         <div className='controls'>
          <button disabled={pokemonlistState.prevUrl === null} onClick={()=>
            
           {
               const urlToSet= pokemonlistState.prevUrl;
               setPokemonlistState((state)=>({
                    ...state,
                    pokedexUrl:urlToSet}))}}>
                    Prev</button>
               <button disabled={pokemonlistState.nextUrl === null} onClick={()=>{
               const urlToSet= pokemonlistState.nextUrl;

               setPokemonlistState((state)=>({
               ...state,
               pokedexUrl:urlToSet}))}}>
               Next</button>
          
         </div>
    </div>
  )
}

export default Pokemonlist;


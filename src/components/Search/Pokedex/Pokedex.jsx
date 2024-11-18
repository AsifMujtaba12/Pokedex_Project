import React from 'react'
import Search from '../Search'
import './Pokedex.css'
import Pokemonlist from '../Pokemonlist/Pokemonlist'

function Pokedex() {
  return (
    <div className='pokedex-wrapper'>
    <Search />
  <Pokemonlist />
    </div>
  )
}

export default Pokedex

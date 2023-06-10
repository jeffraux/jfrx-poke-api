import React from 'react'

import { PokemonListResultItem } from '../_utils/types'

interface IProps {
  pokemon: PokemonListResultItem
}

const Card = ({ pokemon }: IProps) => {
  return (
    <div className="bg-white w-48 h-56 p-1 shadow-lg rounded-md">
      {pokemon.name}
    </div>
  )
}

export default Card

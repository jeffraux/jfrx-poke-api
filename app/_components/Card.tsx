import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import { ResultItem, IPokemonDetails } from '../_utils/types'
import { fetchDetails } from '../_utils/api'
import { TYPE_COLORS } from '../_utils/constants'

interface IProps {
  pokemon: ResultItem
}

const Card = ({ pokemon }: IProps) => {
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState<IPokemonDetails>()

  useEffect(() => {
    setLoading(true)
    fetchDetails({
      url: pokemon.url,
      callback: (res: IPokemonDetails) => {
        setDetails(res)
        setLoading(false)
      }
    })
  }, [])

  return (
    <div className="bg-white w-48 p-4 shadow-lg rounded-md flex flex-col items-center">
      {details && details.sprites && (
        <Image
          src={details.sprites.front_default}
          alt={pokemon.name}
          width={96}
          height={96}
        />
      )}

      <span className="capitalize font-medium mb-2">
        {pokemon.name}
      </span>

      <div className="inline-flex">
        {details && details.types.map(type => (
          <span
            key={type.slot}
            className={`inline-flex items-center rounded-md capitalize mx-1 px-2 py-1 text-xs font-medium border`}
            style={{ backgroundColor: TYPE_COLORS[type.type.name].bg, color: TYPE_COLORS[type.type.name].text, borderColor: TYPE_COLORS[type.type.name].border }}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Card

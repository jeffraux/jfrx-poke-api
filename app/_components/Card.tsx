import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import { ResultItem, IPokemonDetails } from '../_utils/types'
import { fetchDetails } from '../_api'

import TypeChip from './TypeChip'

interface IProps {
  pokemon: ResultItem
  showDetails: (details: IPokemonDetails) => void
}

const Card = ({ pokemon, showDetails }: IProps) => {
  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState<IPokemonDetails>()

  const handleOpenDetails = () => {
    if (details) {
      showDetails(details)
    }
  }

  useEffect(() => {
    fetchDetails({
      url: pokemon.url,
      callback: (res: IPokemonDetails) => {
        if (res) {
          setDetails(res)
        } else {
          // show error
        }

        setLoading(false)
      }
    })
  }, [])

  return (
    <div onClick={handleOpenDetails} className="pokemon-card bg-white min-w-full w-36 lg:w-48 p-4 shadow-md rounded-md flex flex-col items-center cursor-pointer hover:shadow-2xl">
      {loading ? (
         <div className="animate-pulse w-24 h-24 rounded-md bg-slate-300 flex items-center justify-center"></div>
      ) : details && details.sprites && details.sprites.front_default ? (
        <Image
          src={details.sprites.front_default}
          alt={pokemon.name}
          width={96}
          height={96}
        />
      ) : (
        <div className="w-24 h-20 mb-4 rounded-md bg-slate-200 flex items-center justify-center">
          <span className="text-xs">No image</span>
        </div>
      )}

      <span className="capitalize font-medium mb-2">
        {pokemon.name.replaceAll('-', ' ')}
      </span>

      <div className="inline-flex">
        {loading ? (
          <span
            className={`animate-pulse w-16 bg-slate-300 inline-flex items-center rounded-md capitalize mx-1 px-2 py-1 text-xs font-medium border`}
          >
            &nbsp;
          </span>
        ) : details && details.types.map(type => <TypeChip key={type.slot} type={type.type.name} />)}
      </div>
    </div>
  )
}

export default React.memo(Card)

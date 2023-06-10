'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import Card from './_components/Card'

import { fetchList } from './_utils/api'
import { IPokemonListResponse, PokemonListResultItem } from './_utils/types'

const Home = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListResultItem[]>([])
  const [pageInfo, setPageInfo] = useState({ index: 0, size: 10, total: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchList({
      endpoint: 'pokemon',
      limit: pageInfo.size,
      offset: pageInfo.index,
      callback: (res: IPokemonListResponse) => {
        setLoading(false)
        setPokemonList(res.results)
      }
    })
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <div className="z-10 w-full max-w-5xl mb-16 items-center justify-center font-mono text-sm flex">
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="Poke API logo"
          width={257}
          height={103}
          priority
        />
      </div>

      <div className="mb-32 grid gap-6 text-center lg:mb-0 sm:grid-cols-2 lg:grid-cols-5">
        {pokemonList.map(pokemon => (
          <Card key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </main>
  )
}

export default Home

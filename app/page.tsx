'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

import Card from './_components/Card'

import { fetchList } from './_utils/api'
import { IPokemonListResponse, ResultItem } from './_utils/types'
import Pagination from './_components/Pagination'

const Home = () => {
  const [pokemonList, setPokemonList] = useState<ResultItem[]>([])
  const [pageInfo, setPageInfo] = useState({ index: 0, size: 10, total: 0 })
  const [loading, setLoading] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleGoToPage = (index: number) => {
    setPageInfo({ ...pageInfo, index })
  }

  const handleChangePageSize = (size: number, index?: number) => {
    // Show loading only when user changes page size
    setLoading(true)
    setPageInfo({ ...pageInfo, size, index: index || pageInfo.index })
  }

  const onClickPokemonCard = useCallback(() => {
    setShowDetails(true)
  }, [])
  const onClosePokemonCard = useCallback(() => {
    setShowDetails(false)
  }, [])

  useEffect(() => {
    fetchList({
      endpoint: 'pokemon',
      limit: pageInfo.size,
      offset: pageInfo.index * pageInfo.size,
      callback: (res: IPokemonListResponse) => {
        setPageInfo({
          index: pageInfo.index,
          size: pageInfo.size,
          total: res.count,
        })
        setPokemonList(res.results)
        setLoading(false)
      }
    })
  }, [pageInfo.index, pageInfo.size])

  // TODO:
  // pokemon details modal
  // add tests
  // add loading state when changing page size

  return (
    <main className="flex min-h-screen flex-col items-center p-12 font-sans">
      <div className="z-10 w-full max-w-5xl mb-16 items-center justify-center text-sm flex">
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="Poke API logo"
          width={257}
          height={103}
          priority
        />
      </div>

      <div className="mb-2 grid gap-6 text-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {pokemonList.map(pokemon => (
          <Card
            key={pokemon.name}
            pokemon={pokemon}
            showDetails={onClickPokemonCard}
            onClose={onClosePokemonCard}
          />
        ))}
      </div>

      <div className="mt-8">
        <Pagination
          pageInfo={pageInfo}
          goToPage={handleGoToPage}
          changePageSize={handleChangePageSize}
        />
      </div>
    </main>
  )
}

export default Home

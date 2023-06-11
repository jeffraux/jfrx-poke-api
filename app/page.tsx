'use client'
import React, { useState, useEffect, useCallback, Fragment } from 'react'
import Image from 'next/image'

import Card from './_components/Card'
import Spinner from './_components/Spinner'
import Pagination from './_components/Pagination'
import Overlay from './_components/Overlay'

import { fetchList } from './_api'
import { IPokemonDetails, IPokemonListResponse, ResultItem } from './_utils/types'
import Dialog from './_components/Dialog'

const Home = () => {
  const [pokemonList, setPokemonList] = useState<ResultItem[]>([])
  const [pageInfo, setPageInfo] = useState({ index: 0, size: 10, total: 0 })
  const [loading, setLoading] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetails>()

  const handleGoToPage = (index: number) => {
    setPageInfo({ ...pageInfo, index })
  }

  const handleChangePageSize = (size: number, index?: number) => {
    // Show loading only when user changes page size
    setPageInfo({ ...pageInfo, size, index: index || pageInfo.index })
  }

  const onClickPokemonCard = useCallback((pokemon: IPokemonDetails) => {
    setPokemonDetails(pokemon)
    setShowDetails(true)
  }, [])
  const onClosePokemonCard = useCallback(() => {
    setShowDetails(false)
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchList({
      endpoint: 'pokemon',
      limit: pageInfo.size,
      offset: pageInfo.index * pageInfo.size,
      callback: (res?: IPokemonListResponse) => {
        if (res) {
          setPageInfo({
            index: pageInfo.index,
            size: pageInfo.size,
            total: res.count,
          })
          setPokemonList(res.results)
        } else {
          // show error
        }

        setLoading(false)
      }
    })
  }, [pageInfo.index, pageInfo.size])

  // TODO:
  // pokemon details modal
  // add error handling
  // add tests

  return (
    <main className="flex min-h-screen flex-col items-center py-12 px-8 font-sans">
      <div className="z-10 w-full max-w-5xl mb-4 items-center justify-center text-sm flex">
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="Poke API logo"
          width={257}
          height={103}
          priority
        />
      </div>

      {!loading && pokemonList.length === 0 ?
        <div className="mb-2 text-center rounded-md p-6">
          <span className="text-sm text-zinc-700">No data available</span>
        </div>
        :
        <div className="mb-2 grid gap-6 text-center rounded-md grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 relative p-6">
          {loading && (
            <Fragment>
              <Spinner />
              <Overlay />
            </Fragment>
          )}
          {loading && pokemonList.length === 0 && Array.from(Array(10).keys()).map(i => (
            <Card
              key={i}
              pokemon={{ name: '' }}
              showDetails={() => null}
            />
          ))}
          {pokemonList.map(pokemon => (
            <Card
              key={pokemon.name}
              pokemon={pokemon}
              showDetails={onClickPokemonCard}
            />
          ))}
        </div>
      }

      <div className="mt-8">
        <Pagination
          loading={loading}
          pageInfo={pageInfo}
          goToPage={handleGoToPage}
          changePageSize={handleChangePageSize}
        />
      </div>

      <Dialog
        id="pokemonDetailsModal"
        pokemon={pokemonDetails}
        open={showDetails}
        onClose={onClosePokemonCard}
      />
    </main>
  )
}

export default Home

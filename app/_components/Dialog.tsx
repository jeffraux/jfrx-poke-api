import React from 'react'
import Image from 'next/image'

import { IPokemonDetails } from '../_utils/types'
import { STAT_NAMES } from '../_utils/constants'

import TypeChip from './TypeChip'
import StatDisplay from './StatDisplay'

interface IProps {
  id: string
  pokemon?: IPokemonDetails
  open: boolean
  onClose: () => void
}

const Dialog = ({ id, pokemon, open, onClose }: IProps) => {
  return (
    <div id={id} tabIndex={-1} style={{ display: open ? 'flex' : 'none' }} className="bg-gray-700/60 fixed top-0 left-0 right-0 z-40 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full items-center justify-center">
      <div className="relative w-full max-w-sm max-h-full z-50">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow">
          <div onClick={onClose} className="absolute right-1 top-1 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center cursor-pointer">
            <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Close modal</span>
          </div>
          {/* Modal body */}
          {pokemon && (
            <div className="p-6 flex flex-col items-center">
              {pokemon.sprites && pokemon.sprites.front_default ? (
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={128}
                  height={128}
                  style={{ marginBottom: '16px' }}
                />
              ) : (
                <div className="w-32 h-32 mb-4 rounded-md bg-slate-200 flex items-center justify-center">
                  <span className="text-xs">No image</span>
                </div>
              )}

              <h3 className="text-xl font-bold text-zinc-900 capitalize">
                {pokemon.name.replaceAll('-', ' ')}
              </h3>
              <span className="text-zinc-500 mb-2">
                No. {pokemon.id < 10 ? `00${pokemon.id}` : pokemon.id < 100 ? `0${pokemon.id}` : pokemon.id }
              </span>
              <div className="flex flex-row">
                {pokemon.types.map(type => <TypeChip key={type.slot} type={type.type.name} />)}
              </div>

              <div className="h-1 w-full my-4 border-t border-gray-200"></div>

              {pokemon.stats.map(stat => (
                <StatDisplay key={stat.stat.name} stat={stat.stat.name} value={stat.base_stat} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dialog

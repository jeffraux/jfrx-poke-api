import React from 'react'

import { TYPE_COLORS } from '../_utils/constants'
import { PokemonType } from '../_utils/types'

interface IProps {
  type: PokemonType
}

const TypeChip = ({ type }: IProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-md capitalize mx-1 px-2 py-1 text-xs font-medium border`}
      style={{ backgroundColor: TYPE_COLORS[type].bg, color: TYPE_COLORS[type].text, borderColor: TYPE_COLORS[type].border }}
    >
      {type}
    </span>
  )
}

export default React.memo(TypeChip)

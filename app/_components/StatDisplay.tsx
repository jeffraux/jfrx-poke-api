import React from 'react'

import { Stat, StatGrade } from '../_utils/types'
import { DECENT_THRESHOLD, GOOD_THRESHOLD, GREAT_THRESHOLD, MAX_BASE_STAT, GRADE_COLORS, STAT_NAMES } from '../_utils/constants'

interface IProps {
  key: string
  stat: Stat
  value: number
}

const StatDisplay = ({ key, stat, value }: IProps) => {
  const percentage = (value / MAX_BASE_STAT) * 100
  let grade: StatGrade = 'bad'

  if (value > DECENT_THRESHOLD) {
    grade = 'decent'
    if (value > GOOD_THRESHOLD) {
      grade = 'good'
      if (value > GREAT_THRESHOLD) {
        grade = 'great'
      }
    }
  }

  return (
    <div key={key} className="flex flex-row w-full items-center mb-2 text-sm">
      <div className="w-32 mr-6 text-zinc-600">{STAT_NAMES[stat]}</div>
      <div className="w-16 mr-2 text-zinc-800 font-semibold">{value}</div>
      <div className="h-2 w-full bg-gray-200 rounded-full relative">
        <div
          className="absolute top-0 left-0 h-2 rounded-full"
          style={{
            width: `${percentage > 100 ? 100 : percentage}%`,
            backgroundColor: GRADE_COLORS[grade],
          }}
        />
      </div>
    </div>
  )
}

export default React.memo(StatDisplay)

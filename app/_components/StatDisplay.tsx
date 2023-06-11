import React from 'react'

import { Stat, StatGrade } from '../_utils/types'
import { DECENT_THRESHOLD, GOOD_THRESHOLD, GREAT_THRESHOLD, MAX_BASE_STAT, GRADE_COLORS, STAT_NAMES } from '../_utils/constants'

interface IProps {
  key: string
  stat: Stat
  value: number
}

const StatDisplay = ({ key, stat, value }: IProps) => {
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
    <div key={key} className="flex flex-row w-full items-center mb-2 text-sm text-zinc-900">
      <div className="w-32 mr-6">{STAT_NAMES[stat]}</div>
      <div className="w-16 mr-2">{value}</div>
      <div className="h-2 w-full bg-gray-200 rounded-full relative">
        <div
          className="absolute top-0 left-0 h-2 rounded-full"
          style={{
            width: `${(value / MAX_BASE_STAT) * 100}%`,
            backgroundColor: GRADE_COLORS[grade],
          }}
        />
      </div>
    </div>
  )
}

export default React.memo(StatDisplay)

import React, { useState } from 'react'
import Image from 'next/image'

import { useDebounce } from '../_utils/hooks/debounce'

interface IProps {
  loading: boolean
  pageInfo: {
    index: number
    size: number
    total: number
  }
  goToPage: (index: number) => void
  changePageSize: (size: number, index?: number) => void
}

const Pagination = ({ loading, pageInfo, goToPage, changePageSize }: IProps) => {
  const [currentPage, setCurrentPage] = useState(pageInfo.index + 1)
  const totalPages = Math.ceil(pageInfo.total / pageInfo.size)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    e.preventDefault()
    setCurrentPage(index + 1)
    goToPage(index)
  }

  const handleChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Page index is set to max possible value to avoid empty result
    const newSize = parseInt(e.target.value)
    const newOffset = newSize * pageInfo.index
    const newPageTotal = Math.ceil(pageInfo.total / newSize)
    const newPageIndex = newOffset > pageInfo.total ? newPageTotal - 1 : pageInfo.index

    setCurrentPage(newPageIndex + 1)
    changePageSize(newSize, newPageIndex)
  }

  const onChangeDebounced = useDebounce((p) => goToPage(p - 1))
  const handleChangePage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    // Validate page number to not exceed total number of pages
    const newPage = value > totalPages ? totalPages : value

    setCurrentPage(newPage)
    onChangeDebounced(newPage)
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      <div className="flex flex-row mb-4 md:mb-0">
        <div className="flex flex-row items-center mr-4">
          <span className="text-zinc-900 text-sm mr-2">Page</span>
          <input
            disabled={loading}
            type="number"
            value={currentPage}
            onChange={handleChangePage}
            className="w-11 text-zinc-900 text-sm rounded-md bg-white ring-1 ring-inset ring-gray-300 p-2.5 text-right"
          />
          <span className="text-zinc-900 text-sm ml-1 mr-2">/ {totalPages}</span>
        </div>
        <div className="w-28 mr-4">
          <select id="pageSize" className="w-full bg-white ring-1 ring-inset ring-gray-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
            }}
            onChange={handleChangePageSize}
            defaultValue={10}
            disabled={loading}
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={30}>30 / page</option>
            <option value={40}>40 / page</option>
            <option value={50}>50 / page</option>
          </select>
        </div>
      </div>
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <button
          className="relative bg-white inline-flex w-24 items-center justify-center rounded-l-md p-2 ring-1 ring-inset ring-gray-300 hover:bg-sky-100 focus:z-20 focus:outline-offset-0 disabled:opacity-40 disabled:hover:bg-white"
          onClick={(e) => handleClick(e, pageInfo.index - 1)}
          disabled={pageInfo.index === 0 || loading}
        >
          <Image alt="Previous" src="/chevron-left.svg" height={24} width={24} />
          <span className="text-zinc-900 text-sm">Previous</span>
        </button>

        <button
          className="relative bg-white inline-flex w-24 items-center justify-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-sky-100 focus:z-20 focus:outline-offset-0 disabled:opacity-40 disabled:hover:bg-white"
          onClick={(e) => handleClick(e, pageInfo.index + 1)}
          disabled={pageInfo.index >= totalPages - 1  || loading}
        >
          <span className="text-zinc-900 text-sm">Next</span>
          <Image alt="Next" src="/chevron-right.svg" height={24} width={24} />
        </button>
      </nav>
    </div>
  )
}

export default Pagination

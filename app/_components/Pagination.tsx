import React from 'react'
import Image from 'next/image'

interface IProps {
  pageInfo: {
    index: number
    size: number
    total: number
  }
  goToPage: (index: number) => void
  changePageSize: (size: number) => void
}

const Pagination = ({ pageInfo, goToPage, changePageSize }: IProps) => {
  const totalPages = Math.ceil(pageInfo.total / pageInfo.size)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    e.preventDefault()
    goToPage(index)
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changePageSize(parseInt(e.target.value))
  }

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="w-28 mr-4">
        <select id="pageSize" className="w-full bg-gray-50 ring-1 ring-inset ring-gray-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
          }}
          onChange={handleChange}
          defaultValue={10}
        >
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={30}>30 / page</option>
          <option value={40}>40 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </div>
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <button
          className="relative inline-flex w-24 items-center justify-center rounded-l-md p-2 ring-1 ring-inset ring-gray-300 hover:bg-sky-100 focus:z-20 focus:outline-offset-0 disabled:opacity-40 disabled:hover:bg-gray-50"
          onClick={(e) => handleClick(e, pageInfo.index - 1)}
          disabled={pageInfo.index === 0}
        >
          <Image alt="Previous" src="/chevron-left.svg" height={24} width={24} />
          <span className="text-zinc-900 text-sm">Previous</span>
        </button>

        <button
          className="relative inline-flex w-24 items-center justify-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-sky-100 focus:z-20 focus:outline-offset-0 disabled:opacity-40 disabled:hover:bg-gray-50"
          onClick={(e) => handleClick(e, pageInfo.index + 1)}
          disabled={pageInfo.index === totalPages - 1}
        >
          <span className="text-zinc-900 text-sm">Next</span>
          <Image alt="Next" src="/chevron-right.svg" height={24} width={24} />
        </button>
      </nav>
    </div>
  )
}

export default Pagination

import React from 'react'
import Image from 'next/image'

interface IProps {
  pageInfo: {
    index: number
    size: number
    total: number
  }
  next: any
  previous: any
  changePageSize: any
}

const Pagination = ({ pageInfo, next, previous, changePageSize }: IProps) => {
  return (
    <div>
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <a
          href="#"
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-sky-100 focus:z-20 focus:outline-offset-0"
        >
          <Image alt="Previous" src="/chevron-left.svg" height={24} width={24} />
        </a>
        {/*
          Current: "z-10 bg-sky-900 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-900",
          Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-sky-100 focus:outline-offset-0"
        */}
        <a
          href="#"
          aria-current="page"
          className="relative z-10 inline-flex items-center bg-sky-900 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-900"
        >
          1
        </a>
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-sky-100 focus:z-20 focus:outline-offset-0"
        >
          2
        </a>
        <a
          href="#"
          className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-sky-100 focus:z-20 focus:outline-offset-0 md:inline-flex"
        >
          3
        </a>
        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
          ...
        </span>
        <a
          href="#"
          className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-sky-100 focus:z-20 focus:outline-offset-0 md:inline-flex"
        >
          8
        </a>
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-sky-100 focus:z-20 focus:outline-offset-0"
        >
          9
        </a>
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-sky-100 focus:z-20 focus:outline-offset-0"
        >
          10
        </a>
        <a
          href="#"
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-sky-100 focus:z-20 focus:outline-offset-0"
        >
          <Image alt="Next" src="/chevron-right.svg" height={24} width={24} />
        </a>
      </nav>
    </div>
  )
}

export default Pagination

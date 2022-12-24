import React from 'react'
import { useFetchData } from '../hooks/useFetchProducts'
import ProductsList from './ProductsList'
import { MusicVideosSkeleton } from './UI/ProductsSkelton'
import ScrollButton from './UI/ScrollToTopButton'

export const MainPage = () => {
  const { allProducts, isLoading, isError } = useFetchData()
  return (
    <div className='w-full space-y-6 sm:w-[90%] mx-auto py-3'>
      <input
        required
        placeholder='Search'
        className='w-full bg-zinc-800 py-0.5 px-2 rounded-xl box-border min-h-[38px] col-span-full xl:col-auto font-sans placeholder:text-neutral-500'
        type='text'
      />
      {isError && (
        <div className='flex flex-col items-center justify-between text-rose-600 text-lg mt-3'>
          <pre>There was a problem.</pre>

          <pre>Please try again later.</pre>
        </div>
      )}

      {isLoading && (
        <div className='mt-5'>
          <MusicVideosSkeleton />
        </div>
      )}

      <ProductsList items={allProducts} />
      <ScrollButton />
    </div>
  )
}

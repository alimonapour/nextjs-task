import { Key, useState } from 'react'
import { useFetchProduct } from '../hooks/useFetchProduct'
import NextImage from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge'
import {
  faChevronLeft,
  faHeart,
  faComment,
  faPaperPlane,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons'

export const ProductDetails = ({
  productId,
  closeModal,
}: {
  productId?: number | undefined
  closeModal?: any
}) => {
  const { product, isError, isLoading } = useFetchProduct(productId)
  const [isReady, setIsReady] = useState(false)

  const onLoadCallback = () => {
    setIsReady(true)
  }

  return (
    <div>
      {isError && <h3>{isError}</h3>}

      <div className='grid bg-black w-full h-full'>
        <div className='flex'>
          <button
            className='flex-none w-6'
            type='button'
            onClick={() => closeModal(false)}
          >
            <FontAwesomeIcon
              style={{ color: '#ffffff', fontSize: 30 }}
              icon={faChevronLeft}
            />
          </button>
          <h1
            onClick={() => closeModal(false)}
            className='text-2xl font-bold text-white text-center flex-1 w-64'
          >
            Explore
          </h1>
        </div>
        <div className='flex items-center justify-between m-3'>
          <div className='flex items-center'>
            <div className='rounded-full border-2 border-solid w-10 h-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>
            <h1 className='text-lg text-left text-white font-medium ml-2'>
              {' '}
              {product?.brand}
            </h1>
          </div>
          <div className='flex items-center'>
            <h1 className='text-left text-white font-medium bg-neutral-800 p-1.5 mr-3 rounded'>
              {' '}
              Follow
            </h1>
            <h1 className='text-white font-bold'>...</h1>
          </div>
        </div>
        {isLoading && (
          <div className='overflow-hidden shadow-lg'>
            <div>Loading....</div>
          </div>
        )}
        <div className='w-full my-0 mx-auto'>
          <div className='relative'>
            <NextImage
              width='0'
              height='0'
              sizes='100vw'
              quality={100}
              src={
                product?.thumbnail ??
                'https://i.dummyjson.com/data/products/12/thumbnail.jpg'
              }
              className={twMerge(
                'w-full h-auto bg-gray-400 transition duration-1000 blur-2xl scale-120',
                isReady &&
                  'blur-0 scale-100 w-full bg-cover bg-center row-span-1 object-fill object-center',
              )}
              onLoadingComplete={onLoadCallback}
              alt={product?.brand ?? 'brand'}
            />
            <h2 className='absolute top-5 right-5 p-1 w-12 text-center bg-neutral-600 text-white rounded-2xl'>
              1/{product?.images.length}
            </h2>
          </div>
          <ul className='flex justify-center list-none mt-4 mb-0 mx-0 p-0'>
            {product?.images.map((_item: any, idx: Key | null | undefined) => (
              <li
                key={idx}
                className={twMerge(
                  'w-3 h-3 my-0 mx-1 rounded-[50%] bg-gray-500 cursor-pointer',
                  idx === 0 && 'bg-blue-600',
                )}
              />
            ))}
          </ul>
        </div>

        <div className='flex flex-col ml-2 -mt-5'>
          <div className='flex justify-between mx-5 items-center'>
            <div className='flex items-center justify-between '>
              <FontAwesomeIcon
                icon={faHeart}
                style={{ color: '#ffffff', fontSize: 30 }}
              />
              <FontAwesomeIcon
                icon={faComment}
                style={{
                  color: '#ffffff',
                  fontSize: 30,
                  marginLeft: 15,
                  transform: 'rotateY(180deg)',
                }}
              />
              <FontAwesomeIcon
                icon={faPaperPlane}
                style={{ color: '#ffffff', fontSize: 30, marginLeft: 15 }}
              />
            </div>
            <FontAwesomeIcon
              icon={faBookmark}
              style={{ color: '#ffffff', fontSize: 30 }}
            />
          </div>
          <h1 className='text-white text-left font-semibold mt-5'>
            {product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
            likes
          </h1>
          <div className='flex items-center'>
            <h1 className='text-lg text-left text-white font-medium'>
              {' '}
              {product?.brand}
            </h1>
            <h2 className='text-sm text-center ml-2 text-white'>
              {product?.description.substring(0, 60)}...{' '}
              <span className='text-neutral-500'>more</span>
            </h2>
          </div>
          <h2 className='text-neutral-500'>
            View all {product?.stock} comments
          </h2>
          <h2 className='text-neutral-500'>
            November 13 - <span className='text-white'>See translation</span> -
            Instagram suggested
          </h2>
        </div>
      </div>

      <div className='flex flex-col rounded overflow-hidden shadow-lg mt-12'>
        <div className='px-6 py-4 '>
          <div className='flex items-center mb-2'>
            <div className='rounded-full border-2 border-solid w-10 h-10 bg-[#1C2833] animate-pulse border-[#1C2833]'></div>
            <div className='w-32 h-2 rounded ml-2 bg-[#1C2833] animate-pulse'></div>
          </div>
        </div>
        <div className='w-full h-72 bg-[#1C2833] animate-pulse'></div>
      </div>
    </div>
  )
}

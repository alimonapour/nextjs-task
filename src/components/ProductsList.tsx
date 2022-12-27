import { useRef, useState } from 'react'
import NextImage from 'next/image'
import { useLazyLoad } from '../hooks/useLazyLoad'
import { twMerge } from 'tailwind-merge'
import { ProductDetails } from './ProductDetails'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone } from '@fortawesome/free-solid-svg-icons'

interface ProductType {
  id: number
  title: string
  brand: string
  category: string
  description: string
  discountPercentage: number
  images: string[]
  price: number
  rating: number
  stock: number
  thumbnail: string
}

interface Items {
  items: ProductType[]
}

export default function ProductsList({ items }: Items) {
  const loaderTriggerRef = useRef(null)

  const [isReady, setIsReady] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [productId, setProductId] = useState<number>()
  const { visibleItems, isLastPage } = useLazyLoad(
    items,
    loaderTriggerRef.current,
  )

  const onLoadCallback = () => {
    setIsReady(true)
  }

  function chunk(arr: ProductType[], size: number) {
    let chunked = []
    let index = 0
    while (index < arr?.length) {
      chunked.push(arr.slice(index, index + size))
      index += size
    }
    return chunked
  }

  const chunkedArray = chunk(visibleItems, 5)

  return (
    <div className='w-full bg-black'>
      {showModal ? (
        <motion.div
          drag
          dragConstraints={{
            top: -50,
            left: -50,
            right: 50,
            bottom: 50,
          }}
          dragMomentum={false}
          onDragEnd={(event, info) =>
            info.point.x > 300 ? setShowModal(false) : ''
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='bg-black transition ease-in-out duration-300 w-screen h-screen top-0 left-0 justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className='relative w-full my-6 mx-auto max-w-3xl'
          >
            <ProductDetails productId={productId} closeModal={setShowModal} />
          </motion.div>
        </motion.div>
      ) : null}

      {chunkedArray.map((rowItems, index) => {
        if (index % 2 === 0) {
          return (
            <div className='grid grid-cols-3 gap-0.5 mb-0.5' key={index}>
              {rowItems.map((rowItem, index) => {
                return (
                  <div
                    className={twMerge(
                      'relative w-full bg-cover bg-center row-span-1 object-fill object-center',
                      index === 2 &&
                        'bg-cover bg-center row-span-2 object-fill object-center',
                    )}
                    key={rowItem.id}
                  >
                    <NextImage
                      key={rowItem.id}
                      width='500'
                      height='500'
                      quality={100}
                      src={rowItem.thumbnail}
                      className={twMerge(
                        'blur-2xl scale-120',
                        isReady &&
                          'bg-gray-400 transition duration-1000 blur-none scale-100 ',
                      )}
                      onLoadingComplete={onLoadCallback}
                      alt={rowItem.brand}
                      onClick={() => {
                        setShowModal(true)
                        setProductId(rowItem.id)
                      }}
                    />
                    {rowItem.images.length > 1 ? (
                      <FontAwesomeIcon
                        icon={faClone}
                        style={{
                          color: '#ffffff',
                          fontSize: 15,
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          transform: 'rotateY(180deg)',
                        }}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                )
              })}
            </div>
          )
        }
        return (
          <div className='grid grid-cols-3 gap-0.5 mb-0.5' key={index}>
            {rowItems.map((rowItem, index) => {
              return (
                <div
                  className={twMerge(
                    'relative w-full bg-cover bg-center row-span-1 object-fill object-center',
                    index === 0 &&
                      'bg-cover bg-center row-span-2 object-fill object-center',
                  )}
                  key={rowItem.id}
                >
                  <NextImage
                    width='500'
                    height='500'
                    quality={100}
                    src={rowItem.thumbnail}
                    className={twMerge(
                      'blur-2xl scale-120',
                      isReady &&
                        'bg-gray-400 transition duration-1000 blur-none scale-100 w-full bg-cover bg-center row-span-1 object-fill object-center',
                    )}
                    onLoadingComplete={onLoadCallback}
                    alt={rowItem.brand}
                    onClick={() => {
                      setShowModal(true)
                      setProductId(rowItem.id)
                    }}
                  />
                  {rowItem.images.length > 1 ? (
                    <FontAwesomeIcon
                      icon={faClone}
                      style={{
                        color: '#ffffff',
                        fontSize: 20,
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        transform: 'rotateY(180deg)',
                      }}
                    />
                  ) : (
                    ''
                  )}
                </div>
              )
            })}
          </div>
        )
      })}
      <div
        ref={loaderTriggerRef}
        style={{ height: '100px' }}
        hidden={isLastPage}
      ></div>
    </div>
  )
}

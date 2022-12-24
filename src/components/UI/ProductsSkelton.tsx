export const CardSkeleton = () => {
  return (
    <div className='rounded overflow-hidden shadow-lg'>
      <div className='w-full h-72 bg-gray-300 animate-pulse'></div>
    </div>
  )
}

export const MusicVideosSkeleton = () => {
  const skeletonRange = Array.from(Array(10).keys()).map((n) => n + 1)

  return (
    <div className='grid grid-cols-3 gap-0.5 animate-pulse'>
      {skeletonRange.map((num) => {
        return <CardSkeleton key={num} />
      })}
    </div>
  )
}

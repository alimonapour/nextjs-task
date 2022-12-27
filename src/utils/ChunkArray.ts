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

export function ChunkArray(arr: ProductType[], size: number) {
  let chunked = []
  let index = 0
  while (index < arr?.length) {
    chunked.push(arr.slice(index, index + size))
    index += size
  }
  return chunked
}

import useSWR from 'swr'

const apiUrl = 'https://dummyjson.com/products?skip=0&limit=100'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
export function useFetchData() {
  const { data, error } = useSWR(apiUrl, fetcher)
  return {
    allProducts: data?.products,
    isLoading: !error && !data,
    isError: error,
  }
}

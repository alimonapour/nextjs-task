import useSWR from 'swr'

const apiUrl = 'https://dummyjson.com/products'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
export function useFetchProduct(id: number | string | undefined) {
  const { data, error } = useSWR(`${apiUrl}/${id}`, fetcher)
  return {
    product: data,
    isLoading: !error && !data,
    isError: error,
  }
}

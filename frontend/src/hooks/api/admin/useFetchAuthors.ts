import { useQuery } from "react-query";


export const fetchAuthors = async({market}:any):Promise<Array<string>> => {
  const authors = await market.fetchAllAuthors();
  return authors;
}

export const useFetchAuthors = (market:any) => {
    return useQuery<Array<string>, Error>(
        'fetchAuthors',
        () => fetchAuthors(market)
    )
}
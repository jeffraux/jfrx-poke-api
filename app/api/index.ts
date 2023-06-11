import { IListApiRequest, IDetailsApiRequest } from '../_utils/types'

const API = 'https://pokeapi.co/api/v2'
/**
 * Fetch list resource from PokeAPI
 * @param endpoint The endpoint name from PokeAPI
 * @param limit The number of items shown per page
 * @param offset The number of items to offset from 0, can be used to determine page number
 * @param callback The function to call after getting data from the API
 * @returns 
 */
const fetchList = async (req: IListApiRequest) => {
  return fetch(`${API}/${req.endpoint}/?limit=${req.limit}&offset=${req.offset}`)
    .then(response => {
      if (response.status === 200) {
        return response.json()
      }
    })
    .then(data => {
      req.callback(data)
    })
    .catch(e => {
      console.log(e)
    })
}

/**
 * Fetch data from PokeAPI using a given URL
 * @param url The API URL to be called (includes protocol, hostname, and pathname)
 * @param callback The function to call after getting data from the API
 * @returns 
 */
const fetchDetails = async (req: IDetailsApiRequest) => {
  return fetch(req.url)
    .then(response => {
      if (response.status === 200) {
        return response.json()
      }
    })
    .then(data => {
      req.callback(data)
    })
}

export { fetchList, fetchDetails }

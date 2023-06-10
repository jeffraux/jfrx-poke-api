import { IListApiRequest, IDetailsApiRequest } from './types'

const API = 'https://pokeapi.co/api/v2'

const fetchList = async (req: IListApiRequest) => {
  return fetch(`${API}/${req.endpoint}/?limit=${req.limit}&offset=${req.offset}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      req.callback(data)
    })
}

const fetchDetails = async (req: IDetailsApiRequest) => {
  return fetch(req.url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      req.callback(data)
    })
}

export { fetchList, fetchDetails }

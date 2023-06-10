export interface IListApiRequest {
  endpoint: string
  limit: number
  offset: number
  callback: any
}

export interface IDetailsApiRequest {
  url: string
  callback: any
}

export type PokemonListResultItem = { name: string, url: string }
export interface IPokemonListResponse {
  count: number
  next?: string
  previous?: string
  results: PokemonListResultItem[]
}

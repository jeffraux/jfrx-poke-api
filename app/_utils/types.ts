export type PokemonType =
  'normal' |
  'fighting' |
  'flying' |
  'poison' |
  'ground' |
  'rock' |
  'bug' |
  'ghost' |
  'steel' |
  'fire' |
  'water' |
  'grass' |
  'electric' |
  'psychic' |
  'ice' |
  'dragon' |
  'dark' |
  'fairy' |
  'unknown' |
  'shadow'

export interface ResultItem {
  name: string
  url?: string
}
export interface PokemonStat {
  base_stat: number
  stat: ResultItem
}
export interface PokemonTypes {
  slot: number
  type: { name: PokemonType, url: string }
}

export interface IListApiRequest {
  endpoint: string
  limit: number
  offset: number
  callback: (res: IPokemonListResponse) => void
}

export interface IDetailsApiRequest {
  url?: string
  callback: (res: IPokemonDetails) => void
}

export interface IPokemonListResponse {
  count: number
  next?: string
  previous?: string
  results: ResultItem[]
}

export interface IPokemonDetails {
  id: number
  name: string
  order: number
  sprites: { front_default: string }
  stats: PokemonStat[]
  types: PokemonTypes[]
}

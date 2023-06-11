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

export type Stat =
  'hp' |
  'attack' |
  'defense' |
  'special-attack' |
  'special-defense' |
  'speed' |
  'accuracy' |
  'evasion' 

export type StatGrade = 'bad' | 'decent' | 'good' | 'great'

export interface ResultItem {
  name: string
  url?: string
}
export interface PokemonStat {
  base_stat: number
  stat: { name: Stat, url: string }
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

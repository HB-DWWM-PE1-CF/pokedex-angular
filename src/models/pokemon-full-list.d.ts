import {Pokemon} from './pokemon';

export interface PokemonFullList {
  count: number;
  currentPage: number;
  nextPage: number|null;
  items: Array<Pokemon>;
}

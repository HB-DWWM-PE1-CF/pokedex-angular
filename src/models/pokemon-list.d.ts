import {PokemonLite} from './pokemon-lite';

/**
 * Interface use in PokeAPI when retrieving Pokemon list.
 * It represent the real object retrieved, the list of Pokemon is inside 'results' property.
 * @see https://pokeapi.co/api/v2/pokemon?limit=100&offset=200
 */
export interface PokemonList {
  count: number;
  next: string|null;
  previous: string|null;
  results: Array<PokemonLite>;
}

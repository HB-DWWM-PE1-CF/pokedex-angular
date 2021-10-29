/**
 * Interface use in PokeAPI when retrieving Pokemon list. It represent ONE Pokemon in this list.
 * @see https://pokeapi.co/api/v2/pokemon?limit=100&offset=200
 */
export interface PokemonLite {
  name: string;
  url: string;
}

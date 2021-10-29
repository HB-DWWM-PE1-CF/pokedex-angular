/**
 * Interface use in PokeAPI when retrieving detail about ONE Pokemon.
 * It represent a Pokemon with many data. In our interface, only a part of the data are used.
 * @see https://pokeapi.co/api/v2/pokemon/25
 * @see https://pokeapi.co/api/v2/pokemon/1
 * @see https://pokeapi.co/api/v2/pokemon/132
 */
export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  order: number;
  weight: number;
  sprites: {
    back_default: string;
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string; // Where is found the official artwork for the Pokemon.
      },
    },
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  species: {
    name: string;
    url: string;
  };
}

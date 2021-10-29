export interface EvolutionChain {
  is_baby: boolean;
  species: {
    name: string;
  };
  evolves_to: Array<EvolutionChain>;
}

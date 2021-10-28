import { Component, OnInit } from '@angular/core';
import {PokemonLite} from '../../models/pokemon-lite';
import {PokeapiService} from '../services/pokeapi.service';
import {PokemonList} from '../../models/pokemon-list';
import {Pokemon} from '../../models/pokemon';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  public pokemonList: Array<Pokemon> = [];

  constructor(
    private pokeapiService: PokeapiService,
  ) { }

  ngOnInit(): void {
    this.pokeapiService.pokemonList.subscribe((data: PokemonList) => {
      const dataObservable = data.results.map((pokemon: PokemonLite) => {
        return this.pokeapiService.getPokemonDetail(this.getId(pokemon));
      });

      forkJoin(dataObservable).subscribe((fullPokemon) => {
        this.pokemonList = fullPokemon;
      });
    });
  }

  public getId(pokemon: PokemonLite): string {
    const result = pokemon.url.match(/^https:\/\/pokeapi\.co\/api\/v2\/pokemon\/([0-9]+)\/?$/);
    if (result) {
      return result[1];
    }

    return '';
  }

}

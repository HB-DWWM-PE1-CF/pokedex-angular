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
    // On the initialization of the component, we run the request to get Pokemon List from the API via an Observable.
    // (We dont know when we will received the response)
    this.pokeapiService.pokemonList.subscribe((data: PokemonList) => {
      // Here, the response is received.

      // This map create a new Array, based on the Pokemon list retrieved from API.
      const dataObservables = data.results.map((pokemon: PokemonLite) => {
        // It convert the PokemonLite into an Observable to get Pokemon full detail.
        return this.pokeapiService.getPokemonDetail(this.getId(pokemon));
      });

      // Using forkJoin to trigger all previous Observable and wait all of them to finish.
      forkJoin(dataObservables).subscribe((fullPokemon: Array<Pokemon>) => {
        // When all finished, we get an Array will all the results from each Observable, in the same order as the dataObservables array.

        // Affect the results of all Observable into this.pokemonList.
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

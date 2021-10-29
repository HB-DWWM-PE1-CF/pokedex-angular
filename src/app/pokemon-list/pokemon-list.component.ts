import { Component, OnInit } from '@angular/core';
import {PokemonLite} from '../../models/pokemon-lite';
import {PokeapiService} from '../services/pokeapi.service';
import {PokemonList} from '../../models/pokemon-list';
import {Pokemon} from '../../models/pokemon';
import {forkJoin} from 'rxjs';
import {PokemonFullList} from '../../models/pokemon-full-list';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  public pokemonList: Array<Pokemon> = [];
  public count = 0;

  constructor(
    private pokeapiService: PokeapiService,
  ) { }

  ngOnInit(): void {
    // On the initialization of the component, we run the request to get Pokemon List from the API via an Observable.
    // (We dont know when we will received the response)
    this.pokeapiService.getPokemonList().subscribe((data: PokemonFullList) => {
      this.pokemonList = data.items;
      this.count = data.count;
    });
  }
}

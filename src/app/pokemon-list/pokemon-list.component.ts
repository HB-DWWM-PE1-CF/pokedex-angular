import { Component, OnInit } from '@angular/core';
import {PokeapiService} from '../services/pokeapi.service';
import {Pokemon} from '../../models/pokemon';
import {PokemonFullList} from '../../models/pokemon-full-list';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  // List of Pokemon to render in page.
  public pokemonList: Array<Pokemon> = [];
  // Total of Pokemon.
  public count = 0;
  // save the number of the next page to load.
  public nextPage: number|null = 1;
  // Use to know if a request is currently in progress form API.
  public loading = false;

  constructor(
    private pokeapiService: PokeapiService,
  ) { }

  ngOnInit(): void {
    // On the initialization of the component, we load the first dataset.
    this.loadNextPage();
  }

  public loadNextPage(): void {
    // If no nextPage, nothing to load.
    // AND if not currently loading, then load next page (prevent triggering the same request twice.)
    if (null !== this.nextPage && !this.loading) {
      this.loading = true; // Set loading to true cause start request.
      this.pokeapiService.getPokemonList(this.nextPage).subscribe((data: PokemonFullList) => {
        this.pokemonList = this.pokemonList.concat(data.items); // Concat the new pokemon received into existing Array.
        this.count = data.count;
        this.nextPage = data.nextPage;
        this.loading = false; // response received, so loading to false.
      });
    }
  }
}

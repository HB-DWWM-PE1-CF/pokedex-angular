import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PokemonList} from '../../models/pokemon-list';
import {Pokemon} from '../../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public get pokemonList(): Observable<PokemonList> {
    return this.httpClient.get<PokemonList>('https://pokeapi.co/api/v2/pokemon');
  }

  /**
   * Prepare the request to get detail about ONE Pokemon by its id.
   */
  public getPokemonDetail(id: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PokemonList} from '../../models/pokemon-list';

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
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, Subscriber} from 'rxjs';
import {PokemonList} from '../../models/pokemon-list';
import {Pokemon} from '../../models/pokemon';
import {PokemonFullList} from '../../models/pokemon-full-list';
import {PokemonLite} from '../../models/pokemon-lite';
import {PokemonSpecie} from '../../models/pokemon-specie';
import {Evolution} from '../../models/evolution';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private static limit = 21;

  constructor(
    // Inject the HttpClient service given by Angular.
    private httpClient: HttpClient,
  ) { }

  /**
   * Prepare the request to get Pokemon list.
   */
  public getPokemonList(page: number = 1): Observable<PokemonFullList> {
    const offset = (page - 1) * PokeapiService.limit;

    // Create a new observable to transform API Pokemon list with PokemonLite into a list of full Pokemon detail.
    return new Observable((subscriber: Subscriber<PokemonFullList>) => {
      this.httpClient.get<PokemonList>(`https://pokeapi.co/api/v2/pokemon?limit=${PokeapiService.limit}&offset=${offset}`)
        .subscribe((data: PokemonList) => {
          // Here, the response is received.

          // This map create a new Array, based on the Pokemon list retrieved from API.
          const dataObservables = data.results.map((pokemon: PokemonLite) => {
            // It convert the PokemonLite into an Observable to get Pokemon full detail.
            return this.getPokemonDetail(this.getId(pokemon));
          });

          // Using forkJoin to trigger all previous Observable and wait all of them to finish.
          forkJoin(dataObservables).subscribe((fullPokemon: Array<Pokemon>) => {
            // When all finished, we get an Array will all the results from each Observable, in the same order as the dataObservables array.

            // Affect the results of all Observable into our custom Observable.
            subscriber.next({
              count: data.count,
              currentPage: page,
              nextPage: data.next ? (page + 1) : null,
              items: fullPokemon,
            });
            // Tell to Observable that its finished.
            subscriber.complete();
          });
        });
    });
  }

  /**
   * Prepare the request to get detail about ONE Pokemon by its id.
   */
  public getPokemonDetail(id: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

  public getId(pokemon: PokemonLite): string {
    const result = pokemon.url.match(/^https:\/\/pokeapi\.co\/api\/v2\/pokemon\/([0-9]+)\/?$/);
    if (result) {
      return result[1];
    }

    return '';
  }

  public getEvolutionDetail(pokemon: Pokemon): Observable<Evolution|null> {
    return new Observable<Evolution | null>((subscriber: Subscriber<Evolution|null>) => {
      this.httpClient.get<PokemonSpecie>(pokemon.species.url)
        .subscribe((specie: PokemonSpecie) => {
          this.httpClient.get<Evolution>(specie.evolution_chain.url)
            .subscribe((evol: Evolution) => {
              subscriber.next(evol);
              subscriber.complete();
            });
        });
    });
  }
}

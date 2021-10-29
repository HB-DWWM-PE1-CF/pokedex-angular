import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokeapiService} from '../services/pokeapi.service';
import {Pokemon} from '../../models/pokemon';
import {Evolution} from '../../models/evolution';
import {EvolutionChain} from '../../models/evolution-chain';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  public pokemon: Pokemon|null = null;

  public evolution: Evolution|null = null;

  constructor(
    private route: ActivatedRoute,
    private pokeapiService: PokeapiService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pokeapiService.getPokemonDetail(params.id)
        .subscribe((foo: Pokemon) => {
          this.pokemon = foo;

          this.pokeapiService.getEvolutionDetail(foo).subscribe((evol: Evolution|null) => {
            this.evolution = evol;

            // TODO display evolution in HTML.
            console.log(this.evolution);
          });
        });
    });
  }
}

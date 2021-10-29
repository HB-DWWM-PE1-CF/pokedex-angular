import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokeapiService} from '../services/pokeapi.service';
import {Pokemon} from '../../models/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  public pokemon: Pokemon|null = null;

  constructor(
    private route: ActivatedRoute,
    private pokeapiService: PokeapiService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pokeapiService.getPokemonDetail(params.id)
        .subscribe((foo: Pokemon) => {
          this.pokemon = foo;
        });
    });
  }
}

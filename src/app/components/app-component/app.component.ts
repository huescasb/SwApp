import { Component } from '@angular/core';
import { People } from 'src/app/models/people';
import { Starship } from 'src/app/models/starship';
import { GameService } from 'src/app/services/game.service';
import { SwapiService } from 'src/app/services/swapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  title: String = 'sw-app';
  people: People[] = [];

  constructor( public gameService: GameService ) { }

  play() {
   this.gameService.play()
  }

}

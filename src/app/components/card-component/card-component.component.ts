import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { People } from 'src/app/models/people';
import { Starship } from 'src/app/models/starship';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class CardComponentComponent {
  
  @Input() data?: People | Starship;
  flip: string = 'inactive';
  subscription: any;

  constructor( public gameService: GameService ) { }


  ngOnChanges(changes: any) {
    this.subscription = this.gameService.isLoading$.subscribe({
      next: val => {
        this.flip =  val ? "inactive" : this.data ? "active" :  "inactive"
      }
    })
  }

  public onDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  isPeople(object: any): object is People  {
    return 'mass' in object;
  }

  isStarship(object: any): object is Starship  {
    return 'crew' in object;
  }
}


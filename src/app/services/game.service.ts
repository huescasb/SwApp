import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { People } from '../models/people';
import { Starship } from '../models/starship';
import { SwapiService } from './swapi.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoading$(): Observable<boolean> { 
    return this._loading$.asObservable();
  }

  people: People[] = [];
  starships: Starship[] = [];

  score: number[] = [0,0]
  resource: string = "people"
  selectedData: People[] | Starship[] = [];

  constructor(private swapi: SwapiService) { }


  play(){
    this._loading$.next(true);

    if (this.resource == "people"){
      this.swapi.getPeople().subscribe({
        next: res => {
          this.people = res;
          this.selectData()
          this._loading$.next(false)
        },
      })
    }else{
      this.swapi.getStarships().subscribe({
        next: res => {
          this.starships = res;
          this.selectData()
          this._loading$.next(false)
        },
      })
    }
  }

  selectData(){

    if (this.resource == "people"){
      this.selectedData = [
        this.people[Math.floor(Math.random()*this.people.length)], 
        this.people[Math.floor(Math.random()*this.people.length)],
      ]
      let reduce = this.selectedData.reduce(function(max, x) {
        return parseInt(x.mass) > parseInt(max.mass) ? x : max;
      })
      reduce.winner = true
  
      this.score[this.selectedData.indexOf(reduce)]++
    }else{
      this.selectedData = [
        this.starships[Math.floor(Math.random()*this.starships.length)], 
        this.starships[Math.floor(Math.random()*this.starships.length)],
      ]

      let reduce = this.selectedData.reduce(function(max, x) {
        return parseInt(x.crew) > parseInt(max.crew) ? x : max;
      })
      reduce.winner = true
  
      this.score[this.selectedData.indexOf(reduce)]++
    }

    
   
  }

  resetScore(){
    this.score = [0,0]
  }


}

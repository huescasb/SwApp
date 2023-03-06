import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { People } from '../models/people';
import { Starship } from '../models/starship';

@Injectable({
  providedIn: 'root'
})



export class SwapiService {

  API_URL: string = "https://swapi.dev/api/";

  constructor( private http: HttpClient) { }
  

  getPeople (url?: string, results: People[] = []) : Observable<People[]> {
    return this.http.get( url ? url : this.API_URL + "people")
    .pipe(
      switchMap((resp : any) => {
        return resp.next 
          ? this.getPeople(resp.next, [ ...results, ...resp.results]) 
          : of([...results, ...resp.results])
      })
    )
  }

  getStarships (url?: string, results: Starship[] = []) : Observable<Starship[]> {
    return this.http.get( url ? url : this.API_URL + "starships")
    .pipe(
      switchMap((resp : any) => {
        return resp.next 
          ? this.getPeople(resp.next, [ ...results, ...resp.results]) 
          : of([...results, ...resp.results])
      })
    )
  }

}


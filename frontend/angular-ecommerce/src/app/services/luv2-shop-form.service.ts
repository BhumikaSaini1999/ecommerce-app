import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; //Reactive Javascript Framework
import { Country } from '../common/country';
import { map } from 'rxjs/operators';
import { State } from '../common/state';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {
  private countriesUrl = environment.luv2shopApiUrl + '/countries';
  private statesUrl = environment.luv2shopApiUrl + '/states';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]>{
    //search url
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }

  //angular component will subscribe to this method to get the results of async call
  getCreditCardMonths(startMonth: number): Observable<number[]>{
    let data: number[] = [];

    //build an array for "Month" drop down list
    //start at current month and loop until month 12

    for(let theMonth = startMonth; theMonth<=12; theMonth++){
      data.push(theMonth);
    }
    return of(data);
  }

  getCreditCardYears(): Observable<number[]>{
    let data: number[] = [];

    //build an array for "Year" dropdown list
    //start at current year and loop for next 10 years

    const startYear: number = new Date().getFullYear(); //get the current Year
    const endYear: number = startYear+10;

    for(let theYear = startYear; theYear<=endYear; theYear++){
      data.push(theYear);
    }
    return of(data);
  }
}

interface GetResponseCountries{
  _embedded:{//Unwraps the JSON from Spring Data REST _embedded entry
    countries: Country[];
  }
}

interface GetResponseStates{
  _embedded:{//Unwraps the JSON from Spring Data REST _embedded entry
    states: State[];
  }
}
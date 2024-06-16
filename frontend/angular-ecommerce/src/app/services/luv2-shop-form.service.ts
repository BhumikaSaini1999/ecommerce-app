import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; //Reactive Javascript Framework

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  constructor() { }

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

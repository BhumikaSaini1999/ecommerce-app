import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private router: Router){}

  doSearch(value: string){
    console.log(`value=${value}`);
    //routing the data to search route
    this.router.navigateByUrl(`/search/${value}`);
  }
}

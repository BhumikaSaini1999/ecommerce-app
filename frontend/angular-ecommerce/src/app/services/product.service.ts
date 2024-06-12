import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable, map } from 'rxjs'; //Reactive javascript
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:9898/api/products';
  constructor(private httpClient: HttpClient) { }

 //Map the JSON data from Spring Data REST to Product array
  getProductList(): Observable<Product[]>{
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response=> response._embedded.products));
  }
}

interface GetResponse{
  _embedded: {
    products: Product[];
  }
}

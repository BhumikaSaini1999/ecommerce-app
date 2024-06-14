import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable, map } from 'rxjs'; //Reactive javascript
import { HttpClient } from '@angular/common/http';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:9898/api/products';
  private categoryUrl = 'http://localhost:9898/api/product-category';

  constructor(private httpClient: HttpClient) { }

 //Map the JSON data from Spring Data REST to Product array
  getProductList(theCategoryId: number): Observable<Product[]>{
    //need to build url based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response=> response._embedded.productCategory));
  }

  searchProducts(theKeyword: string): Observable<Product[]>{
     //need to build url based on keyword
     const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
     return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products));
  }
}

interface GetResponseProducts{
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}

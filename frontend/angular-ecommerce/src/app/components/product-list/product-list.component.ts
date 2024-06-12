import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  //templateUrl: './product-list.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];

  //Injecting ProductService to this component
  constructor(private productService: ProductService){}

  //Similar to @PostConstruct, executed after instantiation
  ngOnInit(): void {
    this.listProducts();
  }

  listProducts(){
    //Method is invoked once you subscribe,
    //this method will get executed in asynchronous fashion
    this.productService.getProductList().subscribe(
      data => {
        this.products = data; //assign results to Product array
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  //The ! is the non-null assertion operator. Tells Typescript compiler to suspend strict null 
  //and undefined checks for a property
  product!: Product;

  constructor(private productService: ProductService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    //get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = + this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(theProductId).subscribe(
      data=>{
        this.product = data;
      }
    )
  }

}

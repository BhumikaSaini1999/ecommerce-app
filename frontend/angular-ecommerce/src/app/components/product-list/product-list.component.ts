import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  currentCategoryId: number = 1;
  currentCategoryName: string = "";
  searchMode: boolean = false;

  //Injecting ProductService to this component
  //Injecting ActivatedRoute -> The current active route that loaded the component.
  //Useful for accessing route parameters.
  constructor(private productService: ProductService, private route: ActivatedRoute){}

  //Similar to @PostConstruct, executed after instantiation
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });
  }

  listProducts(){
    //passed in from the SearchComponent
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // now search for the products using keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data =>{
        this.products = data;
      }
    );
  }

  handleListProducts(){
    
    //check if "id" paramter is available from activated route
    //this.route -> Use the activated route
    //snapshot -> state of the route at this given moment in time
    //paramMap -> Map of all the route parameters
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      //get the "id" param string. convert string to number using "+" symbol
      //! -> non-null Assertion operator to tell the compiler that Object is not null
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
       // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }else{
      //not category id available ... default to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    //now get the products for a given category id
    //Method is invoked once you subscribe,
    //this method will get executed in asynchronous fashion
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data; //assign results to Product array
      }
    )
  }

}

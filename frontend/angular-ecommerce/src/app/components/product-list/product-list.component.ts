import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbPaginationModule],
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;

  currentCategoryName: string = "";
  searchMode: boolean = false;

  //new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string="";

  //Injecting ProductService to this component
  //Injecting ActivatedRoute -> The current active route that loaded the component.
  //Useful for accessing route parameters.
  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute){}

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

    //if we have a different keyword than previous then set thePageNumber to 1
    if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
    }
    this.previousKeyword = theKeyword;
    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    // now search for the products using keyword
    this.productService.searchProductsPaginate(theKeyword, this.thePageNumber-1, this.thePageSize).subscribe(this.processResult());
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

    //check if we have a different category than previous
    //Note: Angular will reuse a component if its currently being viewed
    
    //if we have a different category id than previous then set thePageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    //now get the products for a given category id
    //Method is invoked once you subscribe,
    //this method will get executed in asynchronous fashion

    //here this.thePageNumber pagination component for angular are 1 based
    // and on backend Spring Data REST: pages are 0 based
    this.productService.getProductListPaginate(this.currentCategoryId, this.thePageNumber - 1, this.thePageSize).subscribe(
     this.processResult());
  }

  updatePageSize(pageSize: string){
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult(){
    return (data: any)=>{
      //Left-hand side of assignment are properties defined in this class
      //Everything on right-hand side of assignment is data from Spring Data REST JSON
      this.products = data._embedded.products; //assign results to Product array
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  addToCart(theProduct: Product){
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }
}

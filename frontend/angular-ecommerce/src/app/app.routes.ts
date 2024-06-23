import { Router, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { LoginComponent } from './components/login/login.component';
import { MembersPageComponent } from './components/members-page/members-page.component';
import OktaAuth from '@okta/okta-auth-js';
import { Injector } from '@angular/core';
import { OrderHistoryComponent } from './components/order-history/order-history.component';


//app.routes.ts: Defines the routes for your application.
//main.ts: Configures the bootstrap with provideRouter to set up the routes.
//app.component.ts: Uses RouterOutlet to handle the routing.
//product-list.component.ts: Ensures the component is standalone

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector){
//Use injector to access any service available within your application
const router = injector.get(Router);

//Redirect the user to your custom login page
router.navigate(['/login']);
}

//Specifying routes from most specific to generic
export const routes: Routes = [
    //if authenticated give access to route else send to login page
    {path: 'order-history', component: OrderHistoryComponent, canActivate: [OktaAuthGuard], data:{
      onAuthRequired: sendToLoginPage
    } },

    //if authenticated give access to route else send to login page
    {path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard], data:{
      onAuthRequired: sendToLoginPage
    } },
    {path: 'login/callback', component: OktaCallbackComponent },
    {path: 'login', component: LoginComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'cart-details', component: CartDetailsComponent},
    {path: 'products/:id', component: ProductDetailsComponent},
    {path: 'search/:keyword', component: ProductListComponent},
    {path: 'category/:id/:name', component: ProductListComponent},
    {path: 'category', component: ProductListComponent},
    {path: 'products', component: ProductListComponent},
    {path: '', redirectTo: '/products', pathMatch: 'full'},//pathMatch: full means exact path
    {path: '**', redirectTo: '/products', pathMatch: 'full'}, //wildcard entry-> if nothing matches then execute this last
  ];

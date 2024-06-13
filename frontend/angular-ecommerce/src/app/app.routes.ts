import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';


//app.routes.ts: Defines the routes for your application.
//main.ts: Configures the bootstrap with provideRouter to set up the routes.
//app.component.ts: Uses RouterOutlet to handle the routing.
//product-list.component.ts: Ensures the component is standalone

//Specifying routes from most specific to generic
export const routes: Routes = [
    {path: 'category/:id/:name', component: ProductListComponent},
    {path: 'category', component: ProductListComponent},
    {path: 'products', component: ProductListComponent},
    {path: '', redirectTo: '/products', pathMatch: 'full'},//pathMatch: full means exact path
    {path: '**', redirectTo: '/products', pathMatch: 'full'}, //wildcard entry-> if nothing matches then execute this last
  ];

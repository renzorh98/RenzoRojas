import {Routes} from '@angular/router'
import {ProductsListComponent} from "./products-list/products-list.component";
import {ProductsAddComponent} from "./products-add/products-add.component";

export const routes: Routes = [
  {
    path: '', component: ProductsListComponent
  },
  {
    path: 'add', component: ProductsAddComponent
  },
  {
    path: 'edit', component: ProductsAddComponent
  }
]

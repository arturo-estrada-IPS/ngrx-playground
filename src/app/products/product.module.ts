import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { Routes, RouterModule } from "@angular/router";

import { StoreModule } from "@ngrx/store";
import { reducer } from "./state/product.reducer";

import { ProductShellComponent } from "./product-shell/product-shell.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";

const productRoutes: Routes = [
  { path: "", component: ProductShellComponent },
];

@NgModule({
  declarations: [
    ProductShellComponent,
    ProductListComponent,
    ProductEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(productRoutes),
    StoreModule.forFeature("products", reducer)
  ]
})
export class ProductModule { }

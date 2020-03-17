import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { StoreModule } from "@ngrx/store";
import { reducer } from "../products/state/product.reducer";

import { LoginComponent } from "./login/login.component";

const userRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", pathMatch: "full", redirectTo: "login" }
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes),
    StoreModule.forFeature("users", reducer)
  ]
})
export class UserModule { }

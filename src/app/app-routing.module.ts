import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShellComponent } from "./home/shell/shell.component";
import { WelcomeComponent } from "./home/welcome/welcome.component";
import { PageNotFoundComponent } from "./home/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    component: ShellComponent,
    children: [
      { path: "welcome", component: WelcomeComponent },
      {
        path: "products",
        loadChildren: "./products/product.module#ProductModule"
      },
      { path: "", pathMatch: "full", redirectTo: "welcome" }
    ]
  },
  {
    path: "user", loadChildren: "./user/user.module#UserModule"
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

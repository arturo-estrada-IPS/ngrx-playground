import { Component, OnInit, OnDestroy } from "@angular/core";
import { IProduct } from "../i-product";
import { Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { ProductService } from "../product.service";
import { productActions } from "../state/product.reducer";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html"
})
export class ProductListComponent implements OnInit, OnDestroy {

  pageTitle = "Products";
  products: IProduct[];
  selectedProduct: IProduct;
  displayCode: boolean;
  sub: Subscription;
  error: any;

  constructor(
    private store: Store<any>,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductCharges$
      .subscribe(selectedProduct => this.selectedProduct = selectedProduct);

    this.productService.getproducts()
      .subscribe({
        next: (products: IProduct[]) => this.products = products,
        error: (err: any) => this.error = err
      });

    this.store.pipe(select("products"))
      .subscribe((products) => {
        if (products) {
          this.displayCode = products.showProductCode;
        }
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(value: boolean): void {
    this.store.dispatch({
      type: productActions.TOGGLE_PRODUCT_CODE,
      payload: value
    });
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: IProduct): void {
    this.productService.changeSelectedProduct(product);
  }
}

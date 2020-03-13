import { Injectable } from "@angular/core";
import { IProduct } from "./i-product";
import { BehaviorSubject, of, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { handleError, setHeaders } from "../shared/utils";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private apiUrl = "api/products";
  private products: IProduct[];

  private selectedProductSource = new BehaviorSubject<IProduct | null>(null);
  selectedProductCharges$ = this.selectedProductSource.asObservable();

  constructor(private http: HttpClient) { }

  changeSelectedProduct(selectedProduct: IProduct | null): void {
    this.selectedProductSource.next(selectedProduct);
  }

  getproducts(): Observable<IProduct[]> {
    if (this.products) {
      return of(this.products);
    }

    return this.http.get<IProduct[]>(this.apiUrl)
      .pipe(
        tap((data: IProduct[]) => this.products = data),
        tap((data: IProduct[]) => data),
        catchError(handleError<IProduct[]>("getProducts", []))
      );
  }

  newProduct(): IProduct {
    return {
      productName: "",
      productCode: "",
      description: "",
      starRating: 0
    };
  }

  createProduct(product: IProduct): Observable<IProduct> {
    const headers = setHeaders();
    product.id = null;
    return this.http.post<IProduct>(this.apiUrl, product, { headers })
      .pipe(
        tap(data => {
          this.products.push(data);
        }),
        catchError(handleError<IProduct>("createProduct"))
      );
  }

  deleteProduct(id: number): Observable<{}> {
    const headers = setHeaders();
    return this.http.delete<IProduct>(`${this.apiUrl}/${id}`, { headers })
      .pipe(
        tap(() => {
          const foundIndex = this.products.findIndex((item) => item.id === id);
          if (foundIndex > -1) {
            this.products.splice(foundIndex, 1);
          }
        }),
        catchError(handleError<IProduct>("deleteProduct", null))
      );
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    const headers = setHeaders();
    return this.http.post<IProduct>(`${this.apiUrl}/${product.id}`, { headers })
      .pipe(
        tap(() => {
          const foundIndex = this.products.findIndex(item => item.id === product.id);
          if (foundIndex > -1) {
            this.products[foundIndex] = product;
          }
        }),
        map(() => product),
        catchError(handleError<IProduct>("updateProduct", product))
      );
  }
}

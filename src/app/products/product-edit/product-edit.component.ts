import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IProduct } from "../i-product";
import { Subscription } from "rxjs";
import { GenericValidator } from "src/app/shared/generic-validator";
import { ProductService } from "../product.service";
import { NumberValidator } from "src/app/shared/number-validator";

@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
})
export class ProductEditComponent implements OnInit {
  pageTitle = "Product Edit";
  errors: any;
  productForm: FormGroup;
  product: IProduct | null;
  sub: Subscription;
  displayMessage: { [key: string]: string } = {};

  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.validationMessages = {
      productName: {
        required: "Product name is required.",
        minlength: "Product name must be at least three characters.",
        maxlength: "Product name cannot exceed 50 characters."
      },
      productCode: {
        required: "Product code is required."
      },
      starRating: {
        range: "Rate the product between 1 (lowest) and 5 (highest)."
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      productCode: ["", Validators.required],
      starRating: ["", NumberValidator.range(1, 5)],
      description: ""
    });

    this.sub = this.productService.selectedProductCharges$.subscribe(
      selectedProduct => this.displayProduct(selectedProduct)
    );

    this.productForm.valueChanges.subscribe(
      () => this.displayMessage = this.genericValidator.processMessages(this.productForm)
    );
  }

  ngDestroy(): void {
    this.sub.unsubscribe();
  }

  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.productForm);
  }

  displayProduct(product: IProduct | null): void {
    this.product = product;

    if (this.product) {
      this.productForm.reset();

      if (this.product.id === 0 || !this.product.id) {
        this.pageTitle = "Add Product";
      } else {
        this.pageTitle = `Edit Product ${this.product.productName}`;
      }

      this.productForm.patchValue({
        productName: this.product.productName,
        productCode: this.product.productCode,
        starRating: this.product.starRating,
        description: this.product.description
      });
    }
  }

  cancelEdit(): void {
    this.displayProduct(this.product);
  }

  deleteProduct(): void {
    if (this.product && this.product.id) {
      if (confirm(`Àre you sure you want to delete ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () => this.productService.changeSelectedProduct(null),
          error: (err: any) => this.errors = err
        });
      }
    }
  }

  saveProduct(): void {
    if (this.productForm.valid && this.productForm.dirty) {
      const p = { ...this.product, ...this.productForm.value };

      if (p.id === 0) {
        this.productService.createProduct(p).subscribe(
          product => this.productService.changeSelectedProduct(product),
          (err: any) => this.errors.message = err.error
        );
      } else {
        this.productService.updateProduct(p).subscribe(
          product => this.productService.changeSelectedProduct(product),
          (err: any) => this.errors.message = err.error
        );
      }
    } else {
      this.errors.message = "Please correct the validation errors.";
    }
  }
}

import { ValidatorFn, AbstractControl } from "@angular/forms";

export class NumberValidator {
  static range(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value && (isNaN(control.value) || control.value < min || control.value > max)) {
        return { range: true };
      }
      return null;
    };
  }
}

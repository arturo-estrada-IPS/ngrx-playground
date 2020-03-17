import { Observable, of } from "rxjs";
import { HttpHeaders, HttpErrorResponse } from "@angular/common/http";

export function handleError<T>(operation: string = "operation", result?: T) {
  return (error: HttpErrorResponse): Observable<T | any> => {
    if (error.error instanceof ErrorEvent) {
      let err: any;
      err = error.error;

      console.error(operation, error.error.message);
      console.error(operation, error.status);

      return of(err);
    } else {
      console.error(operation, error);
      return of(result as T);
    }
  };
}

export function setHeaders(): any {
  return new HttpHeaders({ "Content-Type": "application/json" });
}

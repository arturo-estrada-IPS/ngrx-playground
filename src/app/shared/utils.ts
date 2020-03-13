import { Observable, of } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

export function handleError<T>(operation: string = "operation", result?: T) {
  return (error: any): Observable<T> => {
    console.error(operation, error);
    return of(result as T);
  };
}

export function setHeaders(): any {
  return new HttpHeaders({ "Content-Type": "application/json" });
}

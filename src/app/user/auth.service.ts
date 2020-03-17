import { Injectable } from "@angular/core";
import { IUser } from "./i-user";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  currentUser: IUser | null;
  redirectUrl: string;

  constructor() { }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(username: string, password: string): void {
    this.currentUser = {
      id: 2,
      username,
      isAdmin: false
    };
  }

  logout(): void {
    this.currentUser = null;
  }
}

import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { userActions } from "../state/user.reducer";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {

  pageTitle = "Login";
  errorMessage: string;
  maskUserName: boolean;

  constructor(
    private store: Store<any>,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.pipe(select("users"))
      .subscribe((users) => {
        if (users) {
          this.maskUserName = users.maskUserName;
        }
      });
  }

  cancel(): void {
    this.router.navigate(["welcome"]);
  }

  checkedChanged(value: boolean): void {
    this.store.dispatch({
      type: userActions.MASK_USER_NAME,
      payload: value
    });
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const username = loginForm.form.value.username;
      const password = loginForm.form.value.password;

      this.authService.login(username, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(["/products"]);
      }
    } else {
      this.errorMessage = "Please enter a valid username and password";
    }
  }

}

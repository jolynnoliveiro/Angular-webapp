import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountService } from './services/account.service';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular-webapp';
  public isLogin = false;
  public roleId = 0;
  
  constructor(public accountService: AccountService, public router: Router, public navBar: NavbarComponent) { 
    this.isLogin = accountService.isLoggedIn;
    this.roleId = accountService.roleId;

    this.accountService.refreshObservable.subscribe(() => {
      this.isLogin = this.accountService.isLoggedIn;
      this.roleId - this.accountService.roleId;
    })
  }

  ngOnInit(): void {
  }


  logout() {
    this.navBar.notifications = 0;
    this.accountService.logout().then(
      () => {
        this.isLogin = this.accountService.isLoggedIn;
        this.router.navigate(['/']);
      }
    )
  }


}

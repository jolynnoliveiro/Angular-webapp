import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Users } from '../models/users';
import { AccountService } from '../services/account.service';
import { AdminService } from '../services/admin.service';

declare let $: any;
declare let M: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isLogin = false;
  public roleId = 0;

  public businessOpen = false;
  public notifications = 0;

  public notificationList = Object.assign({});

  constructor(public accountService: AccountService, public router: Router, public adminService: AdminService) { 
    this.isLogin = accountService.isLoggedIn;
    this.roleId = accountService.roleId;

    this.accountService.refreshObservable.subscribe(() => {
      this.isLogin = this.accountService.isLoggedIn;
      this.roleId - this.accountService.roleId;
    })
  }

  ngOnInit(): void {
    $('.modal').modal({ preventScrolling: false });
    this.getBusinessHourOnOff();
    this.getNotification();
  }

  logout() {
    this.accountService.logout().then(
      () => {
        this.isLogin = this.accountService.isLoggedIn;
        this.router.navigate(['/']);
      }
    )
  }

  getBusinessHourOnOff() {
    this.adminService.getBusinessHourOnOff({}).then (
      (res) => {
        this.businessOpen = res[0].is_open;

      }, rej => {
       
      }
    )
  }

  getNotification() {
    this.adminService.getNotification({}).then (
      (res) => {
        this.notifications = res.length;

      }, rej => {
       
      }
    )
  }

  testClick() {
    M.Modal.getInstance($('#modal-notification')).open();
    this.adminService.getNotification({}).then (
      (res) => {
        this.notificationList = res;
        
      }, rej => {
       
      }
    )
  }

}

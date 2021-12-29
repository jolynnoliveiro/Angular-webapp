import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Users } from '../models/users';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public isLoggedIn = false;
  public currentUser: Users = new Users();
  public roleId = 0;
  refreshSubject: Subject<boolean>;
  refreshObservable: Observable<boolean>;

  constructor(private myHttp: HttpService) { 
    this.refreshSubject = new Subject();
    this.refreshObservable = this.refreshSubject.asObservable();
    const acc = localStorage.getItem('account');
    if (acc) {
      this.isLoggedIn = true;
      this.currentUser = JSON.parse(acc);
      this.roleId = this.currentUser.role_id;
    }
  }

  login(data: any): Promise<any> {
    return new Promise((resolve,reject) => {
      const url = 'http://localhost:3000/api/login';
      this.myHttp.postData(url,data)
      .subscribe((res: any) => {
        this.setCurrentUser(res[0]);
        
        resolve(res);
      }, (error) => {
        reject(error);
       })
      })
    }

    signup(data: any): Promise<any> {
      return new Promise((resolve,reject) => {
        const url = 'http://localhost:3000/api/signup';
        this.myHttp.postData(url,data)
        .subscribe((res: any) => {
          this.setCurrentUser(res[0]);

          resolve(res);
        }, (error) => {
          reject(error);
         })
        })
      }

    logout(): Promise<any> {
      return new Promise ((resolve, reject) => {
        this.isLoggedIn = false;
        this.currentUser = new Users();
        localStorage.removeItem('account');
        resolve(null);
      })
    }

    setCurrentUser(user: Users) {
      this.currentUser = user;
      this.isLoggedIn = true;
      this.roleId = user.role_id;
      localStorage.setItem('account', JSON.stringify(this.currentUser));
    }
}

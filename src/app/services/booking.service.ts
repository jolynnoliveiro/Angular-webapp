import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private myHttp: HttpService ) { }
  getBookingDateTime(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/api/getAvailabilityDateTime';
      this.myHttp.postData(url, data)
      .subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error);
      })
    })
  }

  createBookingOrder(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/api/createBookingOrder';
      this.myHttp.postData(url, data)
      .subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error);
      })
    })
  }

}

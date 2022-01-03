import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private myHttp: HttpService ) { }
  
  getBusinessHourOnOff(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/api/getBusinessHourOnOff';
      this.myHttp.postData(url, data)
      .subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error);
      })
    })
  }

  updateBusinessHourOnOff(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/api/updateBusinessHourOnOff';
      this.myHttp.postData(url, data)
      .subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error);
      })
    })
  }

  getUploadRecords(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/api/getUploadRecords';
      this.myHttp.postData(url, data)
      .subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error);
      })
    })
  }

  postDownloadPDFFile(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/api/postPDF';
      this.myHttp.postDataPDF(url, data)
      .subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error);
      })
    })
  }

  getBookedOrders(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/api/getBookedOrders';
      this.myHttp.postData(url, data)
      .subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error);
      })
    })
  }

  getNotification(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/api/getNotification';
      this.myHttp.postData(url, data)
      .subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error);
      })
    })
  }

 createOrder(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/api/createOrder';
      this.myHttp.postData(url, data)
      .subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error);
      })
    })
  }

  //  
  getBookedOrdersByUserId(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/api/getBookedOrdersByUserId';
      this.myHttp.postData(url, data)
      .subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error);
      })
    })
  }

  //  
  getUploadRecordsByUserId(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/api/getUploadRecordsByUserId';
      this.myHttp.postData(url, data)
      .subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error);
      })
    })
  }

}

import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

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

  createUploadFileRecord(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/api/createUploadFileRecord';
      this.myHttp.postData(url, data)
      .subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error);
      })
    })
  }

  httpUploadFile(data: File): Promise<any> {
    return new Promise((resolve, reject) =>{
      const url = 'http://localhost:3000/api/uploadFile';
      this.myHttp.postDataForm(url,data)
      .subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error);
       })
    })
  }

  httpUploadFileV2(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/api/uploadFile';
      this.myHttp.postDataFormV2(url, data)
      .subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error);
      })
    })
  }

}

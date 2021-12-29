import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private myHttp: HttpService) { }

  testHttpGet(): Promise<any> {
    return new Promise((resolve,reject) => {
      const url = 'http://localhost:3000/api/getUser';
      this.myHttp.getData(url)
      .subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error);
      })
    })
  }

testHttpPost(data: any): Promise<any> {
  return new Promise((resolve,reject) => {
    const url = 'http://localhost:3000/api/getUser';
    this.myHttp.postData(url,data)
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


}
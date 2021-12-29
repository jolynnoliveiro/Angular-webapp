import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  serverURL = "";

  constructor(private http: HttpClient) { }

  getData(serverURL: string, headers?: HttpHeaders) {
    this.serverURL = serverURL;
    return this.http.get(this.serverURL, {
      headers: headers
    }).pipe(map(res => res));
  }

  postData(serverURL: string, data: any, headers?: HttpHeaders) {
    this.serverURL = serverURL;
    return this.http.post(this.serverURL, JSON.stringify(data), {
      headers: headers
    }).pipe(map(res => res ));
  }

  postDataForm(serverURL: string, data: File, headers?: HttpHeaders) {
    const formData = new FormData();
    formData.append('pdf', data, data.name);

    this.serverURL = serverURL;
    return this.http.post(this.serverURL, formData);
  }
}

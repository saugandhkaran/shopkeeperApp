import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  constructor(private http: HttpClient) { }

  registerMobile(mobileData) {
    const uri = 'http://localhost:4000/mobile/register';
    const obj = mobileData;
    return this.http.post(uri, obj);
  }

  getMobileData() {
    const uri = 'http://localhost:4000/mobile';
    return this.http.get(uri);
  }

  updateMobileStatus(status, id) {
    const uri = 'http://localhost:4000/mobile/update/' + id;
    return this.http.post(uri, {id: id, status: status });
  }

  getBillDetails(id) {
    const uri = 'http://localhost:4000/mobile/' + id;
    return this.http.get(uri);
  }

  updateMobileDetails(data) {
    const uri = 'http://localhost:4000/mobile/update/' + data._id;
    return this.http.post(uri, {data : data});
  }
}


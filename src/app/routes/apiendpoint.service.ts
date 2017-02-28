import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppSettings } from './appsettings';

@Injectable()
export class ApiEndpointService {

  constructor(private http: Http) {}


  getStringValue(text: string = '') {
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let params = new URLSearchParams();
    if (text && text !== '') {
      params.set('value', text);
    }
    return this.http.get(`${AppSettings.ApiEndpoint}stringvalue`, { search: params }, { headers: headers })
      .map((res: Response) => res.json());
  };
}

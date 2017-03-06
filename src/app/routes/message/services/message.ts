import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppSettings } from '../../appsettings';

@Injectable()
export class MessageLoggingService {

  constructor(private http: Http) {}

  getLoggings(page = 1, limit = 10,
    StartTime ? : string,
    EndTime ? : string,
    Sort ? : string,
    Order ? : string) {
    let params = new URLSearchParams();
  
    if (Order && Order !== '') {
      params.set('Order', Order);
    }
    if (Sort && Sort !== '') {
      params.set('Sort', Sort);
    }
    if (StartTime && StartTime !== '') {
      params.set('StartTime', StartTime);
    }
    if (EndTime && EndTime !== '') {
      params.set('EndTime', EndTime);
    }

    return this.http.get(`${AppSettings.ApiEndpoint}messagelogging/${limit}/${page}`, { search: params })
      .map((res: Response) => res.json());
  };

  getLoggingId(id: number) {
    return this.http.get(`${AppSettings.ApiEndpoint}messagelogging/${id}`)
      .map((res: Response) => res.json());
  }
}

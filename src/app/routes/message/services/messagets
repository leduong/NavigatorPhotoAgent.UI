import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppSettings } from '../../appsettings';

@Injectable()
export class MessageService {

  constructor(private http: Http) {}
  getMessages(page = 1, limit = 10, 
    Sort ? : string,
    Order ? : string, 
    StartTime ? : string, 
    EndTime ? : string) {
    let params = new URLSearchParams();
    params.set('currentPageIndex', String(page-1));
    params.set('pageSize', String(limit));
    if (Order && Order !== '') {
      params.set('Order', Order);
    }    if (Sort && Sort !== '') {
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

  getMessageId(id: number) {
    return this.http.get(`${AppSettings.ApiEndpoint}messagelogging/${id}`)
      .map((res: Response) => res.json());
  };

}
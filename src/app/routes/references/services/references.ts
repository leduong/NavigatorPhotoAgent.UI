import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppSettings } from '../../appsettings';

@Injectable()
export class ReferencesService {

  constructor(private http: Http) {}
  getFeedManagement(page = 1, limit = 10, photoTag ? : string, startDate ? : string, endDate ? : string) {
    let params = new URLSearchParams();
    params.set('currentPageIndex', String(page-1));
    params.set('pageSize', String(limit));
    if (photoTag && photoTag !== '') {
      params.set('photoTag', photoTag);
    }
    if (startDate && startDate !== '') {
      params.set('startDate', startDate);
    }
    if (endDate && endDate !== '') {
      params.set('endDate', endDate);
    }

    return this.http.get(`${AppSettings.ApiEndpoint}FeedManagement`, { search: params })
      .map((res: Response) => res.json());
  };
}

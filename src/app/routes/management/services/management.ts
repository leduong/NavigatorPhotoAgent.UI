import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppSettings } from '../../../appsettings';
import { PrettyXMLService } from '../../../shared/services/prettyxml';

@Injectable()
export class ManagementLoggingService {

  constructor(private http: Http, private prettyXML:PrettyXMLService) {}

  getLoggings(page = 1, limit = 10,
    Method ? : string,
    StartTime ? : string,
    EndTime ? : string,
    FieldsList ? : string,
    Level ? : string,
    StatusCode ? : string,
    Sort ? : string,
    Order ? : string) {
    let params = new URLSearchParams();
    if (FieldsList && FieldsList !== '') {
      params.set('FieldsList', FieldsList);
    }
    if (Level && Level !== '') {
      params.set('Level', Level);
    }
    if (Method && Method !== '') {
      params.set('Method', Method);
    }
    if (StatusCode && StatusCode !== '') {
      params.set('StatusCode', StatusCode);
    }
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

    return this.http.get(`${AppSettings.ApiEndpoint}httplogging/${limit}/${page}`, { search: params })
      .map((res: Response) => res.json());
  };

  getLoggingId(id: number) {
    return this.http.get(`${AppSettings.ApiEndpoint}httplogging/${id}`)
      .map((res: Response) => res.json());
  };
  getLoggingXmlId(id: string) {
    return this.http.get(`${AppSettings.ApiEndpoint}httplogging/xml/${id}`)
      .map((res: Response) => res.ok?this.prettyXML.getParsedXML(res.text()):res.text());
  };
  getLoggingExceptionId(id: string){
    return this.http.get(`${AppSettings.ApiEndpoint}httplogging/exception/${id}`)
        .map((res: Response) => res);
  }
}

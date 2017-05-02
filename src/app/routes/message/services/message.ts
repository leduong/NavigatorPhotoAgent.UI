import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppSettings } from '../../appsettings';
import {PrettyXMLService} from "../../../shared/services/prettyxml";

@Injectable()
export class MessageLoggingService {

  constructor(private http: Http, private prettyXML: PrettyXMLService) {}

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
  getLoggingXmlId(id: string) {
    return this.http.get(`${AppSettings.ApiEndpoint}httplogging/xml/${id}`)
        .map((res: Response) => res.ok?this.prettyXML.getParsedXML(res.text()):res.text());
  };
}

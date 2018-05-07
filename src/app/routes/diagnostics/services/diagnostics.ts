import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

import { AppSettings } from '../../../appsettings';

@Injectable()
export class DiagnosticsService {

  constructor(private http: Http) {}
  getDiagnostics() {
    // return this.http.get(`${AppSettings.ApiEndpoint}Diagnostics`).map((res: Response) => res.json());
    return this.http.get(`${AppSettings.ApiEndpoint}Diagnostics`).pipe(map(res => res.json()));
  }

}

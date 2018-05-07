import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

import { AppSettings } from '../../../appsettings';

@Injectable()
export class MessageLoggingService {

    constructor(private http: Http) {}
    getMessageLogging(page = 1, limit = 10) {
        return this.http.get(`${AppSettings.ApiEndpoint}messagelogging/${limit}/${page}`)
            .pipe(map(res => res.json()));
    };
}



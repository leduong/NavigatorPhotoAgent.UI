import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import Rx from 'rxjs/Rx'

import { AppSettings } from '../../../appsettings';
import { DiagnosticsService } from '../services/diagnostics';

import { OAuthSettings } from '../../../oauthsettings';

@Component({
    selector: 'diagnostics',
    providers: [DiagnosticsService],
    templateUrl: 'app/routes/diagnostics/components/diagnostics.html'
})

export class DiagnosticsComponent implements OnInit {
    private timer;
    build: string = AppSettings.build;
    ApiEndpoint: string = AppSettings.ApiEndpoint;
    ApiAttraction: string = AppSettings.ApiAttraction;
    ApiMaps: string = AppSettings.ApiMaps;
    ApiReports: string = AppSettings.ApiReports;
    ng2ENV: string = AppSettings.ng2ENV;
    @Input() diagnostics: any[] = [];

    OAuthSetting: OAuthSettings = OAuthSettings;

    constructor(private diagnosticsService: DiagnosticsService) { }

    getDiagnostics() {
        this.diagnosticsService.getDiagnostics().subscribe(
            data => { this.diagnostics = data; },
            err => console.error(err),
            () => console.log('done loading diagnostics')
        );
    }
    ngOnInit() {
        this.timer = Rx.Observable.interval(1000).subscribe(() => { this.getDiagnostics(); });
    }

    ngOnDestroy() {
        this.timer.unsubscribe();
    }
}

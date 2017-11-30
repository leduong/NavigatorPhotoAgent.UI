import { Component, ViewEncapsulation, HostBinding, OnInit } from '@angular/core';
import { SettingsService } from './core/settings/settings.service';
declare var $: any;

import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './oauthsettings';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  encapsulation: ViewEncapsulation.None,
  providers: [OAuthService]
})
export class AppComponent implements OnInit {

  @HostBinding('class.layout-fixed') get isFixed() {
    return this.settings.layout.isFixed;
  };
  @HostBinding('class.aside-collapsed') get isCollapsed() {
    return this.settings.layout.isCollapsed;
  };
  @HostBinding('class.layout-boxed') get isBoxed() {
    return this.settings.layout.isBoxed;
  };
  @HostBinding('class.layout-fs') get useFullLayout() {
    return this.settings.layout.useFullLayout;
  };
  @HostBinding('class.hidden-footer') get hiddenFooter() {
    return this.settings.layout.hiddenFooter;
  };
  @HostBinding('class.layout-h') get horizontal() {
    return this.settings.layout.horizontal;
  };
  @HostBinding('class.aside-float') get isFloat() {
    return this.settings.layout.isFloat;
  };
  @HostBinding('class.offsidebar-open') get offsidebarOpen() {
    return this.settings.layout.offsidebarOpen;
  };
  @HostBinding('class.aside-toggled') get asideToggled() {
    return this.settings.layout.asideToggled;
  };
  @HostBinding('class.aside-collapsed-text') get isCollapsedText() {
    return this.settings.layout.isCollapsedText;
  };

  constructor(public settings: SettingsService
    , private oauthService: OAuthService
    , private router: Router) {
    this.configureWithNewConfigApi();
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    let discoverPromise = this.oauthService.loadDiscoveryDocument();

    //try get id_token
    let hashStr = window.location.hash;
    if (~hashStr.indexOf('#id_token')) {
      let self = this;
      discoverPromise.then(() => {
        self.oauthService.tryLogin({ customHashFragment: hashStr.substring(hashStr.indexOf('#id_token')) })
      });
    }
  }

  ngOnInit() {
    $(document).on('click', '[href="#"]', e => e.preventDefault());
  }
}

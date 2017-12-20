import { Component, OnInit, ViewChild } from '@angular/core';

import { SettingsService } from '../../core/settings/settings.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

import * as screenfull from 'screenfull';
import * as browser from 'jquery.browser';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: 'app/layout/header/header.component.html'
})
export class HeaderComponent implements OnInit {
  isNavSearchVisible: boolean;
  @ViewChild('fsbutton') fsbutton; // the fullscreen button

  constructor(private settings: SettingsService, private oauthService: OAuthService, private router: Router) { }

  ngOnInit() {
    this.isNavSearchVisible = false;
    if (browser.msie) { // Not supported under IE
      this.fsbutton.nativeElement.style.display = 'none';
    }
  }

  logoff() {
    this.oauthService.logOut();
    this.router.navigate(["/login"]);
  }

  get name() {
    let claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }

  get familyName() {
    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['family_name'];
  }

  toggleUserBlock(event) {
    event.preventDefault();
  }

  openNavSearch(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setNavSearchVisible(true);
  }

  setNavSearchVisible(stat: boolean) {
    this.isNavSearchVisible = stat;
  }

  getNavSearchVisible() {
    return this.isNavSearchVisible;
  }

  toggleOffsidebar() {
    this.settings.layout.offsidebarOpen = !this.settings.layout.offsidebarOpen;
  }

  toggleCollapsedSideabar() {
    this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
  }

  isCollapsedText() {
    return this.settings.layout.isCollapsedText;
  }

  toggleFullScreen(event) {

    if (screenfull.enabled) {
      screenfull.toggle();
    }
    // Switch icon indicator
    let el = $(this.fsbutton.nativeElement);
    if (screenfull.isFullscreen) {
      el.children('em').removeClass('fa-expand').addClass('fa-compress');
    } else {
      el.children('em').removeClass('fa-compress').addClass('fa-expand');
    }
  }
}

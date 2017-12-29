import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SettingsService } from '../../core/settings/settings.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap';
import { UserProfileService, UserProfileInterface } from "../../login/services/userProfile.service"

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
  @ViewChild('UserProfileModal') public UserProfileModal: ModalDirective;
  userProfile: UserProfileInterface = <UserProfileInterface>{};

  profileForm: FormGroup;


  constructor(private settings: SettingsService
    , private oauthService: OAuthService
    , private router: Router
    , private userProfileService: UserProfileService
    , fb: FormBuilder) {

    //form validation
    this.profileForm = fb.group({
      'firstName': [null],
      'lastName': [null],
      'address': [null],
      'address2': [null],
      'city': [null],
      'state': [null],
      'country': [null]
    });
  }

  profileClick() {
    this.profileForm.disable();
    this.userProfileService.getUserProfile();
    this.UserProfileModal.show();
  }

  profileFormSubmit($ev, values) {
    $ev.preventDefault();
    for (let c in this.profileForm.controls) {
      this.profileForm.controls[c].markAsTouched();
    }
    if (this.profileForm.valid) {
      this.userProfileService.updateUserProfile(values);
    }
  }

  hideUserProfileModal() {
    this.UserProfileModal.hide();
  }

  ngOnInit() {
    this.isNavSearchVisible = false;
    if (browser.msie) { // Not supported under IE
      this.fsbutton.nativeElement.style.display = 'none';
    }

    this.userProfileService.userProfile.subscribe(val => {
      this.userProfile = val;

      console.log(val);
      var controls = this.profileForm.controls;
      this.profileForm.controls['firstName'].setValue(val['firstName']);
      controls['lastName'].setValue(val['lastName']);
      controls['address'].setValue(val['address']);
      controls['address2'].setValue(val['address2']);
      controls['city'].setValue(val['city']);
      controls['state'].setValue(val['state']);
      controls['country'].setValue(val['country']);

      this.profileForm.enable();
    });
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
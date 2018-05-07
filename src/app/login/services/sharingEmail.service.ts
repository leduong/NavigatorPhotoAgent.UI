import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import Rx from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharingEmailService {
  private emailSource = new BehaviorSubject<string>("");
  currentEmail = this.emailSource.asObservable();
  constructor() { }
  changeEmail(email: string) {

    var splittedEmail = email.split("@");
    var firstPart = splittedEmail[0];
    var newEmail = firstPart.substring(0, 1) + "x".repeat(firstPart.length - 1) + "@" + splittedEmail[1];

    this.emailSource.next(newEmail);
  }
}
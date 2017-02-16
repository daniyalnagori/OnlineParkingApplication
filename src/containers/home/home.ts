import { Observable } from 'rxjs/Rx';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../providers'
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'home',
  template: require('./home.html'),
  styles: [require("./home.scss")],
  encapsulation: ViewEncapsulation.None
})
export class HomeContainer {
  isAdmin: boolean = false;
  specificJobs$: Observable<any>;
  allReservations$: Observable<any>;
  allRes$: Observable<any>;
  uuid: string;

  constructor(private fs: FirebaseService, private router: Router) {
  }

  ngOnInit() {

    this.fs.returnAccountType()
      .subscribe(data => {
        if (data.type == 1) { this.isAdmin = true }
      });

    this.fs.checkUserAuth()
      .take(1)
      .subscribe(auth => this.uuid = auth.uid);

    this.allReservations$ = this.fs.getAllReservations();

    this.allRes$ = this.fs.getAllRes();
  }

  deleteUserBooking(e) {
    this.fs.delUserBooking(e)
      .then(() => alert("successfully deleted User booking"))
      .catch(err => console.log(err + "an error occured"));
  }

  bookSlot(e) {
    this.fs.bookSlot(e)
      .then(() => alert("successfully booked your slot"))
      .catch(err => console.log(err + "an error occured in booking slot"));
  }

}

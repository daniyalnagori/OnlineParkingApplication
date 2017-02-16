import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../providers'

@Component({
  selector: 'signin',
  template: require('./signin.html'),
  styles: [require("./signin.scss")]
})
export class SigninContainer {

  constructor(private router: Router, private fs: FirebaseService) {
  }

  ngOnInit() { }

  loginUser(e) {
    this.fs.login(e.email, e.password)
      .then(auth => {
        alert("logged in successfully");
        this.router.navigate(['home']);
      })
      .catch(err => console.log(err + "an error occured"));
  }

  createAccount(e) {
    this.fs.signup(e.email, e.password)
      .then(auth => {
        let extraDetails = e;
        delete extraDetails.email;
        delete extraDetails.password;
        this.fs.saveExtraDetails(auth.uid, extraDetails)
          .then(() => this.router.navigate(['home']));
      })
      .catch(err => console.log(err + "An error occured"));
  }

}

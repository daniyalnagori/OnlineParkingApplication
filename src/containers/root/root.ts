import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../providers'
declare let firebase: any;

@Component({
  selector: 'root',
  template: require('./root.html'),
  styles: [require('./root.scss')],
  encapsulation: ViewEncapsulation.None
})
export class RootContainer {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private fs: FirebaseService, private router: Router) { }

  ngOnInit() {


    this.fs.checkUserAuth()
      .subscribe(auth => {
        if (auth !== null) {
          this.isLoggedIn = true;
          this.fs.returnAccountType()
            .subscribe(data => {
              if (data.type == 1) { this.isAdmin = true }
            })

        } else {
          this.isLoggedIn = false;
        }
      })
  }

  logout() {
    this.fs.logOutUser()
      .then(() => this.router.navigate(['signin']));
  }

}

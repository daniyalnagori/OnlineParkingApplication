import { Observable } from 'rxjs/Rx';
import { Component, ViewEncapsulation } from '@angular/core';
import { FirebaseService } from '../../providers'

@Component({
    selector: 'bookings',
    template: require('./myBookings.html'),
    styles: [require('./myBookings.scss')],
    encapsulation: ViewEncapsulation.None
})
export class BookingsContainer {
    myJobs$: Observable<any>;

    constructor(private fs: FirebaseService) { }

    ngOnInit() {
        console.log("ngOnInit")
        this.myJobs$ = this.fs.getMyBookings();
    }

    deleteUserBooking(e) {
        this.fs.delUserBooking(e)
            .then(() => alert("successfully deleted your booking"))
            .catch(err => console.log(err + "an error occured"));
    }

}

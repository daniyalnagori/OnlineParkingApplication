import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'my-bookings-component',
    template: require('./myBookings.html'),
    styles: [require("./myBookings.scss")]
})
export class myBookingsComponent {
    @Input() myBookings;
    @Output() removeBookings = new EventEmitter;

    constructor() { }

    ngOnInit() {
    };

    print(index) {
        // var printHtml = document.getElementById(index).outerHtml;
        // var currentPage = document.body.innerHTML;
        // var elementPage = '<html><head><title></title></head><body>' + printHtml + '</body>';
        // //change the body
        // document.body.innerHTML = elementPage;
        //print
        window.print();
        //go back to the original
        // document.body.innerHTML = currentPage;
    }

    removeUserBooking(key, uid, l, s) {
        let Obj = { 'key': key, 'uid': uid, 'location': l, 'slot': s, }
        this.removeBookings.emit(Obj);
    }

}

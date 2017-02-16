import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

declare var Number: any;
Number.prototype.between = function (a, b) {
    var min = Math.min.apply(Math, [a, b]),
        max = Math.max.apply(Math, [a, b]);
    return this > min && this < max;
};

@Component({
    selector: 'parking-slots-component',
    template: require('./parkingSlotsComponent.html'),
    styles: [require("./parkingSlotsComponent.scss")]
})
export class ParkingSlotsComponent {
    @Output() bookSlot = new EventEmitter;
    @Output() removeBooking = new EventEmitter;
    @Input() allReservations;
    @Input() allRes;
    @Input() isAdmin;
    bookSlotForm: FormGroup;
    selectedSlot: number;
    error: string;

    /////////////////////////
    currentIn: any;
    currentOut: any;
    /////////////////////////

    selectedLocation: number;
    condo: any;
    loc0: any[] = [0, 1, 2, 3, 4, 5, 6, 7];
    // loc1: any[] = [0, 1, 2, 3, 4, 5];
    // loc2: any[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    slots: any[] =
    [{ 'slot': 0, 'isReserved': false }, { 'slot': 1, 'isReserved': false }, { 'slot': 2, 'isReserved': false },
    { 'slot': 3, 'isReserved': false }, { 'slot': 4, 'isReserved': false }, { 'slot': 5, 'isReserved': false }, { 'slot': 6, 'isReserved': false },
    { 'slot': 7, 'isReserved': false }];

    hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    selectHours = [1, 2, 3, 4, 5, 6];

    constructor(private fb: FormBuilder) {

        this.bookSlotForm = fb.group({
            'date': "2017-01-12",
            'startHours': 6,
            'selectHours': 3,
            'selectedSlot': '',
            'selectedLocation': 0
        });
    };

    returnCustomUnix(hour) {
        let date = new Date;
        return date.setHours(hour);
    }

    slotButton(slotIndex, slotLocation) {
        this.selectedSlot = slotIndex;
        this.selectedLocation = slotLocation;
    };


    ngOnInit() {
        setTimeout(() => {
            this.checkReservation(6, 3)
        }, 2000);
    }


    checkReservation(startHours1, selectHours1) {
        this.currentIn = startHours1;
        this.currentOut = parseInt(startHours1) + parseInt(selectHours1);;

        let currentIn = startHours1;
        let currentOut = parseInt(startHours1) + parseInt(selectHours1);

        for (let d in this.allReservations) {
            delete this.allReservations[d]['$exists'];
            delete this.allReservations[d]['$key'];
            Object.keys(this.allReservations[d]).map(e => {
                console.log("map", this.allReservations[d][e]);
                Object.keys(this.allReservations[d][e]).map(f => {
                    console.log("map0", this.allReservations[d][e][f]);
                    let dbIn = this.allReservations[d][e][f]['startHours'];
                    let dbOut = this.allReservations[d][e][f]['selectHours']

                    console.log(dbIn, '<=', parseInt(currentIn), '&&', parseInt(currentIn), '>=', dbOut)
                    if (dbIn <= parseInt(currentIn) && parseInt(currentIn) >= dbOut) {

                        console.log(dbIn <= parseInt(currentIn), parseInt(currentIn) >= dbOut)
                        console.log("If condition is running");

                        if (this.slots[this.allReservations[d][e][f]['selectedSlot']]) {
                            this.slots[this.allReservations[d][e][f]['selectedSlot']].isReserved = false;
                        }
                    }
                    else if (parseInt(currentIn) < dbIn) {
                        console.log(parseInt(currentIn) < dbIn)
                        console.log(parseInt(currentIn), '<', dbIn)
                        console.log("ELSE IF condition is running");

                        if (this.slots[this.allReservations[d][e][f]['selectedSlot']]) {
                            this.slots[this.allReservations[d][e][f]['selectedSlot']].isReserved = false;
                        }
                    } else {

                        console.log("ELSE condition is running");

                        if (this.slots[this.allReservations[d][e][f]['selectedSlot']]) {
                            this.slots[this.allReservations[d][e][f]['selectedSlot']].isReserved = true;
                        }
                    }

                })
            })
        }
    }

    submitForm(value: any) {
        console.log(moment().isAfter(value.date, 'year'));

        if (moment().isAfter(value.date, 'day')) {
            alert("Please Select a Future Date!");
            return false;
        }

        console.log(this.currentIn, this.currentOut, value.date);
        for (let d in this.allReservations) {
            delete this.allReservations[d]['$exists'];
            delete this.allReservations[d]['$key'];
            Object.keys(this.allReservations[d]).map(e => {
                Object.keys(this.allReservations[d][e]).map(f => {
                    let dbIn = this.allReservations[d][e][f]['startHours'];
                    let dbOut = this.allReservations[d][e][f]['selectHours']
                    if (parseInt(this.currentIn).between(parseInt(dbIn), parseInt(dbOut))) {
                        console.log("submit if")
                        this.error = "Your Selected Time is conflicting with Other User's time";
                        return false;
                    } else if (parseInt(this.currentIn) < parseInt(dbIn) && parseInt(this.currentOut) >= parseInt(dbOut)) {
                        console.log("submit else if")
                        this.error = "Your Selected Time is conflicting with Other User's time";
                        return false;
                    }

                })
            })
        }

        let formValues = Object.assign({}, value);
        if (!this.selectedSlot) {
            alert("Please select a parking slot first");
            return;
        }
        formValues['selectHours'] = parseInt(formValues['startHours']) + parseInt(formValues['selectHours']);
        formValues['selectedSlot'] = this.selectedSlot;
        formValues['selectedLocation'] = this.selectedLocation;
        formValues['status'] = true;
        formValues['timestamp'] = firebase.database['ServerValue'].TIMESTAMP;
        this.bookSlot.emit(formValues);
        this.error = null;
    };

    removeUserBooking(key, uid, l, s) {
        let Obj = { 'key': key, 'uid': uid, 'location': l, 'slot': s }
        console.log("Obj Compoen")
        this.removeBooking.emit(Obj);
    }

}
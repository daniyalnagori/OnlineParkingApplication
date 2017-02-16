import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

declare var $;

@Component({
    selector: 'login-component',
    template: require('./loginComponent.html'),
    styles: [require("./loginComponent.scss")],
})
export class LoginComponent {
    @Output() loginDetails = new EventEmitter;
    @Output() registrationDetails = new EventEmitter;
    loginForm: FormGroup;
    registerForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.loginForm = fb.group({
            'email': '',
            'password': ''
        })
        this.registerForm = fb.group({
            'email': '',
            'password': '',
            'name': ''
        })
    };

    ngOnInit() {
        $(() => {
            $('#login-form-link').click(function (e) {
                $("#login-form").delay(100).fadeIn(100);
                $("#register-form").fadeOut(100);
                $('#register-form-link').removeClass('active');
                $(this).addClass('active');
                e.preventDefault();
            });
            $('#register-form-link').click(function (e) {
                $("#register-form").delay(100).fadeIn(100);
                $("#login-form").fadeOut(100);
                $('#login-form-link').removeClass('active');
                $(this).addClass('active');
                e.preventDefault();
            });

        });
    }

    loginSubmitForm(value: any): void {
        console.log(value);
        this.loginDetails.emit(value);
    }
    registerSubmitForm(value: any): void {
        console.log(value);
        this.registrationDetails.emit(value);
    }



}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'feedback-component',
    template: require('./feedbackComponent.html'),
    styles: [require("./feedbackComponent.scss")]
})
export class feedbackComponent {
    @Input() isAdmin = false;
    @Input() uuid;
    @Input() userFeedbacks;
    @Output() feedback = new EventEmitter;
    @Output() replyOfFeedback = new EventEmitter;
    feedbackForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.feedbackForm = fb.group({
            'feedback': ''
        })
    }

    ngOnInit() {
        setTimeout(() => {
            console.log("asdas", this.uuid);
        }, 2000);
    };

    submitForm(value: any): void {
        console.log(value);
        this.feedback.emit(value);
    }

    reply(key, value) {
        console.log(key, value);
        let obj = {
            'postKey': key,
            'replyText': value
        }

        this.replyOfFeedback.emit(obj);
    }

}

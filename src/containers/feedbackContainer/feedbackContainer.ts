import { Component, ViewEncapsulation } from '@angular/core';
import { FirebaseService } from '../../providers'

@Component({
    selector: 'feedback',
    template: require('./feedbackContainer.html'),
    styles: [require('./feedbackContainer.scss')],
    encapsulation: ViewEncapsulation.None
})
export class FeedbackContainer {
    isAdmin: boolean = false;
    userFeedbacks$;
    uuid;
    constructor(private fs: FirebaseService) { }

    ngOnInit() {

        this.fs.returnAccountType()
            .subscribe(data => {
                if (data.type == 1) { this.isAdmin = true }
            });
        this.fs.getUserDetails()
            .subscribe(data => {
                this.uuid = data['$key'];
            })

        this.userFeedbacks$ = this.fs.getAllFeedbacks();

    }

    saveFeedback(e) {
        this.fs.getUserDetails()
            .subscribe(data => {
                e['name'] = data.name;
                this.fs.saveFeedback(e)
                    .then(() => alert("Feedback Saved Successfully"))
                    .catch(err => console.log(err + "an error occured"))
            });
    }

    replyToFeedback(e) {
        this.fs.replyToFeedback(e)
            .then(() => alert('successfully replied'))
            .catch((err) => console.log(err + 'an error occured'));
    }

}

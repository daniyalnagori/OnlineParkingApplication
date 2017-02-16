import { AuthProviders, AuthMethods } from 'angularfire2';

export class AppConfig {
    config: {
        firebaseConfig: { apiKey: string, authDomain: string, databaseURL: string, storageBucket: string },
        firebaseAuthConfig: { provider: any, method: any };
    };

    constructor(env: string = 'dev') {
        if (env === 'dev') {
            this.config = {
                'firebaseConfig': {
                    apiKey: "AIzaSyAIIGke87XLesUCKCKyoSYY2YEw664fsuY",
                    authDomain: "parkingapplication-e7d3f.firebaseapp.com",
                    databaseURL: "https://parkingapplication-e7d3f.firebaseio.com",
                    storageBucket: "parkingapplication-e7d3f.appspot.com"
                },
                firebaseAuthConfig: { provider: AuthProviders.Password, method: AuthMethods.Password }
            };
        } else {
            this.config = {
                'firebaseConfig': {
                    apiKey: "AIzaSyAIIGke87XLesUCKCKyoSYY2YEw664fsuY",
                    authDomain: "parkingapplication-e7d3f.firebaseapp.com",
                    databaseURL: "https://parkingapplication-e7d3f.firebaseio.com",
                    storageBucket: "parkingapplication-e7d3f.appspot.com"
                },
                firebaseAuthConfig: { provider: AuthProviders.Password, method: AuthMethods.Password }
            };
        }
    }
}

export let appConfig = new AppConfig('dev');

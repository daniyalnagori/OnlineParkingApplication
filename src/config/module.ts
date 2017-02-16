import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { MomentModule } from 'angular2-moment';
import { RootContainer } from '../containers/root/root';
import { ApplicationComponents, AppRoutes } from './routes';
import { providers } from '../providers';
import { Pipes } from "../pipes"
import { appConfig } from './appConfig';

@NgModule({
  imports: [
    BrowserModule
    , RouterModule.forRoot(AppRoutes)
    , FormsModule
    , HttpModule
    , AngularFireModule.initializeApp(appConfig.config.firebaseConfig, appConfig.config.firebaseAuthConfig)
    , MomentModule
    , ReactiveFormsModule
  ]
  , declarations: [RootContainer, ...ApplicationComponents, ...Pipes]
  , providers: [...providers]
  , entryComponents: []
  , bootstrap: [RootContainer]
})
export class AppModule { }

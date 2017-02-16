import 'reflect-metadata';
import 'core-js';
import 'zone.js/dist/zone';
import 'moment/moment'
import 'angular2-moment'
import 'jquery';
import 'bootstrap'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './module';

document.addEventListener('DOMContentLoaded', function main(): void {
  platformBrowserDynamic().bootstrapModule(AppModule);
});
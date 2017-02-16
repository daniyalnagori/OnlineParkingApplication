import { Routes } from '@angular/router';

import { Containers, HomeContainer, SigninContainer, RootContainer, BookingsContainer, FeedbackContainer } from '../containers';
import { Components } from "../components";

// import AuthGuard service which will help to prevent users from entering homepage without authentication
import { AuthGuardService } from '../providers/index';

export const AppRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  , { path: "home", component: HomeContainer, canActivate: [AuthGuardService] }
  , { path: "signin", component: SigninContainer }
  , { path: "myBookings", component: BookingsContainer }
  , { path: "feedback", component: FeedbackContainer }
];

export const ApplicationComponents: any[] = [
  Containers
  , Components
];
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { ValidateService } from "../services/validate.service";
import { FlashMessageService } from '../services/flash-message.service';
import { AuthService } from "../services/auth.service";
import { AuthGuardService } from '../services/auth-guard.service';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { HttpModule } from '@angular/http';

var appRoutes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuardService]},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FlashMessagesModule, 
    HttpModule
  ],
  providers: [
    ValidateService, 
    AuthService, 
    FlashMessageService,
    AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

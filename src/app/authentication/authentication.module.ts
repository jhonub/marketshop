import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './error404/error404.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthenticationRoutes } from './authentication.routing';



@NgModule({
  declarations: [
    Error404Component, 
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes)
  ]
})
export class AuthenticationModule { }

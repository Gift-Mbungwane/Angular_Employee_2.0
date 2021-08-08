import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgAlertModule } from '@theo4u/ng-alert';

import { AppComponent } from './app.component';
import { AlertComponent } from './directives';
import { AuthGuard } from './guards';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './helpers';
import { AlertService, AuthenticationService, UserService } from './services';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';

import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { EmployeeService } from './services/employee.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PusherService } from './services/pusher.service';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';



@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CreateEmployeeComponent,
    ListEmployeeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    NgAlertModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
    EmployeeService, PusherService],
  bootstrap: [AppComponent]
})
export class AppModule { }

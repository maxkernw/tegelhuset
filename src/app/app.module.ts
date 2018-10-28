import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularFire2';
import { AngularFireDatabaseModule } from 'angularFire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { EffectsModule } from '@ngrx/effects';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { FirebaseEffects } from './store/effects/firebase.effects';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseCredentials = {
  apiKey: 'AIzaSyBheISbFYtGXXvq89KT8y20DJmvMT8SzVk',
  authDomain: 'tegelv2.firebaseapp.com',
  databaseURL: 'https://tegelv2.firebaseio.com',
  projectId: 'tegelv2',
  storageBucket: 'tegelv2.appspot.com',
  messagingSenderId: '1053223905500'
};

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    EffectsModule.forRoot([FirebaseEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AngularFireModule.initializeApp(firebaseCredentials),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

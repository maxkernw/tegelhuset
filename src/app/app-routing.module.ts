import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { CalendarComponent } from './calendar/calendar.component';

export const routes: Routes = [
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

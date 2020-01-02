import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { PatientComponent } from './components/patient/patient.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'patient' },
  { path: 'login', component: LogInComponent },
  { path: 'patient', component: PatientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
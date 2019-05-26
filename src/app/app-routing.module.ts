import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '../app/components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecieptComponent } from './components/reciept/reciept.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path : 'dashboard', component: DashboardComponent },
  { path: 'generateReciept', component: RecieptComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  // Default route, points to LoginComponent
  { path: '', component: LoginComponent },

  // Other routes (if any)
  // { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  
  // Optional: Wildcard route if no matching path
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

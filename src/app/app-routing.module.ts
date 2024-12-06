import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SettingComponent } from './setting/setting.component';
const routes: Routes = [
  // Default route, points to LoginComponent
  { path: '', component: LoginComponent },

  // Other routes (if any)
  // { path: 'home', component: HomeComponent },
  
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingComponent },
  { path: 'login', component: LoginComponent},
  { path: 'transactions', component: TransactionsComponent },
  
  // Optional: Wildcard route if no matching path
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

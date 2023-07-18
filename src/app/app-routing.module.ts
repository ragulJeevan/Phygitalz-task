import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// dashboard module routing
const dashboardModule = () => import('./modules/dashboard/dashboard-routing.module').then(x => x.DashboardRoutingModule);
//issues module routing
const issueModule = () => import('./modules/issue/issue-routing.module').then(x=>x.IssueRoutingModule);

const routes: Routes = [
  {path:'dashboard',loadChildren:dashboardModule},
  {path:'',loadChildren:issueModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

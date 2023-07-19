import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarChartComponent } from './dashboard/bar-chart/bar-chart.component';
import { LineChartComponent } from './dashboard/line-chart/line-chart.component';


@NgModule({
  declarations: [
    DashboardComponent,
    BarChartComponent,
    LineChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }

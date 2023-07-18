import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueRoutingModule } from './issue-routing.module';
import { IssueListComponent } from './issue-list/issue-list.component';
import { CreateIssueComponent } from './create-issue/create-issue.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IssueListComponent,
    CreateIssueComponent
  ],
  imports: [
    CommonModule,
    IssueRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    IssueListComponent,
    CreateIssueComponent
  ]
})
export class IssueModule { }

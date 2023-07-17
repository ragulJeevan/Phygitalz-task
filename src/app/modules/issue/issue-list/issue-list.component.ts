import { Component,OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { IssueService } from 'src/app/services/issue.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {

  public issueData : any =[];


  constructor(
    private commonService:CommonService,
    private issueService:IssueService
  ){

  }


  ngOnInit(): void {
    this.getUserList();
    this.getIssues();
  }

  getUserList(){
    let url = 'users'
    this.commonService.getUser(url).subscribe((res:any)=>{
     
    },((err:any)=>{
      console.log(err.error);
      
    }))
  }
  getIssues(){
    let url = 'issueDetails';
    this.issueService.getIssue(url).subscribe((res:any)=>{
      this.issueData = res ? res : [];
    })
  }
}

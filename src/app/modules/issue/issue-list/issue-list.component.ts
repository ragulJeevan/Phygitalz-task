import { Component,OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { IssueService } from 'src/app/services/issue.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {
// VARIABLE TO STORE ISSUE DETAILS 
  public issueData : any =[];
  // VARIBALE TO STORE TOTAL ISSUE COUNT 
  public totalIssue : number = 0;
  // VARIBALE TO STORE OPEN ISSUE COUNT 
  public openIssue : number = 0;
  // VARIBALE TO STORE RESOLVED ISSUE COUNT 
  public resolvedIssue : number = 0;
  // VARIBALE TO STORE CLOSED ISSUE COUNT 
  public closedIssue : number = 0;
  // VARIABLE TO STORE SHOW ISSUES STATUS 
  public assignedStatus : string = 'assigned_to_me';
  // VARIABLE TO STORE RELATED ISSUE 
  public relatedStatus : string = 'school';
  // VARIABLE TO STORE ISSUE STATUS 
  public typeStatus : string = 'open';
  // VARIABLE TO STORE CURRENT ASSIGNEE 
  public  currentAssignee : string = 'VISHAL';
  // VARIABLE TO STORE CREATED USER 
  public createdUser : string = 'VISHAL';


  constructor(
    private commonService:CommonService,
    private issueService:IssueService,
    private modalService: NgbModal,
  ){

  }


  ngOnInit(): void {
    this.getUserList();
    // this.getIssues();
    this.filteredIssues('','');
  }
// TO GET USER DETAILS 
  getUserList(){
    let url = 'users'
    this.commonService.getUser(url).subscribe((res:any)=>{
     
    },((err:any)=>{
      console.log(err.error);
      
    }))
  }
  // TO GET ISSUE DETAILS 
  getIssues(){
    let url = 'issueDetails';
    this.issueService.getIssue(url).subscribe((res:any)=>{
      let responseData = res ? res : [];
      let openCount = responseData?.filter((x:any)=>x.issue_status == 'open');
      this.openIssue = openCount?.length;
      let resolvedCount = responseData?.filter((x:any)=>x.issue_status == 'resolved');
      this.resolvedIssue = resolvedCount?.length;
      let closeCount = responseData?.filter((x:any)=>x.issue_status == 'closed');
      this.closedIssue = closeCount?.length;
      if(this.assignedStatus == 'assigned_to_me'){
        this.issueData = responseData.filter((x:any)=> 
        x.issue_related_to == this.relatedStatus &&
        x.assigned_to == this.currentAssignee &&
        x.issue_status == this.typeStatus );
      }else{
        this.issueData = responseData.filter((x:any)=> 
        x.issue_related_to == this.relatedStatus &&
        x.created_by == this.createdUser &&
        x.issue_status == this.typeStatus );
      }
    
    },((err:any)=>{
      console.log(err.error);
      
    }))
  }
// TO FILTER ISSUES 
  filteredIssues(issueStatus:string,filterStatus:string){
      if(issueStatus == 'show Issues'){
        this.assignedStatus = filterStatus
      }
      if(issueStatus == 'issue_related'){
        this.relatedStatus = filterStatus;
      }
      if(issueStatus == 'status'){
        this.typeStatus = filterStatus;
      }
      this.getIssues();
  }
// TO OPEN CREATE ISSUE MOPDAL
openCreateIssue(modal: any) {
  this.modalService.open(modal, {
    size: 'xl',
    ariaLabelledBy: 'modal-basic-title',
    backdrop: 'static',
    keyboard: false,
    windowClass: 'custom-modal' 
  });
}
closeModal(event:any) {
  if(event){
    this.filteredIssues('','');
    this.modalService.dismissAll();
  }
  }

}

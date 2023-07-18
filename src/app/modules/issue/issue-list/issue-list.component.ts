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
  // TO STORE SELECTED ISSUE 
  public selectedIssue:any;
  // TO STORE SEARCHED TEXT 
  public search_key : any = '';
  // TO IDENTIFY SEARCH 
  public isSearch : boolean = false;


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
      let filteredData:any;
      if(this.assignedStatus == 'assigned_to_me'){
        filteredData = responseData.filter((x:any)=> 
        x.issue_related_to == this.relatedStatus &&
        x.assigned_to == this.currentAssignee);
      }else{
        filteredData = responseData.filter((x:any)=> 
        x.issue_related_to == this.relatedStatus &&
        x.created_by == this.createdUser);
      }
        let openCount = filteredData?.filter((x:any)=>x.issue_status == 'open');
        this.openIssue = openCount?.length;
        let resolvedCount = filteredData?.filter((x:any)=>x.issue_status == 'resolved');
        this.resolvedIssue = resolvedCount?.length;
        let closeCount = filteredData?.filter((x:any)=>x.issue_status == 'closed');
        this.closedIssue = closeCount?.length;
        this.issueData = filteredData.filter((x:any)=>x.issue_status == this.typeStatus);
    
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
// TO CLOSE CREATE ISSUE MODAL 
closeModal(event:any) {
  if(event){
    this.filteredIssues('','');
    this.modalService.dismissAll();
  }
  }
  // TO OPEN DELETE MODAL 
  openDeleteModal(modal: any,data:any){
    this.selectedIssue = data;
    this.modalService.open(modal, {
      size: 'sm',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'custom-modal' 
    });
  }
// TO CLOSE DELETE MODAL 
  closeDeleteModal(){
    this.modalService.dismissAll();
  }
  // TO DELETE SELECTED ISSUE 
  deleteItem(){
    let url = 'issueDetails';
    let id = this.selectedIssue.id;
    this.issueService.deleteIssue(url,id).subscribe((res:any)=>{
      alert('Issue Deleted Succesfuylly');
      this.closeDeleteModal();
      this.filteredIssues('','');
    },((err:any)=>{
      console.log(err.error);
      
    }))
  }
  // TO SEARCH ISSUE  
  searchIssues(){
    if(this.search_key != ''){
      this.issueData = this.issueData.filter((x:any)=>
    x.id == this.search_key ||
    x.issue_description  == this.search_key ||
    x.assigned_to == this.search_key ||
    x.due_date == this.search_key ||
    x.issue_type == this.search_key 
    );
    this.isSearch = true;
    }else{
      this.filteredIssues('','');
      this.isSearch = false;
    }
    
  }

}

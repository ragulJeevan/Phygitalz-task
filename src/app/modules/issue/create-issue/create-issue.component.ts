import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { Issue } from 'src/app/models/issue';
import { CommonService } from 'src/app/services/common.service';
import { IssueService } from 'src/app/services/issue.service';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit {

  @Output() closeIssue = new EventEmitter<any>();

  // TO STORE FORM DATA 
  public issueForm!: FormGroup;
  // VARIABLE TO STORE ISSUE DATA 
  public issueData: any = [];
  // VARIABLE TO STORE ISSUE TYPE 
  public issueType: any = [];
  // VARIBALE TO STORE ISSUE SUB TYPE 
  public issueSubType: any = [];
  // VARIABLE TO STORE SELECTED  TYPE 
  public selectedType: any = null;
  // VARIABLE TO STORE ISSUE RELATED TO 
  public issueRelated : string = '';
  // VARIABLE TO STORE ASSIGNEE 
  public assignee : any = [];
  // VARIABLE TO STORE LOGGED IN ASSIGNEE 
  public currentUser : string = 'VISHAL';

  constructor(
    private commonService: CommonService,
    private issueService: IssueService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getIssues();
    // TO INITIALIZE FORM 
    this.issueForm = this.formBuilder.group({
      id: [null, Validators.required],
      issue_description: [null, Validators.required],
      issue_related_to: [null, Validators.required],
      issue_type: [null, Validators.required],
      issue_sub_type: [null, Validators.required],
      due_date: [null, Validators.required],
      assigned_to: [null, Validators.required],
      attachements: [{}]
    });
  }
  // TO CREATE ISSUE 
  createIssue() {

    let issuesCount = this.issueData?.length ? this.issueData?.length : 7;
    let issue_id: any;
    if (issuesCount != 0) {
      issue_id = issuesCount + 1001;
    }
    this.issueForm.patchValue({
      id: issue_id ? issue_id : null,
      issue_type : this.selectedType?.issue_type_name ? this.selectedType?.issue_type_name : '',
      issue_related_to : this.issueRelated ? this.issueRelated : ''
    })
    if (this.issueForm.invalid) {
      // this.toastr.error('Please fill in all mandatory fields');
      alert('Please fill in all mandatory fields');
      return;
    }

    let issueDetails = this.issueForm.value;
    let url = 'issueDetails';
    let payLoad: Issue = {
      id: issueDetails.id,
      issue_description: issueDetails.issue_description,
      issue_related_to: issueDetails.issue_related_to,
      issue_type: issueDetails.issue_type,
      issue_sub_type: issueDetails.issue_sub_type,
      due_date: issueDetails.due_date,
      assigned_to: issueDetails.assigned_to,
      created_by:this.currentUser,
      issue_status:'open',
      attachements: issueDetails.attachements,
    };
    this.issueService.postIssue(url, payLoad).subscribe((res: any) => {
      // this.toastr.success('Issue Created Successfully');
      alert('Issue Created Successfully');
      this.resetForm();
      this.closeModal();
    }, ((err: any) => {
      console.log(err.error);
      if (err.error && err.error.message) {
        // this.toastr.error(err.error.message);
        alert(err.error.message);
      }

    }))

  }
  // TO GET ISSUE DETAILS 
  getIssues() {
    let url = 'issueDetails';
    this.issueService.getIssue(url).subscribe((res: any) => {
      this.issueData = res ? res : [];
    })
  }
  // TO AVAIL ALL RELATED ISSUE DETAILS 
  relatedIssue(data: any) {
    this.resetForm();
   this.issueRelated = data;
   this.getIssueType(data);
   this.getUser();
  }

  // TO GET ISSUE TYPE 
  getIssueType(item: any) {
    let url = 'issue_type'
    this.issueService.getIssue(url).subscribe((res: any) => {
      if (res && res.data) {
        let responseData = res?.data ? res?.data : [];
        this.issueType = responseData ? responseData?.filter((x: any) => x.issue_related_to == item) : [];
      }
    }, ((err: any) => {
      console.log(err.error);

    }))
  }
  // TO ANALYSE ISSUE SUBTYPE 
  haveSubType() {
    if (this.selectedType.is_sub_type) {
      this.getIssueSubType(this.selectedType);
    } else {
      this.issueSubType = [];
      this.issueSubType.push(this.selectedType);
    }

  }
  // TO GET ISSUE SUB TYPE 
  getIssueSubType(data: any) {
    let url = 'issue_sub_type'
    this.issueService.getIssue(url).subscribe((res: any) => {
      if (res && res.data) {
        let responseData = res?.data ? res?.data : [];
        this.issueSubType = responseData ? responseData?.filter((x: any) => x.issue_category_id == data.issue_category_id) : [];
      }
    }, ((err: any) => {
      console.log(err.error);

    }))
  }
  // TO GET USERS 
  getUser(){
    let url = 'users';
    this.commonService.getUser(url).subscribe((res:any)=>{
      if(res){
        if(this.issueRelated == 'school'){
          this.assignee = res ? res?.facultyData : [];
        }else{
          this.assignee = res?  res?.studentData : [];
        }
      }
    },((err:any)=>{
      console.log(err.error);
      
    }))
  }
  // TO REST FORM 
  resetForm(){
    this.issueForm.reset();
    this.selectedType = null;
    this.issueRelated= '';
    this.issueType = [];
    this.issueSubType = [];
    this.assignee = [];
  }
  // TO CLOSE MODAL 
  closeModal(){
    this.closeIssue.emit(true);
  }
}

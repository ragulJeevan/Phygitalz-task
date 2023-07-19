import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { P } from '@antv/g2plot';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { IssueService } from 'src/app/services/issue.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  showFirstChart: boolean = false;
showSecondChart: boolean = false;

  // TO STORE ADMISSION DATA 
  public admissionData: any = [];
  // TO STORE YEAR DATA 
  public yearData: any = [];
  // TO STORE BRANCH DATA 
  public branchData: any = [];
  // TO STORE UNIVERSITYDATA
  public universityData: any = [];
  // TO STORE SELECTED YEAR 
  public selectedYear: number = 2011;
  // TO STORE SELECTED UNIVERSITY
  public selectedUniversity: string = 'ANNA';
  // TO STORE SELECTED BRANCH
  public selectedBranch: string = 'MECH';
  // TO STORE FILTERED ADMISSION DATA 
  public filteredData: any = [];

 
  constructor(
    private commonService: CommonService,
  ) {

  }

  ngOnInit(): void {
    this.commonService.setStateHeaader('Dashboard');
    this.getData();

    this.getAdmissionData();

    setTimeout(() => {
      this.showFirstChart = true;
      setTimeout(() => {
        this.showSecondChart=true;
      }, 1000);
    }, 1000);

  }

  
  // TO GET FILTER DATAS 
  getData() {
    let url = 'chartDatas';
    this.commonService.getUser(url).subscribe((res: any) => {
      if (res.data) {
        this.yearData = res?.data ? res?.data.year : [];
        this.branchData = res?.data ? res?.data.branch : [];
        this.universityData = res?.data ? res?.data.university : [];
      }
    }, ((err: any) => {
      console.log(err.error);
    }))
  }
  // TO GET ADMISSION DETAILS 
  getAdmissionData() {
    let url = 'chartDetails';
    this.commonService.getUser(url).subscribe((res: any) => {
      if (res.data) {
        this.admissionData = res?.data ? res?.data : [];
        this.filterData();
        console.log(this.admissionData);

      }
    }, ((err: any) => {
      console.log(err.error);
    }))
  }
  //  TO FILTER STORED DATA 
  filterData() {
    console.log(this.selectedYear);
    console.log(this.selectedUniversity);
    console.log(this.selectedBranch);
    this.filteredData = this.admissionData?.filter((x: any) =>
    x.year == this.selectedYear &&
    x.university == this.selectedUniversity  &&
    x.Branch == this.selectedBranch
  );
   
    console.log(this.filteredData);
  }
}

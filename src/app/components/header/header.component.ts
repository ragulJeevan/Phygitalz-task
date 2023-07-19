import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // TO STORE LOGGEDIN USER 
  public currentLogger: string = 'VISHAL';
  // STATE HEADER 
  public stateHeader : string = ''

  constructor(
    private commonService : CommonService,
  ){}

  ngOnInit(): void {
   this.commonService.getStateHeader.subscribe((data:any)=>{this.stateHeader = data});


  }

}

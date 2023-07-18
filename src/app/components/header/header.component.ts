import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // TO STORE LOGGEDIN USER 
  public currentLogger : string = 'VISHAL';
  ngOnInit(): void {
   console.log(this.currentLogger);
   
  }

}

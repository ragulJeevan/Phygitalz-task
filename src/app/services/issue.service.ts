import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/envioronments/environment';
import { Issue } from '../models/issue';

const baseurl = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(
    private http : HttpClient,
  ) { }


  // ISSUE RELATED GET API 
  getIssue(url:string){
    return this.http.get(`${baseurl}/${url}`);
  }

// ISSUE RELATED POST API 
postIssue(url:string,payLoad:any){
  return this.http.post(`${baseurl}/${url}`,payLoad);
}

// ISSUE RELATED DELETE API 
deleteIssue(url:string,id:number){
  return this.http.delete(`${baseurl}/${url}/${id}`);
}

}

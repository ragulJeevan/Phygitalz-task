import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/envioronments/environment';

const baseurl = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient,
  ) { }
  // TO GET USERS 
  getUser(url: string) {
    return this.http.get(`${baseurl}/${url}`);
  }

}

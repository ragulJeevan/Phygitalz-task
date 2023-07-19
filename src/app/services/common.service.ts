import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/envioronments/environment';

const baseurl = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _stateHeader = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
  ) { }

    setStateHeaader(data:any){if(data){this._stateHeader.next(data)}};
    get getStateHeader() { return this._stateHeader.asObservable(); }
  // TO GET USERS 
  getUser(url: string) {
    return this.http.get(`${baseurl}/${url}`);
  }

}

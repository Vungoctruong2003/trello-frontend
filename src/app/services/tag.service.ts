import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class TagService {

  id: any;

  constructor(private http: HttpClient) {
  }

  addUser(data: any): Observable<any> {
    let token = localStorage.getItem('access_token');
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    };
    return this.http.post<any>(API_URL + '/tag/addMember', data, header);
  }

  getId() {
    return this.id
  }

  setId(id: any) {
    this.id = id
  }
}

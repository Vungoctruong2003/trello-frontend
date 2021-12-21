import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  userGroupId: any
  constructor(
    private http: HttpClient,
  ) { }

  createGroup(data: any): Observable<any>{
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization",`Bearer ${token}`)
    }
    return this.http.post<any>(API_URL + '/group/store', data,header);
  }

  addUserToGroup(data: any): Observable<any>{
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization",`Bearer ${token}`)
    }
    return this.http.post<any>(API_URL + '/group/addUser', data,header);
  }

  getUser(id: number): Observable<any>{
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization",`Bearer ${token}`)
    }
    return this.http.get<any>(API_URL + '/group/getUser/'+ id,header);
  }

  changeRole(data:any, id:any):Observable<any>{
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization",`Bearer ${token}`)
    }
    return this.http.put<any>(API_URL + '/group/changeRole/'+ id,data,header);
  }

  getRole(id: any): Observable<any>{
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization",`Bearer ${token}`)
    }
    return this.http.get<any>(API_URL + '/group/getRole/'+ id,header);
  }

  delete(data:any):Observable<any>{
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization",`Bearer ${token}`)
    }
    return this.http.post<any>(API_URL + '/group/delete' ,data,header);
  }

  outGroup(id:any):Observable<any>{
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization",`Bearer ${token}`)
    }
    return this.http.get<any>(API_URL + '/group/outGroup/'+ id,header);
  }

}

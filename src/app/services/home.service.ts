import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  listGroup(){
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization",`Bearer ${token}`)
    }
    return this.http.get<any>(API_URL + '/group/index',header);
  }

  listBoard(){
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization",`Bearer ${token}`)
    }
    return this.http.get<any>(API_URL + '/board/index',header);
  }

}

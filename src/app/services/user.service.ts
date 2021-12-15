import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(API_URL + '/auth/register', data);
  }

  changePassword(data: any): Observable<any> {
    let token = localStorage.getItem('access_token');
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    };
    return this.http.post<any>(API_URL + '/auth/change-pass', data, header);
  }

  getAvatar():Observable<any>{
    let token = localStorage.getItem('access_token');
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    };
    return this.http.get<any>(API_URL + '/auth/getAvatar', header);
  }

  updateAvatar(avatar: string):Observable<any>{
    let token = localStorage.getItem('access_token');
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    };
    return this.http.post<any>(API_URL + '/auth/updateAvatar',avatar ,header);
  }
}

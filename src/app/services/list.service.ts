import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})
export class ListService {

  boardId?:number

  constructor(
    private http: HttpClient,
  ) { }

  createList(data: any): Observable<any> {
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    }
    return this.http.post<any>(API_URL + '/list/store', data, header);
  }

  getBoardId(): number | undefined {
    return this.boardId
  }

  setBoardId(id: number) {
    return this.boardId = id
  }
}

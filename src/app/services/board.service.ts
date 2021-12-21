import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  groupId: any
  boardId?: number
  listId?: number

  constructor(private http: HttpClient) {
  }

  listBoard(data: any) {
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    }
    return this.http.post<any>(API_URL + '/board/store', header);
  }

  updateCard(data: { cards: any }) {
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    }
    return this.http.post<any>(API_URL + '/card/changeSeq', data, header);
  }

  listCard(id: number) {
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    }
    return this.http.get<any>(API_URL + '/list/index/' + id, header);
  }

  updateLists(data: { lists: any }) {
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    }
    return this.http.post<any>(API_URL + '/list/changeSeq', data, header);
  }

  createBoard(data: any): Observable<any> {
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    }
    return this.http.post<any>(API_URL + '/board/store', data, header);
  }

  deleteBoard(id: any): Observable<any> {
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    }
    return this.http.delete<any>(API_URL + '/board/delete/' + id, header);
  }

  addUser(data: any): Observable<any> {
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    }
    return this.http.post<any>(API_URL + '/board/addUser', data, header);
  }

  getRole(id: any): Observable<any> {
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    }
    return this.http.get<any>(API_URL + '/board/getRole/' + id, header);
  }


  getUser(id: any): Observable<any> {
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    }
    return this.http.get<any>(API_URL + '/board/getUsers/' + id, header);
  }

  getGroupId(): any {
    return this.groupId
  }

  setGroupId(id: number) {
    return this.groupId = id
  }

  getBoardId(): any {
    return this.boardId
  }

  setBoardId(id: number | undefined) {
    return this.boardId = id
  }

}

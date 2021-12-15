import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Observable } from 'rxjs';
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  groupId?:number

  constructor(private http: HttpClient) { }

  listBoard(data:any){
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization",`Bearer ${token}`)
    }
    return this.http.post<any>(API_URL + '/board/store',header);
  }

  updateCard(data: { cards: any }) {
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    }
    return this.http.post<any>(API_URL + '/card/changeSeq',data,header);
  }

  listCard(id: number | undefined) {
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
    return this.http.post<any>(API_URL + '/list/changeSeq',data,header);
  }

  createBoard(data: any): Observable<any>{
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization",`Bearer ${token}`)
    }
    return this.http.post<any>(API_URL + '/board/store', data,header);
  }

  getGroupId():number | undefined {
      return this.groupId
  }

  setGroupId(id:number){
    return this.groupId = id
  }
}
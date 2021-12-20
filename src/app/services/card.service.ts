import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})
export class CardService {

  listId?: number
  cardId?: number

  constructor(private http: HttpClient) {
  }

  getListId(): number | undefined {
    return this.listId
  }

  setListId(id: number) {
    return this.listId = id
  }

  getCardId(): number | undefined {
    return this.cardId
  }

  setCardId(id: number) {
    return this.cardId = id
  }

  createCard(data: any): Observable<any> {
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    }
    return this.http.post<any>(API_URL + '/card/store', data, header);
  }

  index(id: any): Observable<any> {
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    }
    return this.http.get<any>(API_URL + '/card/index/' + id, header);
  }

  updateCard(data: any): Observable<any> {
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    }
    return this.http.post<any>(API_URL + '/card/update/', data, header);
  }

  comment(data: any): Observable<any> {
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    }
    return this.http.post<any>(API_URL + '/card/comment/', data, header);
  }

  deleteCmt(id: any): Observable<any> {
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    }
    return this.http.delete<any>(API_URL + '/card/deleteComment/' + id, header);
  }

  updateCmt(id: any, data: any): Observable<any> {
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    }
    return this.http.put<any>(API_URL + '/card/editCmt/' + id, data, header);
  }
}

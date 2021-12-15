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

  constructor(private http: HttpClient) {
  }

  getListId(): number | undefined {
    return this.listId
  }

  setListId(id: number) {
    return this.listId = id
  }

  createCard(data: any): Observable<any>{
    let token = localStorage.getItem('access_token')
    let header = {
      headers: new HttpHeaders().set("Authorization",`Bearer ${token}`)
    }
    return this.http.post<any>(API_URL + '/card/store', data,header);
  }
}

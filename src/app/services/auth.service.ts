import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  checkAccount(data: any): boolean {

    if (data.email == "admin@gmail.com" && data.password == '1234') {
      let user = {
        email: data.email,
        password: data.password,
      }
      localStorage.setItem('userLogin', JSON.stringify(user));
      return true;
    }
    return false;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get('/assets/data/login.json');
  }

  authenticateEmail(email: string): Observable<any> {
    return this.getUsers().pipe(
      map((users) => {
        const user = users.find((u: any) => u.email === email);
        if (user) {
          return {
            success: true,
            id: user.id,
            email: user.email,
            name: user.name,
            message: 'User authentication succesful',
          };
        } else {
          return {
            success: false,
            id: undefined,
            email: undefined,
            name: undefined,
            message: 'User does not exist',
          };
        }
      })
    );
  }

  authenticatePassword(email: string, password: string): Observable<any> {
    return this.getUsers().pipe(
      map((users) => {
        const user = users.find((u: any) => u.email === email);
        if (user && user.password === password) {
          return {
            success: true,
            id: user.id,
            email: user.email,
            name: user.name,
            message: 'Password authentication succesful',
          };
        } else {
          return {
            success: false,
            id: undefined,
            email: undefined,
            name: undefined,
            message: 'Password does not match',
          };
        }
      })
    );
  }

  authenticateTwoFactor(email: string, twoFactor: string): Observable<any> {
    return this.getUsers().pipe(
      map((users) => {
        const user = users.find((u: any) => u.email === email);
        if (user && user.twofactor === twoFactor) {
          return {
            success: true,
            id: user.id,
            email: user.email,
            name: user.name,
            message: 'Two factor authentication succesful',
          };
        } else {
          return {
            success: false,
            id: undefined,
            email: undefined,
            name: undefined,
            message: 'Two factor authentication failed',
          };
        }
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfileInfo(): Observable<Profile[]> {
    return this.http.get<Profile[]>('/assets/data/profile.json');
  }

  getUserProfileInfo(id: string): Observable<any> {
    return this.getProfileInfo().pipe(
      map((info) => {
        const userInfo = info.find((u: any) => u.id === id);
        if (userInfo) {
          return { status: true, data: userInfo };
        } else {
          return { status: false, data: undefined };
        }
      })
    );
  }
}

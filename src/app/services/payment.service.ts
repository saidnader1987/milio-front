import { Injectable } from '@angular/core';
import { UserPaymentsInfo } from '../models/userPaymentsInfo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  getPaymentInfo(): Observable<UserPaymentsInfo[]> {
    return this.http.get<UserPaymentsInfo[]>('/assets/data/paymentInfo.json');
  }

  getUserPaymentInfo(id: string): Observable<any> {
    return this.getPaymentInfo().pipe(
      map((info) => {
        const userInfo = info.find((u: any) => u.id === id);
        if (userInfo) {
          return {
            status: true,
            data: userInfo,
          };
        } else {
          return {
            status: false,
            data: undefined,
          };
        }
      })
    );
  }
}

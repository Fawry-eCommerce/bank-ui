import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  baseUrl = 'http://localhost:9090/bank-api';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  logout() {
    localStorage.clear();
  }
    // Deposit transaction
  deposit(accountId: number, amount: number): Observable<any> {
  console.log('Making deposit request:', { accountId, amount });
  return this.http.post(`${this.baseUrl}/transactions`, {
    accountId,
    type: 'DEPOSIT',
    amount
  });
}
// Withdraw transaction

withdraw(accountId: number, amount: number): Observable<any> {
  console.log('Making withdraw request:', { accountId, amount });
  return this.http.post(`${this.baseUrl}/transactions`, {
    accountId,
    type: 'WITHDRAW',
    amount
  });
}

getBalance(accountId: number): Observable<any> {
  console.log('account id inside service function', accountId);
  return this.http.get(`${this.baseUrl}/account/${accountId}/balance`);
}
  

}

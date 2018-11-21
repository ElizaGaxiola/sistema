import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usuario: string, password: string): Observable<boolean> {
    return this.http.post<{token: string}>('/api/auth', {usuario: usuario, password: password })
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token); 
          return true;
        })
      );
  }
  getUser(usuario: string): Observable<boolean> {
    return this.http.post<any>('/api/usuario', { usuario: usuario })
            .pipe(map(result => {
                return result;
            }));
    
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  taki:any;
  session:any;
  constructor(private http: HttpClient) { }

  login(usuario: string, contrasena: string): Observable<boolean> {
    return this.http.post<{token: string}>('/api/auth', {usuario: usuario, contrasena: contrasena })
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          this.taki=JSON.parse(atob(result.token.split('.')[1]));
          console.log(this.taki);
          localStorage.setItem('idUsuario', this.taki.idUsuario);
          localStorage.setItem('tipo', this.taki.idTipo);
          return true;
        })
      );
  }

  getUser(usuario: string): Observable<any> {
      return this.http.get('/api/usuario?usuario=' + usuario)
      .pipe(map(result => {
        return result;
    }))  
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('idUsuario');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}
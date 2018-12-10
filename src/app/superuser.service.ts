import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SuperuserService implements CanActivate {
  constructor(private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const ruta = this.router.url;
    const rol= (localStorage.getItem('tipo'));
    if (rol === null || rol === undefined) {
      this.router.navigate(['/']);
      return false;
    }
    if (Number(rol) === 4 ) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
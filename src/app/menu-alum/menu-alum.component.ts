import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { from } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu-alum',
  templateUrl: './menu-alum.component.html',
  styleUrls: ['./menu-alum.component.css']
})
export class MenuAlumComponent implements OnInit {
  sesion:any;
  constructor(private auth: AuthService) {
    
   }

  public salir(){
    this.auth.logout();
  }
  
  ngOnInit() {
  }

}

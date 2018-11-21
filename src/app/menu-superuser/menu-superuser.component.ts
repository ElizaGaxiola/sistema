import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { from } from 'rxjs';
@Component({
  selector: 'app-menu-superuser',
  templateUrl: './menu-superuser.component.html',
  styleUrls: ['./menu-superuser.component.css']
})
export class MenuSuperuserComponent implements OnInit {

  constructor(private auth: AuthService) { }

  public salir(){
    this.auth.logout();
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent{
  public usuario: string;
  public password: string;
  public error: string;
  public usuarioData:any = { idUsuario:'', idTipo: '', usuario: '', password:'' };

  constructor(private router: Router, private auth: AuthService ) { }
  public submit() {
    this.auth.login(this.usuario, this.password )
      .pipe(first())
      .subscribe((data: {}) => {
        this.getUser();
        if (this.usuarioData.idTipo == 2){
          console.log('Alumno');
          this.router.navigate(['alumnos/avisos']);
        }else{
          this.error = 'Datos erroneos'
        }
      });
  }

  private getUser(){
    this.auth.getUser(this.usuario)
    .subscribe((data: any) => {
      this.usuarioData.idUsuario=data.idUsuario;
      this.usuarioData.idTipo=data.idTipo;
      this.usuarioData.usuario=data.usuario;
      this.usuarioData.password=data.password;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: ['./index-admin.component.css']
})
export class IndexAdminComponent implements OnInit {
  public usuario: string;
  public password: string;
  public error: string;

  public usuarioData:any = { idUsuario:'', idTipo: '', usuario: '', password:'' };

  constructor(private router: Router, private auth: AuthService) { }
  private autenticarDocente() {
    this.auth.login(this.usuario, this.password )
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['docente/dashboard']),
        err => this.error = 'Datos erroneos'
      );
  }
  private autenticarAdministrador() {
    this.auth.login(this.usuario, this.password )
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['administrativos/dashboard']),
        err => this.error = 'Datos erroneos'
      );
  }
  private autenticarSuperUsuario() {
    this.auth.login(this.usuario, this.password )
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['superusuario/dashboard']),
        err => this.error = 'Datos erroneos'
      );
  }


  private submit(){
    this.auth.getUser(this.usuario)
    .subscribe((data: any) => {
      this.usuarioData.idUsuario=data.idUsuario;
      this.usuarioData.idTipo=data.idTipo;
      this.usuarioData.usuario=data.usuario;
      this.usuarioData.password=data.password;
      if ( this.usuarioData.idTipo == 1){
        this.autenticarDocente();
      }else if(this.usuarioData.idTipo == 3){
        this.autenticarAdministrador();
      }else if(this.usuarioData.idTipo == 4){
        this.autenticarSuperUsuario();
      }else{
        this.error = 'Datos erroneos';
      }
    });
  }
  
  ngOnInit() {
  }

}

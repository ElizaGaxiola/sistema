import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { from } from 'rxjs';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: ['./index-admin.component.css']
})
export class IndexAdminComponent implements OnInit {
  
  public error: string;
  public loginadmForm:FormGroup;
  public loginAdm:any;
 
  

  public usuarioData:any = { idUsuario:'', idTipo: '', usuario: '', password:'' };

  constructor(private router: Router, private auth: AuthService, private pf:FormBuilder) { }
  private autenticarDocente() {
    this.auth.login(this.loginAdm.email, this.loginAdm.contrasena )
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['docente/dashboard']),
        err => this.error = 'Datos erroneos'
      );
  }
  private autenticarAdministrador() {
    this.auth.login(this.loginAdm.email, this.loginAdm.contrasena)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['administrativos/dashboard']),
        err => this.error = 'Datos erroneos'
      );
  }
  private autenticarSuperUsuario() {
    this.auth.login(this.loginAdm.email, this.loginAdm.contrasena)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['superusuario/dashboard']),
        err => this.error = 'Datos erroneos'
      );
  }


  private submit(){
    this.auth.getUser(this.loginAdm.email)
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
    this.loginadmForm=this.pf.group({
      email:['',[Validators.required]],
      contrasena:['',[Validators.required]]
    });
  }
  onSubmit(){
    this.loginAdm=this.saveLogin();
    this.submit()
  }
  public saveLogin(){
    const saveLogin={
      email:this.loginadmForm.get('email').value,
      contrasena:this.loginadmForm.get('contrasena').value
    };
    return saveLogin;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AbcService } from '../abc.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-modificar-perfil-alumno',
  templateUrl: './modificar-perfil-alumno.component.html',
  styleUrls: ['./modificar-perfil-alumno.component.css']
})
export class ModificarPerfilAlumnoComponent implements OnInit {
  modulo:string='Modificar Perfil';
  modalumnoForm: FormGroup;
  modalumno: any;
  alumno:any={
    idAlumno:[''],
    matricula:[''],
    nombre:[''],
    apellidoP:[''],
    apellidoM:[''],
    fechaNac:[''],
    email:[''],
    telefono:[''],
    celular:[''],
    curp:[''],
    sexo:[''],
    idMunicipio:[''],
    colonia:[''],
    calle:[''],
    numero:[''],
    cp:[''],
    urlImagen:[''],
    idUsuario:[''],
    idEscuela:[''],
    cardexDoc:[''],
    actaNacDoc:[''],
    comprobanteDoc:[''],
    credencialDoc:''
  };
  idUsuario:any;
  municipio='';
  estado='';
  urlImagen:string='';
  loader:Boolean = false;
  successMessage: string;
  dangerMessage: string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;
constructor(private pf: FormBuilder,private abc: AbcService,private auth: AuthService) { }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
    
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAlumnoUsuario(this.idUsuario).subscribe((data: any) => {
      this.alumno=data;
      this.urlImagen=data.urlImagen;
      this.abc.getMunicipio(this.alumno.idMunicipio).subscribe((mun:any)=>{
        this.municipio=mun.nombre;
        this.abc.getEstado(mun.idEstado).subscribe((est:any)=>{
          this.estado=est.nombre;
        });
      });
      console.log(this.alumno);
    });
    this.modalumnoForm=this.pf.group({
      matricula:[''],
      contrasena:['',[ Validators.required]],
    });
  }
  onSubmit(){
    this.modalumno = this.saveModalumno();
    console.log(this.modalumno);
    this.abc.updateContrAlumno(this.modalumno).subscribe(res => {
      this._success.next('Datos modificados con éxito');
      console.log('actualizado');
    }, (err) => {
      this._danger.next('A ocurrido un error intentalo de nuevo');
      console.log(err);
    }
    );
  }
  saveModalumno(){
    const saveModalumno={
      matricula: this.alumno.matricula,
      contrasena:this.modalumnoForm.get('contrasena').value,
    };
    return saveModalumno;
  }

  public cargandoImagen(e){
    let img:any = e.target;
    if(img.files.length > 0){
      this.loader = true;
      let form = new FormData();
      form.append('file',img.files[0]);
      this.abc.subirImagenAlumno(form).subscribe(
        resp => {
          this.loader = false;
          if(resp.status){
            this.urlImagen = resp.generatedName;
            let datos:any={
                idAlumno:this.alumno.idAlumno,
                urlImagen:this.urlImagen
              };
            this.abc.updateImagenAlumno(datos).subscribe(res => {
              this._success.next('Datos modificados con éxito');
              console.log('actualizado');
            }, (err) => {
              this._danger.next('A ocurrido un error intentalo de nuevo');
              console.log(err);
            }
          );
          }else{
            this._danger.next('Revise la extención de su imagen');
          }
        },
        error => {
          this.loader = false;
          alert('Imagen supera el tamaño permitido');
        }
      );
    }


  }

}

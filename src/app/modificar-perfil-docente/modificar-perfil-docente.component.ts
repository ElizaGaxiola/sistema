import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Docente, Administrador } from '../modelos';
import { Subject } from 'rxjs';
import { AbcService } from '../abc.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-modificar-perfil-docente',
  templateUrl: './modificar-perfil-docente.component.html',
  styleUrls: ['./modificar-perfil-docente.component.css']
})
export class ModificarPerfilDocenteComponent implements OnInit {
  modulo:string='Modificar Perfil';
  docenteForm: FormGroup;
  modsuper: Docente;
  idUsuario:any;
  docente:Docente={
    idDocente:0,
    nombre:'',
    apellidoP:'',
    apellidoM:'',
    fechaNac:'',
    nss:'',
    telefono:'',
    titulo:'',
    curp:'',
    sexo:'',
    idMunicipio:0,
    colonia:'',
    calle:'',
    numero:'',
    cp:'',
    urlImagen:'',
    usuarioId:0,
    estatus:0,
    escuelaId:0,
    idUsuario:0,
    idTipo:0,
    usuario:'',
    contrasena:''
  };
  email:string;
  loader:Boolean = false;
  successMessage: string;
  dangerMessage: string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  imagen:string;
  bsValue:any;
  fecha:any;
  constructor(private pf: FormBuilder,private abc:AbcService) {

   }

  ngOnInit() {
    this.idUsuario=localStorage.getItem('idUsuario');
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
    this.inicializarForm();
    
  }



  public inicializarForm(){
    this.docenteForm = this.pf.group({
      idDocente: [''],
      nombre: ['',[Validators.required]],
      apellidoP: ['',[Validators.required]],
      apellidoM: ['',[Validators.required]],
      fechaNac: [''],
      nss: [''],
      telefono: ['',[Validators.required]],
      titulo: [''],
      curp:[''],
      sexo:[''],
      idMunicipio: [''],
      colonia:[''],
      calle: [''],
      numero: [''],
      cp: [''],
      urlImagen: [''],
      usuarioId:[''],
      estatus: [''],
      escuelaId: [''],
      idUsuario:[''],
      idTipo:[''],
      usuario:['',[Validators.required, Validators.email]],
      contrasena: [''],
    });
    this.llenar();
   }
  public llenar(){
    this.abc.getDocente_Usuario(this.idUsuario).subscribe((user: any) => {
      this.abc.getDocenete(user.idDocente).subscribe((data: any) => {
        console.log(data);
        this.fecha=data.fechaNac.split('-');
        this.bsValue=new Date(this.fecha[0],this.fecha[1]-1,this.fecha[2]);
        console.log(this.fecha);
        this.docenteForm=this.pf.group({
          idDocente: data.idDocente,
          nombre: data.nombre,
          apellidoP:data.apellidoP,
          apellidoM: data.apellidoM,
          fechaNac:data.fechaNac,
          nss: data.nss,
          telefono: data.telefono,
          titulo: data.titulo,
          curp:data.curp,
          sexo:Number(data.sexo),
          idMunicipio: data.idMunicipio,
          colonia: data.colonia,
          calle: data.calle,
          numero: data.numero,
          cp:data.cp,
          urlImagen: data.urlImagen,
          usuarioId: data.usuarioId,
          estatus: data.estatus,
          escuelaId: data.escuelaId,
          idUsuario: data.idUsuario,
          idTipo:data.idTipo,
          usuario:data.usuario,
          contrasena:data.contrasena,
        });
        this.imagen=data.urlImagen;
        console.log(this.docenteForm);
    });
  });
}
   public saveDocente(){
    const saveDocente ={
        idDocente: this.docenteForm.get('idDocente').value,
        nombre: this.docenteForm.get('nombre').value,
        apellidoP: this.docenteForm.get('apellidoP').value,
        apellidoM: this.docenteForm.get('apellidoM').value,
        fechaNac: this.docenteForm.get('fechaNac').value,
        nss: this.docenteForm.get('nss').value,
        telefono: this.docenteForm.get('telefono').value,
        titulo: this.docenteForm.get('titulo').value,
        curp: this.docenteForm.get('curp').value,
        sexo: this.docenteForm.get('sexo').value,
        idMunicipio: this.docenteForm.get('idMunicipio').value,
        colonia: this.docenteForm.get('colonia').value,
        calle: this.docenteForm.get('calle').value,
        numero: this.docenteForm.get('numero').value,
        cp: this.docenteForm.get('cp').value,
        urlImagen: this.imagen,
        usuarioId: this.docenteForm.get('usuarioId').value,
        estatus: this.docenteForm.get('estatus').value,
        escuelaId: this.docenteForm.get('escuelaId').value,
        idUsuario:this.docenteForm.get('idUsuario').value,
        idTipo:this.docenteForm.get('idTipo').value,
        usuario:this.docenteForm.get('usuario').value,
        contrasena: this.docenteForm.get('contrasena').value,
    }
    return saveDocente;
  }

 public onSubmit(){
    this.docente = this.saveDocente();
    console.log(this.docente);
      this.abc.updateDocenete(this.docente).subscribe(res => {
        this._success.next('Datos modificados con éxito');
      }, (err) => {
        this._danger.next('A ocurrido un error intentalo de nuevo');
        console.log(err);
      }
     );
  }

  public cargandoImagen(e){
    let img:any = e.target;
    if(img.files.length > 0){
      this.loader = true;
      let form = new FormData();
      form.append('file',img.files[0]);
      
      this.abc.subirImagenAdmin(form).subscribe(
        resp => {
          this.loader = false;
          if(resp.status){
            this.imagen = resp.generatedName;
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

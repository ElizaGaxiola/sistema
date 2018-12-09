import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Grupo, Administrador, Horario } from '../modelos';
import { Subject } from 'rxjs';
import { AbcService } from '../abc.service';
import { debounceTime } from 'rxjs/operators';
import { Alert } from 'selenium-webdriver';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-creargrupos',
  templateUrl: './creargrupos.component.html',
  styleUrls: ['./creargrupos.component.css']
})
export class CreargruposComponent implements OnInit {
  modulo:string='Grupos';
  modal:string;
  grupoForm: FormGroup;
  grupo: Grupo;
  horarioForm: FormGroup;
  horario: Horario;
  cicloSelect: any[]=[];
  idCiclo: number;
  docenteSelect: any[]=[];
  asignaturaSelect: any[]=[];
  periodoSelect: any[]=[];
  periodo:any;
  subcicloSelect: any[]=[];
  aulaSelect: any[]=[];
  idEdificio: number;
  edificioSelect: any[]=[];
  diaSelect: any[]=[
    {id: 1, name: 'Domingo'},
    {id: 2, name: 'Lunes'},
    {id: 3, name: 'Martes'},
    {id: 4, name: 'Miércoles'},
    {id: 5, name: 'Jueves'},
    {id: 6, name: 'Viernes'},
    {id: 7, name: 'Sábado'},
  ];
  data: any[]=[];
  horarios: any[]=[];
  successMessage: string;
  dangerMessage: string;
  idGrupo:number;
  idHorario:number=0;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  idUsuario: any;
  administradorUser:Administrador;
  id: { idSeccion: any; idPeriodo: any; idCarrera: any; };
  grups:Grupo;
  dia: string;
  constructor( private abc: AbcService, private pf: FormBuilder,private chRef: ChangeDetectorRef ) {
  }

  public agregar(){
    this.inicializarForm();
    this.modal="agregar";
    $("#modal").modal();
  }

  public eliminar(idHorario:number){
    this.abc.deleteHorario(idHorario).subscribe(RES =>{
      this._success.next('Datos eliminados con éxito');
      this.obtenerHorarios(this.idGrupo);
    }, (err) => {
      console.log(err);
      this._danger.next('A ocurrido un error intentalo de nuevo');
    }
    );

  }

  public obtenerHorarios (idGrupo:number){
    this.idGrupo = idGrupo;
    this.horarios=[];
    this.abc.getHorarios(idGrupo)
    .subscribe((data: any) => {
      this.chRef.detectChanges();
      for (let item of data) {
        switch(item.diaSemana) { 
          case "1": {
            this.dia ="Domingo"; 
            break; 
          } 
          case "2": { 
            this.dia ="Lunes"; 
            break; 
          } 
          case "3": { 
            this.dia ="Martes"; 
            break; 
          } 
          case "4": { 
            this.dia ="Miércoles"; 
            break; 
          } 
          case "5": { 
            this.dia ="Jueves"; 
            break; 
          }
          case "6": { 
            this.dia ="Viernes"; 
            break; 
          }
          case "7": { 
            this.dia ="Sábado"; 
            break; 
          }    
          default: { 
            break; 
          } 
        } 
        this.abc.getAula(item.idAula).subscribe((aula: any) =>{
          this.abc.getEdificio(aula.idEdificio).subscribe((edificio: any) =>{
            this.horarios.push({dia:this.dia,edificio:edificio.descripcion,aula:aula.descripcion,horaIni:item.horaIni,horaFin:item.horaFin,idHorario:item.idHorario});
          });
        });
      }
      console.log(this.horarios);
      
      // Now you can use jQuery DataTables :
      const table: any = $('#table_horario');
      table.DataTable();
    });
  }

  public agregarHorario(idGrupo:number){
    this.idGrupo = idGrupo;
    this.obtenerHorarios(idGrupo);
    this.inicializarForm();
    this.modal="horario";
    $("#modal-horario").modal();
  }

  public agregarDetalleHorario(){
    $("#modal-horario").modal('hide');
    this.modal="agregar-horario";
    $("#modal-detalle-horario").modal();
  }

  public modificar(idGrupo:number){
    this.abc.getGrupo(idGrupo)
    .subscribe((data: any) => {
      console.log(data);
      this.idCiclo=data.idCiclo;
      this.id={idSeccion:data.idSeccion,idPeriodo:data.idPeriodo,idCarrera:data.idCarrera};
      this.periodo=this.id;
      this.changeCiclo();
      this.changePeriodo();
      this.grupoForm=this.pf.group({
        idGrupo: data.idGrupo,
        clave: data.clave,
        idCiclo: data.idCiclo,
        idSubCiclo: data.idSubCiclo,
        idSeccion: data.idSeccion,
        idPeriodo: data.idPeriodo,
        idCarrera: data.idCarrera,
        idMateria: data.idMateria,
        idDocente: data.idDocente,
        idGrupoAnt: data.idGrupoAnt,
        idEscuela: data.idEscuela,       
      });
      this.modal = 'modificar';
      $("#modal").modal();
    }); 
  }

  public modificarHorario(idHorario:number){
    this.idHorario = idHorario;
    this.abc.getHorario(idHorario).subscribe((data: any)=>{
      this.abc.getAula(data.idAula).subscribe((aula:any)=>{
        this.idEdificio = aula.idEdificio;
        this.idGrupo = data.idGrupo;
        this.change();
        this.chRef.detectChanges();
        this.horarioForm = this.pf.group({
          idHorario: data.idHorario,
          idGrupo:   data.idGrupo,
          diaSemana: Number(data.diaSemana),
          idAula:    data.idAula,
          horaIni:   data.horaIni,
          horaFin:   data.horaFin
        });
      });
    });
    $("#modal-horario").modal('hide');
    this.modal = 'modificar-horario';
    $("#modal-detalle-horario").modal();
    
  }

  public clonar(idGrupo:number){
    this.abc.getGrupo(idGrupo)
    .subscribe((data: any) => {
      this.id={idSeccion:data.idSeccion,idPeriodo:data.idPeriodo,idCarrera:data.idCarrera};
      this.periodo=this.id;
      this.grupo = this.saveGrupo();
      this.grupo.clave=data.clave;
      this.grupo.idCiclo=data.idCiclo;
      this.grupo.idSubCiclo=data.idSubCiclo;
      this.grupo.idSeccion=data.idSeccion;
      this.grupo.idPeriodo=data.idPeriodo;
      this.grupo.idCarrera=data.idCarrera;
      this.grupo.idMateria=data.idMateria;
      this.grupo.idDocente=data.idDocente;
      this.grupo.idGrupoAnt=data.idGrupo;
      this.grupo.idEscuela=data.idEscuela;
      this.abc.insertGrupo(this.grupo).subscribe(res => {
          this._success.next('Datos modificados con éxito');
          this.obtenerGruposTable();
        }, (err) => {
          console.log(err);
          this._danger.next('A ocurrido un error intentalo de nuevo');
        }
      );
    });
  }
  
  public onSubmit(){    
    if (this.modal=='modificar'){
      this.grupo = this.saveGrupo();
      this.abc.updateGrupo(this.grupo).subscribe(res => {
        $("#modal").modal('hide');
        this._success.next('Datos actualizados con éxito');
      }, (err) => {
        console.log(err);
        this._danger.next('A ocurrido un error intentalo de nuevo');
      }
     );
     this.obtenerGruposTable();
    }else if (this.modal == 'agregar'){
      this.grupo = this.saveGrupo();
      this.abc.insertGrupo(this.grupo).subscribe(res => {
        $("#modal").modal('hide');
        this._success.next('Datos agregados con éxito');
      }, (err) => {
        console.log(err);
        this._danger.next('A ocurrido un error intentalo de nuevo');
      }
     );
     this.obtenerGruposTable();
    }else if (this.modal == 'agregar-horario'){
      this.horario = this.saveHorario();
      console.log(this.horario);
      this.abc.insertHorario(this.horario).subscribe((data:any)=> {
        console.log(data);
        if(data.status == false){
          this._danger.next(data.msg);
        }else{
          $("#modal-detalle-horario").modal('hide');
          this._success.next('Datos agregados con éxito');
          this.agregarHorario(this.idGrupo);
        }
      }, (err) => {
        console.log(err);
        this._danger.next('A ocurrido un error intentalo de nuevo');
      });
    }else if (this.modal == 'modificar-horario'){
      this.horario = this.saveHorario();
      console.log('HORARIO');
      console.log(this.horario);
      this.abc.updateHorario(this.horario).subscribe((data:any)=> {
        console.log(data);
        if(data.status == false){
          this._danger.next(data.msg);
        }else{
          $("#modal-detalle-horario").modal('hide');
          this._success.next('Datos agregados con éxito');
          this.agregarHorario(this.idGrupo);
        }
      }, (err) => {
        console.log(err);
        this._danger.next('A ocurrido un error intentalo de nuevo');
      });
    }
  }
  
  public changePeriodo(){
    this.asignaturaSelect=[];
    this.grupoForm.get ('idMateria') .reset (); 
    this.abc.getAsignaturasPeriodo(this.periodo.idSeccion,this.periodo.idPeriodo,this.periodo.idCarrera)
    .subscribe((data: any) => {
      for (let asignatura of data) {
        this.asignaturaSelect = [...this.asignaturaSelect, {id:asignatura.idMateria, name: asignatura.nombre}];
      }
    });
  }

  public changeCiclo(){
    this.subcicloSelect=[];
    this.grupoForm.get ('idSubCiclo') .reset (); 
    this.abc.getSubCiclos_Ciclos(this.idCiclo).subscribe((data:any) => {
      for (let subCiclo of data) {
        this.subcicloSelect = [...this.subcicloSelect, {id: subCiclo.idSubCiclo, name: subCiclo.descripcion}];
      }
    });
  }

  public inicializarForm(){
    this.grupoForm = this.pf.group({
      idGrupo: [''],
      clave:['',[Validators.required]],
      idCiclo: ['',[Validators.required]],
      idSubCiclo:['',[Validators.required]],
      idSeccion: [''],
      idPeriodo: [''],
      idCarrera: [''],
      idMateria:['',[Validators.required]],
      idDocente: ['',[Validators.required]],
      idGrupoAnt:[0],
      idEscuela: [''],
    }); 
    this.horarioForm = this.pf.group({
      idHorario:[''],
      idGrupo:[''],
      diaSemana:['',[Validators.required]],
      idAula:['',[Validators.required]],
      horaIni:['',[Validators.required]], 
      horaFin:['',[Validators.required]]
   
    });

   }
  public saveGrupo(){
    const saveGrupo ={
        idGrupo: this.grupoForm.get('idGrupo').value,
        clave: this.grupoForm.get('clave').value,
        idCiclo: this.grupoForm.get('idCiclo').value,
        idSubCiclo: this.grupoForm.get('idSubCiclo').value,
        idSeccion: this.periodo.idSeccion,
        idPeriodo: this.periodo.idPeriodo,
        idCarrera: this.periodo.idCarrera,
        idMateria: this.grupoForm.get('idMateria').value,
        idDocente: this.grupoForm.get('idDocente').value,
        idGrupoAnt: this.grupoForm.get('idGrupoAnt').value,
        idEscuela: this.administradorUser.idEscuela,       
    }
    return saveGrupo;
  }
  public saveHorario(){
    const saveHorario ={
      idHorario:this.idHorario,
      idGrupo:this.idGrupo,
      diaSemana:this.horarioForm.get('diaSemana').value,
      idAula:this.horarioForm.get('idAula').value,
      horaIni:this.horarioForm.get('horaIni').value,
      horaFin:this.horarioForm.get('horaFin').value,
    }
    return saveHorario;
  }
  public change(){
    this.abc.getAulasxEdificio(this.idEdificio).subscribe((data: any) => {
       this.aulaSelect=[];
       if (data != null){
        for (let aula of data) {
          this.aulaSelect = [...this.aulaSelect, {id: aula.idAula, name: aula.descripcion}];
        }
       }
    });
  }
  public cerrarDetalle(){
    this.agregarHorario(this.idGrupo);
  }
  ngOnInit(): void {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAdministrador_Usuario(this.idUsuario).subscribe((data: any) => {
      this.administradorUser=data;
      this.obtenerGruposTable();
      this.abc.getCiclos(this.administradorUser.idEscuela).subscribe((data: any) => {
        for (let ciclo of data) {
          this.cicloSelect = [...this.cicloSelect, {id: ciclo.idCiclo, name: ciclo.descripcion}];
        }
      });
      this.abc.getDocenetes(this.administradorUser.idEscuela).subscribe((data:any) => {
        for (let docente of data) {
          this.docenteSelect = [...this.docenteSelect, {id: docente.idDocente, name: docente.nombre+' '+docente.apellidoP+' '+docente.apellidoM}];
        }
      });
      this.abc.getPeriodos(this.administradorUser.idEscuela).subscribe((data: any) => {
        for (let item of data) {
          this.id={idSeccion:item.idSeccion,idPeriodo:item.idPeriodo,idCarrera:item.idCarrera};
          this.periodoSelect = [...this.periodoSelect, {id:this.id, name: item.descripcion}];
        }
      });
      this.abc.getEdificios(this.administradorUser.idEscuela).subscribe((data2: any) => {
        console.log(data2);
        if (data2 != null){
          for (let edificio of data2) {
            this.edificioSelect = [...this.edificioSelect, {id: edificio.idEdificio, name: edificio.descripcion}];
          }
        }
       });
    });
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
  
  public obtenerGruposTable(){
    this.abc.getGruposTable(this.administradorUser.idEscuela)
    .subscribe((data: any) => {
      this.data=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('#table');
      table.DataTable();
    });
  }
}

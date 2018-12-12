import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AbcService } from '../abc.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-alumnoreinscripcion',
  templateUrl: './alumnoreinscripcion.component.html',
  styleUrls: ['./alumnoreinscripcion.component.css']
})
export class AlumnoreinscripcionComponent implements OnInit {
  escuela:string;
  cicloSelect: any[]=[];
  subcicloSelect: any[]=[];
  periodoSelect: any[]=[];
  reinscripcionForm: FormGroup;
  reinscripcion: any;
  alumno:any={
    idAlumno:'',
    matricula:'',
    nombre:'',
    apellidoP:'',
    apellidoM:'',
    fechaNac:'',
    email:'',
    telefono:'',
    celular:'',
    curp:'',
    sexo:'',
    idMunicipio:'',
    colonia:'',
    calle:'',
    numero:'',
    cp:'',
    urlImagen:'',
    idUsuario:'',
    idEscuela:'',
    cardexDoc:'',
    actaNacDoc:'',
    comprobanteDoc:'',
    credencialDoc:''
  };
  idUsuario:any;
  idCiclo:number;
  id: { idSeccion: any; idPeriodo: any; idCarrera: any; };
  constructor(private router: Router,private pf: FormBuilder,private abc: AbcService) { 
    
  }
  public changeCiclo(){
    console.log(this.idCiclo);
    this.subcicloSelect=[]; 
    this.abc.getSubCiclos_Ciclos(this.idCiclo).subscribe((data:any) => {
      for (let subCiclo of data) {
        this.subcicloSelect = [...this.subcicloSelect, {id: subCiclo.idSubCiclo, name: subCiclo.descripcion}];
      }
    });
  }

  ngOnInit() {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAlumnoUsuario(this.idUsuario).subscribe((data: any) => {
      this.alumno=data;
      console.log(this.alumno);
      this.abc.getEscuela_Id(data.idEscuela).subscribe((escuela:any)=>{
        this.escuela = escuela.nombre;
      });
      this.abc.getCiclos(data.idEscuela).subscribe((ciclos: any) => {
        for (let ciclo of ciclos) {
          this.cicloSelect = [...this.cicloSelect, {id: ciclo.idCiclo, name: ciclo.descripcion}];
        }
      });
      this.abc.getPeriodos(data.idEscuela).subscribe((data: any) => {
        for (let item of data) {
          this.id={idSeccion:item.idSeccion,idPeriodo:item.idPeriodo,idCarrera:item.idCarrera};
          this.periodoSelect = [...this.periodoSelect, {id:this.id, name: item.descripcion}];
        }
      });
    });
    this.reinscripcionForm=this.pf.group({
      idSubCiclo:['',[Validators.required]],
      idCiclo:['',[Validators.required]],
      idPeriodo:['',[Validators.required]],
      idSeccion: [''],
      idCarrera:[''],
      idEscuela: [''],
   
    });
  }
  onSubmit(){
    this.reinscripcion = this.saveReinscripcion();
    console.log(this.reinscripcion);
    this.router.navigate(['alumnos/reinscripcion/recibo',this.alumno.idAlumno,this.reinscripcion.idCiclo,this.id.idCarrera]);
  }
  saveReinscripcion(){
    const saveReinscripcion={
      idEscuela: this.alumno.idEscuela,
      idCiclo: this.reinscripcionForm.get('idCiclo').value,
      idSubCiclo: this.reinscripcionForm.get('idSubCiclo').value,
      idPeriodo: this.id.idPeriodo,
      idSeccion: this.id.idSeccion,
      idCarrera: this.id.idCarrera,      
    };
    return saveReinscripcion;
  }
}

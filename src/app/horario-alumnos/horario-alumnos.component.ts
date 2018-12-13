import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AbcService } from '../abc.service';

@Component({
  selector: 'app-horario-alumnos',
  templateUrl: './horario-alumnos.component.html',
  styleUrls: ['./horario-alumnos.component.css']
})
export class HorarioAlumnosComponent implements OnInit {
  public modulo: string = "Horario"
  idUsuario:any;
  dtOptions: DataTables.Settings = {};
  tabla: any[]=[];
  dia:string='';
  materia:string='';
  aula:string='';
  edificio:string='';
  dataTable: any;
  constructor( private abc: AbcService,private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAlumnoUsuario(this.idUsuario).subscribe((data: any) => {
      this.abc.getGruposAlumno(data.idAlumno).subscribe((alum: any)=>{
       console.log(alum);
       for (let grupo of alum){
        console.log(grupo);
        this.abc.getHorarios(grupo.idGrupo).subscribe((grup:any)=>{
          console.log(grup);
          for (let g of grup){
            this.abc.getGrupo(grupo.idGrupo).subscribe((grupoCom:any)=>{
              this.abc.getAsignatura(grupoCom.idMateria).subscribe((mat:any)=>{
                 this.materia=mat.nombre;
                 console.log(mat);
                 this.abc.getAula(g.idAula).subscribe((a:any)=>{
                  this.aula=a.descripcion;
                  this.abc.getEdificio(a.idEdificio).subscribe((e:any)=>{
                    this.edificio=e.descripcion;
                    if(g.diaSemana == 1){
                      this.dia='Domingo';
                    }else if(g.diaSemana==2){
                      this.dia='Lunes';
                    }else if(g.diaSemana==3){
                      this.dia='Martes';
                    }else if(g.diaSemana==4){
                      this.dia='Miércoles';
                    }else if(g.diaSemana==5){
                      this.dia='Jueves';
                    }else if(g.diaSemana==6){
                      this.dia='Viernes';
                    }else if(g.diaSemana==7){
                      this.dia='Sábado';
                    }
                    this.tabla=[...this.tabla, {dia:this.dia, materia:mat.nombre, horario:g.horaIni+'-'+g.horaFin, edificio:this.edificio, aula:this.aula }];
                    console.log(this.tabla);
                    this.chRef.detectChanges();
                    // Now you can use jQuery DataTables :
                    const table: any = $('table');
                    this.dataTable = table.DataTable();
                  });
                 });
              });
            });
          }
        });
      }
      });
      
    });
    
  }

}

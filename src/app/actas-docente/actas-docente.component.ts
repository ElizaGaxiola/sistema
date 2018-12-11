import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Grupo } from '../modelos';
import { ActivatedRoute } from '@angular/router';
import { AbcService } from '../abc.service';
import { type } from 'os';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-actas-docente',
  templateUrl: './actas-docente.component.html',
  styleUrls: ['./actas-docente.component.css']
})
export class ActasDocenteComponent implements OnInit {
  modulo:string="Actas";
  idGrupo:number;
  grupo:Grupo;
  clave:string='';
  ciclo:string='';
  materia:string='';
  acta:any;

  dtOptions: any = {};

  //datos para datatable
  data: any[]=[
    { numero: "1", apellidoP:"Acosta", apellidoM: "Rocha", nombre:"Jesús Carlos", cal:"10"},
    { numero: "2", apellidoP:"Castro", apellidoM: "Galaviz", nombre:"Evelyn Guadalupe", cal:"10"},
    { numero: "3", apellidoP:"Gaxiola", apellidoM: "Carrillo", nombre:"Elizabeth", cal:"10"},
  ];
  ngOnInit() {
    this.dtOptions = {
      "ajax":{
        url:'',
        type:'GET'
      },
      "ordering": false,
      dom: 'Bfrtip',
      buttons: [
                'copy',
                {
                    extend: 'excel',
                    title: 'ACTA'
                },
                {
                    extend: 'pdf',
                    title: 'ACTA'
                },
                {
                    extend: 'print',
                    title: 'ACTA'
                }
            ],
      language: {
        "emptyTable": "Sin resultados encontrados",
        "info": " _START_ - _END_ / _TOTAL_ ",
        "infoEmpty": "0-0 /0",
        "infoFiltered": "",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ registros",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "<i class='fas fa-search'></i>",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        },
      }
    };
  }
  constructor(private _route: ActivatedRoute,private abc: AbcService,private chRef: ChangeDetectorRef) { 
    console.log(this._route.snapshot.paramMap.get('id'));
    this.idGrupo = Number(this._route.snapshot.paramMap.get('id'));
    this.abc.getGrupo(this.idGrupo)
    .subscribe((data: any) => {
      console.log(data);
      this.grupo=data;
      this.clave=data.clave;
      this.abc.getActa(data.idSeccion,data.idPeriodo,data.idCarrera).subscribe((acta:any)=>{
        if(acta.status == false){
         //no hay para mostrar
        }else{
          this.acta=acta;
          console.log(acta);
        }
      });
      this.abc.getCiclo(data.idCiclo).subscribe((ciclo:any)=>{
        this.ciclo=ciclo.descripcion;
        console.log(this.ciclo);
      });
      this.abc.getAsignatura(data.idMateria).subscribe((asignatura:any)=>{
        this.materia=asignatura.nombre;
        console.log(this.materia);
      });
    }); 
    this.obtenerAlumnos();
  }
  public obtenerAlumnos(){
    this.abc.getAlumnosxGrupo(this.idGrupo)
    .subscribe((data: any) => {
      console.log(data);
      console.log('data');
      this.data=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      table.DataTable();
    });

  }
}

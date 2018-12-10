import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-alumnoreinscripcion',
  templateUrl: './alumnoreinscripcion.component.html',
  styleUrls: ['./alumnoreinscripcion.component.css']
})
export class AlumnoreinscripcionComponent implements OnInit {
  escuelaSelect: any[]=[];
  escuela:string;
  cicloSelect: any[]=[];
  subcicloSelect: any[]=[];
  periodoSelect: any[]=[];
  reinscripcionForm: FormGroup;
  reinscripcion: any;
  constructor(private pf: FormBuilder) { }

  ngOnInit() {
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
  }
  saveReinscripcion(){
    const saveReinscripcion={
      idEscuela: this.reinscripcionForm.get('idEscuela').value,
      idCiclo: this.reinscripcionForm.get('idCiclo').value,
      idSubCiclo: this.reinscripcionForm.get('idSubCiclo').value,
      idPeriodo: this.reinscripcionForm.get('idPeriodo').value,
      idSeccion: this.reinscripcionForm.get('idSeccion').value,
      idCarrera:this.reinscripcionForm.get('idCarrera').value,
      
    };
    return saveReinscripcion;
  }
}

import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-modificar-perfil-administrativo',
  templateUrl: './modificar-perfil-administrativo.component.html',
  styleUrls: ['./modificar-perfil-administrativo.component.css']
})
export class ModificarPerfilAdministrativoComponent implements OnInit {
  modulo:string='Modificar Perfil';
  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);
  constructor() { }
  ngOnInit() {
  }

}

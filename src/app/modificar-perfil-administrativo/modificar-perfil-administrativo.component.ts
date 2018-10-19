import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-modificar-perfil-administrativo',
  templateUrl: './modificar-perfil-administrativo.component.html',
  styleUrls: ['./modificar-perfil-administrativo.component.css']
})
export class ModificarPerfilAdministrativoComponent implements OnInit {
  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);
  constructor() { }
  ngOnInit() {
  }

}

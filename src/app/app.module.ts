import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { Routes, RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { IndexAdminComponent } from './index-admin/index-admin.component';
import { HeadComponent } from './head/head.component';
import { from } from 'rxjs';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardDocenteComponent } from './dashboard-docente/dashboard-docente.component';
import { GruposComponent } from './grupos/grupos.component';
import { MenuAlumComponent } from './menu-alum/menu-alum.component';
import { DashboardAlumnosComponent } from './dashboard-alumnos/dashboard-alumnos.component';
import { EstudiosAlumnosComponent } from './estudios-alumnos/estudios-alumnos.component';
import { HorarioAlumnosComponent } from './horario-alumnos/horario-alumnos.component';
import { PerfilAdministrativoComponent } from './perfil-administrativo/perfil-administrativo.component';

const routes = [
  { path:'alumnos',component: IndexComponent},
  { path:'administrativos',component: IndexAdminComponent},
  { path:'docente',component: DashboardDocenteComponent },
  { path:'docente/grupos',component: GruposComponent },
  { path: 'alumnos/avisos', component: DashboardAlumnosComponent},
  { path: 'alumnos/estudios', component: EstudiosAlumnosComponent},
  { path: 'alumnos/horario', component: HorarioAlumnosComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    IndexAdminComponent,
    HeadComponent,
    FooterComponent,
    MenuComponent,
    DashboardDocenteComponent,
    GruposComponent,
    MenuAlumComponent,
    DashboardAlumnosComponent,
    EstudiosAlumnosComponent,
    HorarioAlumnosComponent,
    PerfilAdministrativoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFontAwesomeModule,
    DataTablesModule,
    SelectDropDownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

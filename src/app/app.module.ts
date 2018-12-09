import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
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
import { CalificacionesAlumnosComponent } from './calificaciones-alumnos/calificaciones-alumnos.component';
import { PerfilAlumnosComponent } from './perfil-alumnos/perfil-alumnos.component';
import { ModificarPerfilAdministrativoComponent } from './modificar-perfil-administrativo/modificar-perfil-administrativo.component';
import { CalificacionesDocenteComponent } from './calificaciones-docente/calificaciones-docente.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PreinscripcionesDatosComponent } from './preinscripciones-datos/preinscripciones-datos.component';
import { ActasDocenteComponent } from './actas-docente/actas-docente.component';
import { FullCalendarModule } from 'ng-fullcalendar';
import { PreinscripcionesComenzarComponent } from './preinscripciones-comenzar/preinscripciones-comenzar.component';
import { ModificarPerfilAlumnoComponent } from './modificar-perfil-alumno/modificar-perfil-alumno.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { CajaComponent } from './caja/caja.component';
import { VisualizarPDFComponent } from './visualizar-pdf/visualizar-pdf.component';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { DashboardSuperuserComponent } from './dashboard-superuser/dashboard-superuser.component';
import { MenuSuperuserComponent } from './menu-superuser/menu-superuser.component';
import { PerfilSuperuserComponent } from './perfil-superuser/perfil-superuser.component';
import { ModificarPerfilSuperuserComponent } from './modificar-perfil-superuser/modificar-perfil-superuser.component';
import { EscuelasComponent } from './escuelas/escuelas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EdificiosComponent } from './edificios/edificios.component';
import { AulasComponent } from './aulas/aulas.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { PeriodosComponent } from './periodos/periodos.component';
import { AsignaturasComponent } from './asignaturas/asignaturas.component';
import { CiclosComponent } from './ciclos/ciclos.component';
import { SubciclosComponent } from './subciclos/subciclos.component';
import { CreargruposComponent } from './creargrupos/creargrupos.component';
import { PersonaladminComponent } from './personaladmin/personaladmin.component';
import { PersonaldocenteComponent } from './personaldocente/personaldocente.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { AbcService } from './abc.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginaprincipalComponent } from './paginaprincipal/paginaprincipal.component';
import { AvisosComponent } from './avisos/avisos.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { ReciboComponent } from './recibo/recibo.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PerfilDocenteComponent } from './perfil-docente/perfil-docente.component';
import { ModificarPerfilDocenteComponent } from './modificar-perfil-docente/modificar-perfil-docente.component';
import { AsignaturasxperiodosComponent } from './asignaturasxperiodos/asignaturasxperiodos.component';



const routes = [
  { path:'',component: PaginaprincipalComponent},
  { path:'alumnos',component: IndexComponent},
  { path:'administrativos',component: IndexAdminComponent},
  { path:'docente/dashboard',component: DashboardDocenteComponent, canActivate: [AuthGuard]},
  { path:'docente/grupos',component: GruposComponent, canActivate: [AuthGuard]},
  { path:'docente/perfil',component: PerfilDocenteComponent, canActivate: [AuthGuard]},
  { path:'docente/ModificarPerfil',component: ModificarPerfilDocenteComponent, canActivate: [AuthGuard]},
  { path: 'alumnos/avisos', component: DashboardAlumnosComponent, canActivate: [AuthGuard]},
  { path: 'alumnos/estudios', component: EstudiosAlumnosComponent, canActivate: [AuthGuard]},
  { path: 'alumnos/horario', component: HorarioAlumnosComponent, canActivate: [AuthGuard]},
  { path: 'alumnos/calificaciones', component: CalificacionesAlumnosComponent, canActivate: [AuthGuard]},
  { path: 'alumnos/perfil', component: PerfilAlumnosComponent, canActivate: [AuthGuard]},
  { path: 'docente/calificaciones', component: CalificacionesDocenteComponent, canActivate: [AuthGuard]},
  { path: 'docente/actas', component: ActasDocenteComponent, canActivate: [AuthGuard]},
  { path: 'preinscripciones/datos', component: PreinscripcionesDatosComponent, canActivate: [AuthGuard]},
  { path: 'preinscripciones', component: PreinscripcionesComenzarComponent, canActivate: [AuthGuard]},
  { path: 'alumnos/ModificarPerfil',component: ModificarPerfilAlumnoComponent, canActivate: [AuthGuard] },
  { path: 'administrativos/dashboard',component: DashboardAdminComponent, canActivate: [AuthGuard]},
  { path: 'administrativos/caja',component: CajaComponent, canActivate: [AuthGuard]},
  { path: 'preinscripciones/guia',component: VisualizarPDFComponent, canActivate: [AuthGuard]},
  { path: 'superusuario/dashboard', component: DashboardSuperuserComponent, canActivate: [AuthGuard]},
  { path: 'superusuario/escuelas', component: EscuelasComponent, canActivate: [AuthGuard]},
  { path: 'superusuario/usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
  { path: 'superusuario/perfil', component: PerfilSuperuserComponent, canActivate: [AuthGuard]},
  { path: 'administrativos/perfil', component: PerfilAdministrativoComponent, canActivate: [AuthGuard]},
  { path: 'administrativos/ModificarPerfil', component: ModificarPerfilAdministrativoComponent, canActivate: [AuthGuard]},
  { path: 'superusuario/ModificarPerfil', component: ModificarPerfilSuperuserComponent, canActivate: [AuthGuard]},
  { path: 'administrativos/asignaturas', component: AsignaturasComponent, canActivate: [AuthGuard]},
  { path: 'administrativos/asignaturasxperiodos', component: AsignaturasxperiodosComponent, canActivate: [AuthGuard]},
  { path: 'administrativos/aulas', component: AulasComponent, canActivate: [AuthGuard]},
  { path: 'administrativos/edificios', component: EdificiosComponent, canActivate: [AuthGuard]},
  { path: 'administrativos/carreras', component: CarrerasComponent, canActivate: [AuthGuard]},
  { path: 'administrativos/periodos', component: PeriodosComponent, canActivate: [AuthGuard]},
  { path: 'administrativos/ciclos', component:  CiclosComponent, canActivate: [AuthGuard]},
  { path: 'administrativos/subciclos', component: SubciclosComponent, canActivate: [AuthGuard]},
  { path: 'administrativos/creargrupos', component: CreargruposComponent, canActivate: [AuthGuard]},
  { path: 'administrativos/personal/administrativo', component: PersonaladminComponent, canActivate: [AuthGuard]},
  { path: 'administrativos/personal/docente', component: PersonaldocenteComponent, canActivate: [AuthGuard]},
  { path: 'administrativos/crearavisos', component: AvisosComponent, canActivate: [AuthGuard]},
  { path: 'administrativos/inscripciones', component: InscripcionesComponent, canActivate: [AuthGuard]},
  { path: 'preinscripciones/recibo', component: ReciboComponent, canActivate: [AuthGuard]},
  { path:'**',component: PaginaprincipalComponent},
];

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

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
    PerfilAdministrativoComponent,
    CalificacionesAlumnosComponent,
    PerfilAlumnosComponent,
    ModificarPerfilAdministrativoComponent,
    CalificacionesDocenteComponent,
    PreinscripcionesDatosComponent,
    ActasDocenteComponent,
    PreinscripcionesComenzarComponent,
    ModificarPerfilAlumnoComponent,
    MenuAdminComponent,
    DashboardAdminComponent,
    CajaComponent,
    VisualizarPDFComponent,
    DashboardSuperuserComponent,
    MenuSuperuserComponent,
    PerfilSuperuserComponent,
    ModificarPerfilSuperuserComponent,
    EscuelasComponent,
    UsuariosComponent,
    EdificiosComponent,
    AulasComponent,
    CarrerasComponent,
    PeriodosComponent,
    AsignaturasComponent,
    CiclosComponent,
    SubciclosComponent,
    CreargruposComponent,
    PersonaladminComponent,
    PersonaldocenteComponent,
    PaginaprincipalComponent,
    AvisosComponent,
    InscripcionesComponent,
    ReciboComponent,
    PerfilDocenteComponent,
    ModificarPerfilDocenteComponent,
    AsignaturasxperiodosComponent,
  ],
  imports: [
    NgbModule,
    BsDatepickerModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    FullCalendarModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    AngularFontAwesomeModule,
    DataTablesModule,
    SelectDropDownModule,
    // Add this import here
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost/Apis/public'],
        blacklistedRoutes: ['localhost/Apis/public/api/authpi/auth']
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuard,
    AbcService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

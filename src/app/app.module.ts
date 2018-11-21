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
import { AdeudosAlumnosComponent } from './adeudos-alumnos/adeudos-alumnos.component';
import { PerfilAlumnosComponent } from './perfil-alumnos/perfil-alumnos.component';
import { ModificarPerfilAdministrativoComponent } from './modificar-perfil-administrativo/modificar-perfil-administrativo.component';
import { CalificacionesDocenteComponent } from './calificaciones-docente/calificaciones-docente.component';
import { FaltasDocenteComponent } from './faltas-docente/faltas-docente.component';
import { PreinscripcionesComponent } from './preinscripciones/preinscripciones.component';
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



const routes = [
  { path:'alumnos',component: IndexComponent},
  { path:'administrativos',component: IndexAdminComponent, canActivate: [AuthGuard]},
  { path:'docente',component: DashboardDocenteComponent },
  { path:'docente/grupos',component: GruposComponent },
  { path:'docente/perfil',component: PerfilAdministrativoComponent },
  { path:'docente/ModificarPerfil',component: ModificarPerfilAdministrativoComponent },
  { path: 'alumnos/avisos', component: DashboardAlumnosComponent},
  { path: 'alumnos/estudios', component: EstudiosAlumnosComponent},
  { path: 'alumnos/horario', component: HorarioAlumnosComponent},
  { path: 'alumnos/calificaciones', component: CalificacionesAlumnosComponent},
  { path: 'alumnos/adeudos', component: AdeudosAlumnosComponent},
  { path: 'alumnos/perfil', component: PerfilAlumnosComponent},
  { path: 'docente/calificaciones', component: CalificacionesDocenteComponent},
  { path: 'docente/faltas', component: FaltasDocenteComponent},
  { path: 'docente/actas', component: ActasDocenteComponent},
  { path: 'preinscripciones', component: PreinscripcionesComponent},
  { path: 'preinscripciones/datos', component: PreinscripcionesDatosComponent},
  { path: 'preinscripciones/comenzar', component: PreinscripcionesComenzarComponent},
  { path: 'alumnos/ModificarPerfil',component: ModificarPerfilAlumnoComponent },
  { path: 'administrativos/dashboard',component: DashboardAdminComponent },
  { path: 'administrativos/caja',component: CajaComponent },
  { path: 'preinscripciones/guia',component: VisualizarPDFComponent },
  { path: 'superusuario/dashboard', component: DashboardSuperuserComponent},
  { path: 'superusuario/escuelas', component: EscuelasComponent},
  { path: 'superusuario/usuarios', component: UsuariosComponent},
  { path: 'superusuario/perfil', component: PerfilSuperuserComponent},
  { path: 'superusuario/ModificarPerfil', component: ModificarPerfilSuperuserComponent},
  { path: 'administrativos/asignaturas', component: AsignaturasComponent},
  { path: 'administrativos/aulas', component: AulasComponent},
  { path: 'administrativos/edificios', component: EdificiosComponent},
  { path: 'administrativos/carreras', component: CarrerasComponent},
  { path: 'administrativos/periodos', component: PeriodosComponent},
  { path: 'administrativos/ciclos', component:  CiclosComponent},
  { path: 'administrativos/subciclos', component: SubciclosComponent},
  { path: 'administrativos/creargrupos', component: CreargruposComponent},
  { path: 'administrativos/personal/administrativo', component: PersonaladminComponent},
  { path: 'administrativos/personal/docente', component: PersonaldocenteComponent},
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
    AdeudosAlumnosComponent,
    PerfilAlumnosComponent,
    ModificarPerfilAdministrativoComponent,
    CalificacionesDocenteComponent,
    FaltasDocenteComponent,
    PreinscripcionesComponent,
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
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    BrowserModule,
    FullCalendarModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    AngularFontAwesomeModule,
    DataTablesModule,
    SelectDropDownModule,
    // Add this import here
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4000/alocalhost/Apis/public'],
        blacklistedRoutes: ['localhost:4000/alocalhost/Apis/public/api/authpi/auth']
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

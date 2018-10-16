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
const routes = [
  { path:'alumnos',component: IndexComponent},
  { path:'administrativos',component: IndexAdminComponent},
  { path:'docente',component: DashboardDocenteComponent },
  { path:'docente/grupos',component: GruposComponent }
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
    GruposComponent
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

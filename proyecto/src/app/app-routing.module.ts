import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { DoctoresComponent } from './doctores/doctores.component';
import { ContactoComponent } from './contacto/contacto.component';
import { SesionComponent } from './sesion/sesion.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'doctores', component: DoctoresComponent},
  { path: 'contacto', component: ContactoComponent},
  { path: 'sesion', component: SesionComponent},
  { path: 'cuenta', component: CuentaComponent},
  { path: 'admin', component: AdminComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
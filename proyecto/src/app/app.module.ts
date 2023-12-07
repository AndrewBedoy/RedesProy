import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { DoctoresComponent } from './doctores/doctores.component';
import { ContactoComponent } from './contacto/contacto.component';
import { RegistroComponent } from './registro/registro.component';
import { SesionComponent } from './sesion/sesion.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { 
	IgxTimePickerModule,
	IgxInputGroupModule,
	IgxIconModule
 } from "igniteui-angular";
7;

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    InicioComponent,
    DoctoresComponent,
    ContactoComponent,
    RegistroComponent,
    SesionComponent,
    CuentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    IgxTimePickerModule,
	  IgxInputGroupModule,
	  IgxIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

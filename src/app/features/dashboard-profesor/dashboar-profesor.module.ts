import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboarProfesorRoutingModule } from './dashboar-profesor-routing.module';
import { MisContenidosComponent } from './mis-contenidos/mis-contenidos.component';
import { MisMateriasComponent } from './mis-materias/mis-materias.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActualizarInformesComponent } from './actualizar-informes/actualizar-informes.component';
import { ListarInformesMateriasComponent } from './listar-informes-materias/listar-informes-materias.component';
import { FormEditInformeComponent } from './form-edit-informe/form-edit-informe.component';
import { CicloLectivoComponent } from './ciclo-lectivo/ciclo-lectivo.component';
import { MostrarMateriasComponent } from './mostrar-materias/mostrar-materias.component';
import { DetalleMateriasComponent } from './detalle-materias/detalle-materias.component';





@NgModule({
  declarations: [MisContenidosComponent, MisMateriasComponent, ActualizarInformesComponent, ListarInformesMateriasComponent, FormEditInformeComponent, CicloLectivoComponent, MostrarMateriasComponent, DetalleMateriasComponent],
  imports: [
    CommonModule,
    DashboarProfesorRoutingModule,
    SharedModule
  ]
})
export class DashboarProfesorModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { ListarComponent } from './pages/listar/listar.component';

import { AddEditCursoComponent } from './pages/add-edit-curso/add-edit-curso.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CicloLectivoComponent } from './ciclo-lectivo/ciclo-lectivo.component';
import { AddCicloLectivoComponent } from './pages/add-ciclo-lectivo/add-ciclo-lectivo.component';


@NgModule({
  declarations: [
    ListarComponent,
    AddEditCursoComponent,
    CicloLectivoComponent,
    AddCicloLectivoComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    SharedModule
  ]
})
export class CursosModule { }

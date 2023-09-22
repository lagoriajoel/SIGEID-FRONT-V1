import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisContenidosComponent } from './mis-contenidos/mis-contenidos.component';
import { MisMateriasComponent } from './mis-materias/mis-materias.component';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ActualizarInformesComponent } from './actualizar-informes/actualizar-informes.component';
import { ListarInformesMateriasComponent } from './listar-informes-materias/listar-informes-materias.component';
import { FormEditInformeComponent } from './form-edit-informe/form-edit-informe.component';
import { CicloLectivoComponent } from './ciclo-lectivo/ciclo-lectivo.component';

const routes: Routes = [
  
    {
      path: '',
      component: LayoutComponent,
      children: [
      
        { path: 'misContenidos', component: MisContenidosComponent },
        { path: 'misMaterias', component: MisMateriasComponent },
        { path: 'actualizar', component: ActualizarInformesComponent},
        { path: 'listarInformesMaterias', component: ListarInformesMateriasComponent},
        { path: 'formActualzar', component: FormEditInformeComponent},
        { path: 'cicloLectivo', component: CicloLectivoComponent},



        { path:'**', redirectTo:'dashboard' }
      ]
    }

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboarProfesorRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardAlumnosComponent } from './dashboard-alumnos/dashboard-alumnos.component';
import { DashboardCicloLectivoComponent } from './dashboard-ciclo-lectivo/dashboard-ciclo-lectivo.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardHomeComponent },
      { path: 'dashboardAlumno', component: DashboardAlumnosComponent },
      { path: 'dashboardCicloLectivo', component: DashboardCicloLectivoComponent },

  
      { path:'**', redirectTo:'dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

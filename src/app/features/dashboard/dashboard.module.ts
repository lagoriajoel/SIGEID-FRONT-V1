import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardAlumnosComponent } from './dashboard-alumnos/dashboard-alumnos.component';
import { DashboardCicloLectivoComponent } from './dashboard-ciclo-lectivo/dashboard-ciclo-lectivo.component';


@NgModule({
    declarations: [DashboardHomeComponent, DashboardAlumnosComponent, DashboardCicloLectivoComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule
    ]
})
export class DashboardModule { }

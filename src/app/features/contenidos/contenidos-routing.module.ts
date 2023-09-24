import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ListarContenidosComponent } from './listar-contenidos/listar-contenidos.component';
import { ContenidosComponent } from './contenidos/contenidos.component';
import { HistorialContenidosComponent } from './historial-contenidos/historial-contenidos.component';

const routes: Routes = [
  {path:'', component: LayoutComponent,
  children:[
    { path:'listar/:id', component: ListarContenidosComponent },
    { path:'contenidos/:id', component: ContenidosComponent },
    { path:'historial', component: HistorialContenidosComponent },


  
    { path:'**', redirectTo:'contenidos' }
  
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContenidosRoutingModule { }

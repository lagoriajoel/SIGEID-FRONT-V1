import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoDto } from 'src/app/core/Entities/CursoDto';
import { Alumno } from 'src/app/core/Entities/alumno';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CursosService } from 'src/app/core/services/cursos/cursos.service';
import { NotificationService } from 'src/app/core/services/notification.service';


@Component({
  selector: 'app-dashboard-ciclo-lectivo',
  templateUrl: './dashboard-ciclo-lectivo.component.html',
  styleUrls: ['./dashboard-ciclo-lectivo.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardCicloLectivoComponent implements OnInit {
  dataSource!:CursoDto[];
  columnsToDisplay = ['cicloLectivo'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: CursoDto | null;
  alumno!:Alumno
  cursos!: CursoDto[]
  constructor(private cursoService:CursosService,
    private alumnosService:AlumnoService,
    private authService:AuthenticationService,
    private notificationService: NotificationService,
    private router:Router) {



      this.alumnosService.listaPorDni(this.authService.getUserName()).subscribe({
        next: data=>{ 
         
          this.alumno=data;
       
        this.cursoService.listaPorAlumno(this.alumno.id).subscribe({
          next: data=>{
           this.cursos=data
           this.dataSource=data
          
          },
          error:error=>{
            this.notificationService.openSnackBar(error.error.Mensaje);}
         })
        }

      })


   
   }

  ngOnInit(): void {
   
  }
  irAmaterias(cicloLectivo: string) {
   
    this.router.navigate(['/dashboard/dashboardAlumno/'], { 
      queryParams: {
        cicloLectivo: cicloLectivo
        
      }
    });
  }

}

import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoDto } from 'src/app/core/Entities/CursoDto';
import { Materia } from 'src/app/core/Entities/Materia';
import { Alumno } from 'src/app/core/Entities/alumno';
import { MateriasDto } from 'src/app/core/Entities/materias';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CursosService } from 'src/app/core/services/cursos/cursos.service';
import { MateriasService } from 'src/app/core/services/materias.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProfesorService } from 'src/app/core/services/profesor.service';
 
export interface ciclosLectivos {
  cicloLectivo: string;

}
@Component({
  selector: 'app-ciclo-lectivo',
  templateUrl: './ciclo-lectivo.component.html',
  styleUrls: ['./ciclo-lectivo.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CicloLectivoComponent implements OnInit {
  dataSource!:ciclosLectivos[];
  cursos:string[]=[]
  columnsToDisplay = ['cicloLectivo'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: ciclosLectivos | null;
  alumno!:Alumno
  materias!: MateriasDto[]
 materiasCicloLectivo!: MateriasDto[]
 ciclos: ciclosLectivos[]=[]
  unicos: string[]=[]
  constructor(private cursoService:CursosService,
    private alumnosService:AlumnoService,
    private profesorService:ProfesorService,
    private materiaService:MateriasService,
    private authService:AuthenticationService,
    private notificationService: NotificationService,
    private router:Router) {

      this.profesorService.listaPorDni(this.authService.getUserName()).subscribe(
        {
          next: data=> {
            console.log(data);
            
          this.materiaService.listarPorProfesor(data.id).subscribe({
            next: data=> {
               this.materias=data

               this.materias.forEach((materias) => {
                if (!this.unicos.includes(materias.cicloLectivo)){
                  this.unicos.push(materias.cicloLectivo)
                  this.ciclos.push({cicloLectivo:materias.cicloLectivo})
                 
                }
               
              })
              console.log(this.ciclos)
            
               this.dataSource = this.ciclos
           
            }
          })
          
          },
          error: (err) => {
            
          }
        }
      )
     

  


   
   }

  ngOnInit(): void {
    setTimeout(() => {
      

   
    }, 10);
    
  }
  irAmaterias(cicloLectivo: string) {
   
    this.router.navigate(['/dashboardProfesor/misMaterias'], { 
      queryParams: {
        cicloLectivo: cicloLectivo,
        contenidos: 'true'
        
      }
    });
  }

}

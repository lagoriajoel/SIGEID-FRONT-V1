import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoDto } from 'src/app/core/Entities/CursoDto';
import { Alumno } from 'src/app/core/Entities/alumno';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CursosService } from 'src/app/core/services/cursos/cursos.service';
export interface PeriodicElement {
  curso: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    curso: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
  },
  {
    position: 2,
    curso: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
  },
  {
    position: 3,
    curso: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
  },
  {
    position: 4,
    curso: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
  },
 
];
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
    private router:Router) {
      this.alumnosService.listaPorDni(this.authService.getUserName()).subscribe({
        next: data=>{ 
         
          this.alumno=data;
        console.log(this.alumno);
        }

      })


   
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.cursoService.listaPorAlumno(Number(localStorage.getItem('alumnoId')!)).subscribe({
        next: data=>{
         this.cursos=data
         this.dataSource=data
         console.log(this.dataSource);
        }
       })
    }, 5);
  }
  irAmaterias(cicloLectivo: string) {
   
    this.router.navigate(['/dashboard/dashboardAlumno/'], { 
      queryParams: {
        cicloLectivo: cicloLectivo
        
      }
    });
  }

}

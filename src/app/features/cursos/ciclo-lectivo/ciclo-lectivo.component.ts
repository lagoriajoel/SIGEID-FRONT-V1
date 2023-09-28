import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoDto } from 'src/app/core/Entities/CursoDto';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CursosService } from 'src/app/core/services/cursos/cursos.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AddCicloLectivoComponent } from '../pages/add-ciclo-lectivo/add-ciclo-lectivo.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ciclo-lectivo',
  templateUrl: './ciclo-lectivo.component.html',
  styleUrls: ['./ciclo-lectivo.component.css']
})
export class CicloLectivoComponent implements OnInit {

  isCurso: boolean = false;
  columnsToDisplay = ['cicloLectivo'];
  ciclosLectivos:string[] = [];
  isAlumno: boolean = false;
  isInforme: boolean = false;
  isInformeDesempenio: boolean = false;
  isMaterias: boolean = false; //
  isDirectivo: boolean = false;

  cursos!: CursoDto[]
  constructor(private cursoService:CursosService,
    
    private authService:AuthenticationService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router:Router) {

      this.route.queryParamMap.subscribe((params) => {
        params.get("alumnos") ? (this.isAlumno = true) : (this.isAlumno = false);
        params.get("informes")
          ? (this.isInforme = true)
          : (this.isInforme = false);
        params.get("curso") ? (this.isCurso = true) : (this.isCurso = false);
        params.get("informesDesempenio")
          ? (this.isInformeDesempenio = true)
          : (this.isInformeDesempenio = false);
        params.get("materias")
          ? (this.isMaterias = true)
          : (this.isMaterias = false);
  
        })
       
       this.cargarCiclos()


   
   }
   cargarCiclos(){
    this.cursoService.lista().subscribe({
      next: data=>{
      
        this.cursos=data

       let datos= data.map(data=>data.cicloLectivo)

       let ciclos= new Set(datos)

        this.ciclosLectivos=Array.from(ciclos)
     
      }
      })
   }

  ngOnInit(): void {
   
  }

  agregarCiclo(){

    const dialogRef = this.dialog.open(AddCicloLectivoComponent, {
      width: "550px",
      disableClose: true,
      data: { },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let ciclo = localStorage.getItem("ciclo")
        this.ciclosLectivos.push(ciclo!)
        //this.cargarCiclos();
      }
    });
  }

  irCursos(cicloLectivo: string) {
   

   

    
    this.router.navigate(['/cursos/'], { 
      queryParams: {
        cicloLectivo: cicloLectivo,
        // informesDesempenio: false,
        // curso: this.isCurso
        
      }
    });
  }

}


import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { MateriasDto } from 'src/app/core/Entities/materias';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MateriasService } from 'src/app/core/services/materias.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProfesorService } from 'src/app/core/services/profesor.service';
export interface EmpFilter {
  name:string;
  options:string[];
  defaultValue:string;
}

export interface filterOption{
  name:string;
  value:string;
  isdefault:boolean;
}
@Component({
  selector: 'app-mis-materias',
  templateUrl: './mis-materias.component.html',
  styleUrls: ['./mis-materias.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MisMateriasComponent implements OnInit {

  materias: MateriasDto[] = [];
  loading: boolean=false
  id = null;
  isContenidos=false;
  isInformes=0;
  isMaterias: boolean=false;
  informes: boolean=false;
  cicloLectivo:string="";
  
 
  dataSource!:MateriasDto[];
  columnsToDisplay = ['nombre','anioCurso'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: MateriasDto | null;
 
  
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
   private profesorService: ProfesorService,
   private materiaService: MateriasService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _routes :ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
    

  ) {
    
    this.titleService.setTitle("Gestion de Informes - Mis Espacios");
   
    this.route.queryParamMap.subscribe((params) => {
      params.get("contenidos") ? (this.isContenidos = true) : (this.isContenidos = false);
      this.cicloLectivo = params.get("cicloLectivo")!
     
      if (params.get("informes")) {
          this.isInformes=1
          this.informes=true
         
      }
      else {
        this.isInformes=0
          this.informes=false
      }
      params.get("materias") ? (this.isMaterias = true) : (this.isMaterias = false);

    })
    this.listarMaterias();
    
  
   
  }

  
  generarInformes(materia: MateriasDto){
    this.router.navigate(["/informes/listar/"], { 
      queryParams: {
        curso:materia.curso.id,
        asignatura:materia.asignatura_id,
        informe: 0,
        nombreAsignatura:materia.nombre
      }});
  }
  contenidos(materia: MateriasDto){
    this.router.navigate(["/contenidos/contenidos/", materia.asignatura_id]);
  }
  actualizar(materia: MateriasDto){
    this.router.navigate(["/informes/listar/"], { 
      queryParams: {
        curso:materia.curso.id,
        asignatura:materia.asignatura_id,
        informe: 1,
        nombreAsignatura:materia.nombre
      }});
  }
  actualizarMesa(materia: MateriasDto){
    console.log(materia);
    this.router.navigate(['/dashboardProfesor/listarInformesMaterias'], { 
      queryParams: {
        nombreMateria: materia.nombre,
        anioMateria:materia.anioCurso,
        idAsignatura: materia.asignatura_id,
        cicloLectivo: materia.cicloLectivo
        

                }
    }) 
}
  ngOnInit() {

   
   


   
    
    
    
  }


  listarMaterias(): void {
  

      this.profesorService.listaPorDni(this.authService.getUserName()).subscribe(
        {
          next: data=> {
            console.log(data);
            
          this.materiaService.listarPorProfesorPorCicloLectivo(data.id, this.cicloLectivo).subscribe({
            next: data=> {
              console.log(data);
              this.dataSource=data
            }
          })
          
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
     
     
   
    
  }


  

  
  

  
  mensajeExito() {
    this._snackBar.open('La persona fue eliminada con exito', '', {
      duration: 2000
    });
  }

  
  mostrarFila(asignaturas: MateriasDto){
    

    if(this.isContenidos)
      {
        
       // this.router.navigate(["/contenidos/listar/", asignaturas.asignatura_id]);
       this.router.navigate(["/contenidos/contenidos/", asignaturas.asignatura_id]);
      }
    
    
   else {


    this.router.navigate(["/informes/listar/"], { 
      queryParams: {
        curso:asignaturas.curso.id,
        asignatura:asignaturas.asignatura_id,
        informe: this.isInformes,
        nombreAsignatura:asignaturas.nombre
      }});
    }

    // this.router.navigate(["/informes/actualizarInforme/"], { 
    //   queryParams: {
    //     curso:asignaturas.curso.id,
    //     asignatura:asignaturas.asignatura_id,
    //     informe: this.isInformes,
    //     nombreAsignatura:asignaturas.nombre
    //   }});
    // }
   }

  



  





}

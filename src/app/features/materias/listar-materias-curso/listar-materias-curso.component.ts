import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriasDto } from 'src/app/core/Entities/materias';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MateriasService } from 'src/app/core/services/materias.service';
import { AgregarMateriasCursoComponent } from '../agregar-materias-curso/agregar-materias-curso.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-listar-materias-curso',
  templateUrl: './listar-materias-curso.component.html',
  styleUrls: ['./listar-materias-curso.component.css']
})
export class ListarMateriasCursoComponent implements OnInit {

  materias: MateriasDto[] = [];
  loading: boolean = false;
  idCurso!:number;
  isContenidos = false;
  isInformes = 0;
  isMaterias: boolean = false;
  informes: boolean = false;
  isAdministrador: boolean = false;
  

  displayedColumns: string[] = ["nombre", "año", "division", "cicloLectivo","acciones"];
  dataSource = new MatTableDataSource(this.materias);

  clickedRows = new Set<MateriasDto>();

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private titleService: Title,
   
    private materiaService: MateriasService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _routes: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    this.dataSource = new MatTableDataSource();

  }

  ngOnInit() {
    this.titleService.setTitle("Gestion de Informes - Mis Espacios");
    this.dataSource.sort = this.sort;
    this.route.queryParamMap.subscribe((params) => {
     this.idCurso= Number(params.get("curso")); 
   
     this.authService.isAdmin()? this.isAdministrador=true: false;
     console.log(this.isAdministrador);
  
    });


    this.listarMaterias(this.idCurso);
  }
  listarMaterias(id: number): void {
    this.materiaService.listarCurso(id).subscribe({
      next: (data) => {
      
        this.dataSource.data = data;
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  

  mostrarFila(asignaturas: MateriasDto) {
   
    if(this.isAdministrador) {
         console.log("administrador");
    }
    
    else {
      if (this.isContenidos) {
   
        this.router.navigate([
          "/contenidos/contenidos/",
          asignaturas.asignatura_id,
        ]);
      } else {
        this.router.navigate(["/informes/listar/"], {
          queryParams: {
            curso: asignaturas.curso.id,
            asignatura: asignaturas.asignatura_id,
            informe: 1,
            nombreAsignatura: asignaturas.nombre,
            directivo:1
          },
        });
      }
  
     
    }
  }

  addEspacio(id?: number){
      console.log(id);
    const dialogRef = this.dialog.open(AgregarMateriasCursoComponent, {
      width: "550px",
      disableClose: true,
      data: { idCurso: this.idCurso,
              id: id},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarMaterias(this.idCurso);
      }
    });

  }
  EditMateria(id: number) {

  }
  deleteCurso(id: number) {
       
     this.dialog.open(ConfirmDialogComponent, {
      width: "500px",
      disableClose: true,
   data: {
    title:"Eliminar Espacio Curricular",
    message:"¿Esta seguro de eliminar el Espacio?"
   }
   

    }).afterClosed().subscribe((res) => {

     if(res){
      this.materiaService.delete(id).subscribe(() => {
        this.listarMaterias(this.idCurso);
        this.mensajeExito();
      },
      error => {
        this.notificationService.openSnackBar(error.error.Mensaje);
      })
     }

    });

    
    this.loading = true;
  }
  
  mensajeExito() {
    this._snackBar.open('El espacio curricular fue eliminado con exito', '', {
      duration: 2000
    });
  }
}

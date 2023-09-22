import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { InformesAlumnoDto } from 'src/app/core/Entities/InformeAlumnoDto';
import { Alumno } from 'src/app/core/Entities/alumno';
import { Informes } from 'src/app/core/Entities/informe';
import { informeIdDto } from 'src/app/core/Entities/informeIdDto';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-dashboard-alumnos',
  templateUrl: './dashboard-alumnos.component.html',
  styleUrls: ['./dashboard-alumnos.component.css']
})
export class DashboardAlumnosComponent implements OnInit {

  alumnos: Alumno[] = [];
  alumno!: Alumno;
  informesDesempenio: InformesAlumnoDto[] = [];
  loading: boolean = true;
  id = null;
  dni_ingresado: string = "";
  AsignaturaInforme: string = "";
  CursoInforme: string = "";
  nombreAlumno!: string;
  apellidoAlumno!: string;
  cicloLectivo: string = "";
  mesaExamen:boolean=false
  isAdmin:boolean = false
  cicloLecto:string = "";
  

  displayedColumns: string[] = ["Asignatura", "Curso", "acciones"];
  dataSource = new MatTableDataSource(this.informesDesempenio);

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private alumnoService: AlumnoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _routes: ActivatedRoute,
    private _router: Router,
    private _authService: AuthenticationService
  ) {
    this.dataSource = new MatTableDataSource();
    this._routes.queryParamMap
    .subscribe((params) => {
      params.get("mesa") ? (this.mesaExamen= true) : (this.mesaExamen = false);
      this.cicloLectivo = params.get("cicloLectivo")!;
      console.log(this.cicloLectivo);
      

    })
  }

  ngOnInit() {
    this.titleService.setTitle("Gestion de Informes - Cursos");
    
   
    this.dataSource.sort = this.sort;

    this.listarInformesAlumnos(this._authService.getUserName())


    this.isAdmin=this._authService.isAdmin()
    

    
  }

  filtrarInformesAlumnos(cicloLectivo:string, informe:InformesAlumnoDto[]):InformesAlumnoDto[] {

    const informeFiltrado = informe.filter(informe =>informe.asignatura.cicloLectivo==cicloLectivo)   
    
    
    return informeFiltrado;
  }

  listarInformesAlumnos(dni:string): void {
    this.alumnos = [];
   
     
        this.alumnoService.listaPorDni(dni).subscribe({
         next: (data) => {
            
        
            this.alumnos.push(data);
            this.alumno = data;
            this.dataSource.data = this.filtrarInformesAlumnos(this.cicloLectivo, data.informeDesempenios);
            
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          
            this.nombreAlumno = this.alumno.nombres;
            this.apellidoAlumno = this.alumno.apellido;
          },
         error: (error) => {
            this.notificationService.openSnackBar(error.error.Mensaje);
          }
  });

      
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // enviamos el id del informe al back

  generarPDF(id: number) {
    let informeId = id;

    this.alumnoService
      .generarPDF(informeId,this._authService.getUserName() )
      .subscribe((data) => {
        let donwloadURL = window.URL.createObjectURL(data);
        // let link= document.createElement('a')
        // link.href=donwloadURL
        // link.download="informe.pdf"
        // link.click()
        console.log(data);

        window.open(donwloadURL, "_blank");
      });
  }

  //metodo que lleva al componente actualiza informe

  actualizarInforme(idInforme: number){

    this._router.navigate(["/mesa/mostrar"])

  }

  
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { InformesAlumnoDto } from 'src/app/core/Entities/InformeAlumnoDto';
import { Alumno } from 'src/app/core/Entities/alumno';
import { Informes } from 'src/app/core/Entities/informe';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CursosService } from 'src/app/core/services/cursos/cursos.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  alumnos: Alumno[] = [];
  alumno!: Alumno;
  informesDesempenio1: InformesAlumnoDto[] = [];
  informesDesempenio2: InformesAlumnoDto[] = [];
  informesDesempenio3: InformesAlumnoDto[] = [];
  informesDesempenio4: InformesAlumnoDto[] = [];
  informesDesempenio5: InformesAlumnoDto[] = [];
  informesDesempenio6: InformesAlumnoDto[] = [];

  loading: boolean = true;
  id = null;
  dni_ingresado: string = "";
  dniAlumno: string = ""
  AsignaturaInforme: string = "";
  CursoInforme: string = "";
  NombreAlumno!: string;
  apellidoAlumno!: string;
  emailAlumno!: string;
  cicloLectivo: string = "";
  mesaExamen:boolean=false
  isAdmin:boolean = false
  form!: FormGroup;

  displayedColumns: string[] = ["Asignatura", "Curso","cicloLectivo", "acciones"];
  dataSource1 = new MatTableDataSource(this.informesDesempenio1);
  dataSource2 = new MatTableDataSource(this.informesDesempenio2);
  dataSource3 = new MatTableDataSource(this.informesDesempenio3);
  dataSource4 = new MatTableDataSource(this.informesDesempenio4);
  dataSource5 = new MatTableDataSource(this.informesDesempenio5);
  dataSource6 = new MatTableDataSource(this.informesDesempenio6);


  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
  
  
    private notificationService: NotificationService,
    private alumnoService: AlumnoService,
    public dialog: MatDialog,
    private _routes: ActivatedRoute,
    private _router: Router,
    private cursoService: CursosService
    
  ) {
    this.dataSource1 = new MatTableDataSource();
    this._routes.queryParamMap
    .subscribe((params) => {
      params.get("mesa") ? (this.mesaExamen= true) : (this.mesaExamen = false);
    })

   
  }
  private createForm() {
    //const savedUserEmail = localStorage.getItem('savedUserEmail');

    this.form = new FormGroup({
      dni: new FormControl('', [Validators.required]),
     
      
      
      });
}
 
  ngOnInit() {
       
   
   
    this.createForm();
    
  }


  listarInformesAlumnos(dni:string): void {
    this.alumnos = [];
    this.dni_ingresado=dni;
   
     
        this.alumnoService.listaPorDni(dni).subscribe({
         next: (data) => {
            console.log(data);
        
            this.alumnos.push(data);
            this.alumno = data;
            
           
          
           this.informesDesempenio1= data.informeDesempenios.filter(data => data.asignatura.anioCurso=="1")
           this.informesDesempenio2= data.informeDesempenios.filter(data => data.asignatura.anioCurso=="2")
           this.informesDesempenio3= data.informeDesempenios.filter(data => data.asignatura.anioCurso=="3")
           this.informesDesempenio4= data.informeDesempenios.filter(data => data.asignatura.anioCurso=="4")
           this.informesDesempenio5= data.informeDesempenios.filter(data => data.asignatura.anioCurso=="5")
           this.informesDesempenio6= data.informeDesempenios.filter(data => data.asignatura.anioCurso=="6")

           this.dataSource1.data=this.informesDesempenio1
           this.dataSource2.data=this.informesDesempenio2
           this.dataSource3.data=this.informesDesempenio3
           this.dataSource4.data=this.informesDesempenio4
           this.dataSource5.data=this.informesDesempenio5
           this.dataSource6.data=this.informesDesempenio6


          
            this.NombreAlumno = this.alumno.nombres;
            this.apellidoAlumno = this.alumno.apellido;
            this.dniAlumno=data.dni
            this.emailAlumno=data.email



          },
         error: (error) => {
            this.notificationService.openSnackBar(error.error.Mensaje);
          }
  });

      
  }
 

  buscarAlumno(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
     filterValue.trim().toLowerCase();
     this.dni_ingresado=filterValue
   
    console.log(filterValue);
  }
buscar(){
  this.listarInformesAlumnos(this.form.get('dni')?.value)
 
}

  ngAfterViewInit() {
  
  }

  // enviamos el id del informe al back

  generarPDF(id: number) {
    let informeId = id;

    this.alumnoService
      .generarPDF(informeId,this.dni_ingresado )
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

  historialContenidos(id: number){
      
      
      
   
    this._router.navigate(['contenidos/historial'],{ 
      queryParams: {
        informeId:id,
        alumnoId: this.alumno.id
       
        

                }
    })

  }

  
}

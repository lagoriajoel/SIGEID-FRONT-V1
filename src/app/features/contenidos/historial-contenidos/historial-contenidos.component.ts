import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { contenidoAdeudadoDto } from 'src/app/core/Entities/contenidoAdeudadoDto';
import { contenidoInformeDto } from 'src/app/core/Entities/contenidoInformeDto';
import { Informes } from 'src/app/core/Entities/informe';
import { InformeContenidoDto } from 'src/app/core/Entities/informeContenidosDto';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { InformesService } from 'src/app/core/services/informes.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-historial-contenidos',
  templateUrl: './historial-contenidos.component.html',
  styleUrls: ['./historial-contenidos.component.css']
})
export class HistorialContenidosComponent implements OnInit {

  contenidos: contenidoAdeudadoDto[] = [];
  contenidoActualizar!: contenidoAdeudadoDto;
  contenidosDesaprobados: contenidoAdeudadoDto[] = [];
  form: FormGroup;
  NombreAlumno: string = "";
  ApellidoAlumno: string = "";
  NombreCurso: string = "";
  NombreDivision: string = "";
  email: string = "";
  alumnoInforme!: Informes;
  estado: boolean = false;
  informeId!: number;
  alumnoId!: number;
  informeActualizado!: InformeContenidoDto;
  presidenteMesa: string = "";
  fechaMesa!: Date;
  contenidosInforme: contenidoInformeDto[] = [];
  InstanciaDicFecha:string = "";
  InstanciaFebFecha:string = "";
  Instanci1_Fecha:string = "";
  Instancia2_Fecha:string = "";
  Instancia3_Fecha:string = "";
  Instancia4_Fecha:string = "";


  NombreProfesor: string = "";
  NombreAsignatura: string = "";
  dniAlumno: string = "";
  cicloLectivo: string = "";
  value: boolean = false;


  rowHeight: number = 0;

  instanciaSelect: string = "";

  displayedColumns: string[] = ["nombre", "diciembre"];
  displayedColumns2: string[] = ["nombre", "Febrero"];
  displayedColumns3: string[] = ["nombre", "instancia"];
  displayedColumns4: string[] = ["nombre", "instancia"];
  displayedColumns5: string[] = ["nombre", "instancia"];
  displayedColumns6: string[] = ["nombre", "instancia"];

  

  dataSource: any;
  dataSource2: any;
  dataSource3: any;
  dataSource4: any;
  dataSource5: any;
  dataSource6: any;

  

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
   
    
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private _informeService: InformesService,
    private _alumnoService: AlumnoService,
    private auth: AuthenticationService,
    private route: ActivatedRoute
  
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.informeId = +params.get("informeId")!;
      this.alumnoId= +params.get("alumnoId")!;
    })
    this.form = this.fb.group({
      Fecha: ["", [Validators.required]],
    });

   

    this.dataSource = new MatTableDataSource<contenidoAdeudadoDto>(this.contenidosDesaprobados);
    this.dataSource2 = new MatTableDataSource<contenidoAdeudadoDto>(this.contenidosDesaprobados);
    this.dataSource3 = new MatTableDataSource<contenidoAdeudadoDto>(this.contenidosDesaprobados);
    this.dataSource4 = new MatTableDataSource<contenidoAdeudadoDto>(this.contenidosDesaprobados);
    this.dataSource5 = new MatTableDataSource<contenidoAdeudadoDto>(this.contenidosDesaprobados);
    this.dataSource6 = new MatTableDataSource<contenidoAdeudadoDto>(this.contenidosDesaprobados);
  
  
    console.log(this.alumnoInforme);

   
  }

 

 

  ngOnInit(): void {
    this._alumnoService.detail(this.alumnoId).subscribe({
      next: (data) => {
        console.log(data);
        this.NombreAlumno = data.nombres;
        this.ApellidoAlumno = data.apellido;
        this.dniAlumno = data.dni;
        this.email = data.email;
      }
    })
    this._informeService.detail(this.informeId).subscribe({
      next: (data) => {

        this.NombreProfesor=data.asignatura.profesor.nombreCompleto
        this.cicloLectivo=data.asignatura.cicloLectivo
        this.InstanciaDicFecha="Dic/"+data.asignatura.cicloLectivo
        this.InstanciaFebFecha="Feb/"+(Number(data.asignatura.cicloLectivo)+1).toString()
        this.Instanci1_Fecha=(data.fechaInstancia_1)
        this.Instancia2_Fecha=(data.fechaInstancia_2)
        this.Instancia3_Fecha=(data.fechaInstancia_3)
        this.Instancia4_Fecha=(data.fechaInstancia_4)
        var array = [ ];
        
        let hash: any = {};
        array = data.contenidosAdeudados.filter(o => hash[o.id] ? false : hash[o.id] = true);
       


        let contenidos: any[] = [];
        let contenidos2: any[] = [];
        let contenidos3: any[] = [];



      
       

        this.dataSource.data =array
        contenidos= array.filter(cont => cont.instanciaEvaluacion_diciembre=="desaprobado" || cont.instanciaEvaluacion_diciembre=="ausente")
        

        this.dataSource2.data = contenidos
        
        contenidos2= array.filter(cont => cont.instanciaEvaluacion_febrero=="desaprobado" || cont.instanciaEvaluacion_febrero=="ausente");
        this.dataSource3.data = contenidos2

        contenidos3= contenidos2.filter(cont => cont.instanciaEvaluacion_1=="desaprobado" || cont.instanciaEvaluacion_1=="ausente");
        this.dataSource4.data =  contenidos3;
       
        contenidos3= contenidos2.filter(cont => cont.instanciaEvaluacion_2=="desaprobado"|| cont.instanciaEvaluacion_2=="ausente");

        this.dataSource5.data =  contenidos3;

        contenidos3= contenidos2.filter(cont => cont.instanciaEvaluacion_3=="desaprobado"|| cont.instanciaEvaluacion_3=="ausente");

        this.dataSource6.data =  contenidos3;

       }
    })
  }
  cancelar() {
  
  }

  //evaluar instancias de evaluacion
 

  actualizarInforme() {
    
  }
  colorFila(inf: string): any {

    if (inf == "desaprobado") {
      return "resaltadoDesaprobado";
    }
    else if (inf == "aprobado") {
      return "resaltadoAprobado";
    }
    else if (inf == "ausente") {
      return "resaltadoAusente";
    }

  }
}


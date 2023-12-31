import { MateriasDto } from "./../../../core/Entities/materias";
import { Component, OnInit, ViewChild } from "@angular/core";

import { NGXLogger } from "ngx-logger";
import { NotificationService } from "src/app/core/services/notification.service";
import { Title } from "@angular/platform-browser";
import { CursosService } from "src/app/core/services/cursos/cursos.service";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { MateriasService } from "src/app/core/services/materias.service";

@Component({
  selector: "app-listar-materias",
  templateUrl: "./listar-materias.component.html",
  styleUrls: ["./listar-materias.component.css"],
})
export class ListarMateriasComponent implements OnInit {
  materias: MateriasDto[] = [];
  loading: boolean = true;
  idAsignatura: number = 0;
  isGenerarInforme: boolean = false;
  id: string='';
  anoCurso: String =''
  isContenido!: number;
  informe: number = 0;
 
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private cursoService: CursosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _materiasService: MateriasService,
    private _routes: ActivatedRoute
  ) {

    this._routes.queryParamMap
    .subscribe((params) => {
     
       
  
       this.id=params.get("curso")!;
       this.anoCurso=params.get("anioCurso")!;
       this.isContenido=Number(params.get("isContenido")!);
       this.informe=Number(params.get("isInforme"))!;
    
     
  
     
    }
  );
  }

  ngOnInit() {
    this.titleService.setTitle("Gestion de Informes - Cursos");
   
    this.cargarMaterias();
  }
  cargarMaterias(): void {
    this._materiasService.lista().subscribe((data) => {
      this.materias = data;
    });
  }

  ngAfterViewInit() {}

   
  addInforme(id: number, nombreAsignaturas: string): void {
    
    this.idAsignatura = id;
    

    
    if(this.isContenido===0){
      
   
      this.router.navigate(["/contenidos/listar/", this.idAsignatura]);
    }
   else {
      
     // this.router.navigate(["/informes/listar/", this.id, this.idAsignatura]); 
    
     this.router.navigate(["/informes/listar/"], {
      queryParams: {
        curso:this.id,
        asignatura:this.idAsignatura,
        informe: this.informe,
        nombreAsignatura: nombreAsignaturas
      }});
   }
  }

  

 
}

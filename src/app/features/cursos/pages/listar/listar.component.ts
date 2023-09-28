import { ActivatedRoute, Router } from "@angular/router";
import { AddEditCursoComponent } from "./../add-edit-curso/add-edit-curso.component";
import { Subscription } from "rxjs";

import { CursosService } from "./../../../../core/services/cursos/cursos.service";

import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NGXLogger } from "ngx-logger";
import { Title } from "@angular/platform-browser";
import { NotificationService } from "src/app/core/services/notification.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CursoDto } from "src/app/core/Entities/CursoDto";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatSelectChange } from "@angular/material/select";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";

export interface EmpFilter {
  name: string;
  options: string[];
  defaultValue: string;
}

export interface filterOption {
  name: string;
  value: string;
  isdefault: boolean;
}

@Component({
  selector: "app-listar",
  templateUrl: "./listar.component.html",
  styleUrls: ["./listar.component.css"],
})
export class ListarComponent implements OnInit {
  cursos: CursoDto[] = [];
  loading: boolean = true;
  id: number = 0;
  añoCurso!: string;
  isContenidos: number = 0;
  isAlumno: boolean = false;
  isInforme: boolean = false;
  isInformeDesempenio: boolean = false;
  isMaterias: boolean = false; //
  isDirectivo: boolean = false;
  isCurso: boolean = false;
  color: string = "";
  informesPorAsignatura: number = 0;

  isAdmin: boolean = false;

  defaultValue = "Todos";

  filterDictionary = new Map<string, string>();

  anio: string[] = ["Todos", "1", "2", "3", "4", "5", "6"];
  division: string[] = ["Todos", "A", "B", "C", "D", "F", "G", "H", "I"];
  ciclosLectivo: string[] = [];
  cicloLectivo!: string;

  empFilters: EmpFilter[] = [];

  displayedColumns: string[] = [
    "anio",
    "Division",
    "Tecnicatura",
    "turno",
    "cicloLectivo",
    "acciones",
    "contenidos",
  ];

  dataSource = new MatTableDataSource(this.cursos);
  dataSourceFilters = new MatTableDataSource(this.cursos);

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private cursoService: CursosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private route: ActivatedRoute,
    private auth: AuthenticationService
  ) {
    this.dataSource = new MatTableDataSource();
    this.auth.isAdmin() ? (this.isAdmin = true) : (this.isAdmin = false);
    this.auth.isDirectivo() ? (this.isDirectivo = true) : this;
  }

  ngOnInit() {
    this.titleService.setTitle("Gestion de Informes - Cursos");
    this.dataSource.sort = this.sort;
 
    this.route.queryParamMap.subscribe((params) => {
      params.get("alumnos") ? (this.isAlumno = true) : (this.isAlumno = false);
      params.get("informes")
        ? (this.isInforme = true)
        : (this.isInforme = false);
      params.get("curso") ? (this.isCurso = true) : (this.isCurso = false);
      // params.get("informesDesempenio")
      //   ? (this.isInformeDesempenio = true)
      //   : (this.isInformeDesempenio = false);
      params.get("materias")
        ? (this.isMaterias = true)
        : (this.isMaterias = false);

      this.cicloLectivo = params.get("cicloLectivo")!;
    

      this.cargarCurso();
    });

    //filtrado
    setTimeout(() => {
      this.empFilters.push({
        name: "anio",
        options: this.anio,
        defaultValue: this.defaultValue,
      });
      this.empFilters.push({
        name: "division",
        options: this.division,
        defaultValue: this.defaultValue,
      });
      // this.empFilters.push({name:'cicloLectivo',options:this.ciclosLectivo,defaultValue:"2023"});
    }, 10);

    this.dataSource.filterPredicate = function (record, filter) {
      var map = new Map(JSON.parse(filter));
      let isMatch = false;
      for (let [key, value] of map) {
        isMatch = value == "Todos" || record[key as keyof CursoDto] == value;
        if (!isMatch) return false;
      }
      return isMatch;
    };
  }

  //metodos para el filtrado
  applyEmpFilter(ob: MatSelectChange, empfilter: EmpFilter) {
    this.filterDictionary.set(empfilter.name, ob.value);

    var jsonString = JSON.stringify(
      Array.from(this.filterDictionary.entries())
    );

    this.dataSource.filter = jsonString;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // metodo que lista los curso
  cargarCurso(): void {
    this.cursoService.lista().subscribe({
      next: (data) => {
        console.log(data);
        let cursosFilter = data.filter(
          (curso) => curso.cicloLectivo == this.cicloLectivo
        );
        console.log(cursosFilter);
        this.dataSource.data = cursosFilter;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // agregar un curso o editarlo
  addEditCurso(id?: number) {
    const dialogRef = this.dialog.open(AddEditCursoComponent, {
      width: "550px",
      disableClose: true,
      data: { id: id, cicloLectivo: this.cicloLectivo },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarCurso();
      }
    });
  }

  deleteCurso(id: number) {
    this.loading = true;

    this.dialog
      .open(ConfirmDialogComponent, {
        width: "500px",
        disableClose: true,
        data: {
          title: "Eliminar Curso",
          message: "¿Esta seguro de eliminar el Curso?",
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.cursoService.delete(id).subscribe({
            next: (data) => {
              {
                this.cargarCurso();
                this.mensajeExito();
              }
            },
            error: (error) => {
              this.notificationService.openSnackBar(error.error.Mensaje);
              this.cargarCurso();
            },
          });
        }
      });
  }
  mensajeExito() {
    this._snackBar.open("El curso fue eliminada con exito", "", {
      duration: 2000,
    });
  }

  addAlumno(id: number) {
    this.id = id;

    this.router.navigate(["/alumnos/listar/", this.id]);
  }
  //generar informes de desempeño del curso. se envia por url id curso y año para el filtrado

  irMaterias(id: number, añoCurso: string) {
    this.isContenidos = 1;
    this.id = id;
    this.añoCurso = añoCurso;

    this.router.navigate(["/materias/mostrar/"], {
      queryParams: {
        curso: this.id,
        anioCurso: this.añoCurso,
        
      },
    });
  }

  agregarContenido(id: number, añoCurso: string) {
    this.isContenidos = 0;
    this.id = id;
    this.añoCurso = añoCurso;

    this.router.navigate(["/materias/listar/"], {
      queryParams: {
        curso: this.id,
        anioCurso: this.añoCurso,
        isContenido: this.isContenidos,
      },
    });
  }

  mostrarFila(curso1: CursoDto) {
    console.log(curso1);

    this.id = curso1.id;
    console.log(this.id);
    if (this.isInforme) {
      this.isContenidos = 1;
      this.id = curso1.id;
      this.añoCurso = curso1.anio;
      this.informesPorAsignatura = 1;

      this.router.navigate(["/materias/listar/"], {
        queryParams: {
          curso: this.id,
          anioCurso: this.añoCurso,
          isContenido: this.isContenidos,
          isInforme: this.informesPorAsignatura,
        },
      });
    } else if (this.isDirectivo) {
      this.router.navigate(["/directivo/listar/"], {
        queryParams: {
          curso: this.id,
          anioCurso: this.añoCurso,
        },
      });
    } else if (this.isMaterias) {
      this.router.navigate(["/materias/listarMaterias/"], {
        queryParams: {
          curso: this.id,
          anioCurso: this.añoCurso,
        },
      });
    } else {
      this.router.navigate(["/alumnos/listar/", this.id]);
    }
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
    }
  }
}

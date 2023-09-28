import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { NGXLogger } from "ngx-logger";
import { CursoDto } from "src/app/core/Entities/CursoDto";
import { MateriasDto } from "src/app/core/Entities/materias";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { MateriasService } from "src/app/core/services/materias.service";
import { ProfesorService } from "src/app/core/services/profesor.service";

@Component({
  selector: "app-detalle-materias",
  templateUrl: "./detalle-materias.component.html",
  styleUrls: ["./detalle-materias.component.css"],
})
export class DetalleMateriasComponent implements OnInit {
  materia!: MateriasDto;
  loading: boolean = false;
  id = null;
  isContenidos = false;
  isInformes = 0;
  isMaterias: boolean = false;
  informes: boolean = false;
  cicloLectivo: string = "";
  idMateria: string = "";
  anioCurso: string = "";
  nombreCurso: string = "";

  dataSource!: MateriasDto[];
  columnsToDisplay = ["nombre", "anioCurso"];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, "expand"];
  expandedElement!: MateriasDto | null;

  constructor(
    private logger: NGXLogger,

    private titleService: Title,
    private profesorService: ProfesorService,
    private materiaService: MateriasService,

    private _routes: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    this.titleService.setTitle("Gestion de Informes - Mis Espacios");

    this.route.queryParamMap.subscribe((params) => {
      params.get("contenidos")
        ? (this.isContenidos = true)
        : (this.isContenidos = false);
      this.cicloLectivo = params.get("cicloLectivo")!;
      this.idMateria = params.get("idMateria")!;

      if (params.get("informes")) {
        this.isInformes = 1;
        this.informes = true;
      } else {
        this.isInformes = 0;
        this.informes = false;
      }
      params.get("materias")
        ? (this.isMaterias = true)
        : (this.isMaterias = false);
    });
  }

  generarInformes(materia: MateriasDto) {
    this.router.navigate(["/informes/listar/"], {
      queryParams: {
        curso: materia.curso.id,
        asignatura: materia.asignatura_id,
        informe: 0,
        nombreAsignatura: materia.nombre,
      },
    });
  }
  contenidos(materia: MateriasDto) {
    this.router.navigate(["/contenidos/contenidos/", materia.asignatura_id]);
  }
  actualizar(materia: MateriasDto) {
    this.router.navigate(["/informes/listar/"], {
      queryParams: {
        curso: materia.curso.id,
        asignatura: materia.asignatura_id,
        informe: 1,
        nombreAsignatura: materia.nombre,
      },
    });
  }
  actualizarMesa(materia: MateriasDto) {
    console.log(materia);
    this.router.navigate(["/dashboardProfesor/listarInformesMaterias"], {
      queryParams: {
        nombreMateria: materia.nombre,
        anioMateria: materia.anioCurso,
        idAsignatura: materia.asignatura_id,
        cicloLectivo: materia.cicloLectivo,
      },
    });
  }
  ngOnInit() {
    this.listarMaterias();
  }

  listarMaterias(): void {
    this.materiaService.detail(Number(this.idMateria)).subscribe({
      next: (data) => {
        console.log(data);
        this.materia = data;
        this.anioCurso=data.anioCurso;
        this.nombreCurso=data.nombre;
        this.cicloLectivo = data.cicloLectivo
      },
    });
  }

  mostrar() {
    alert("Most mirrors");
  }

  mostrarFila(asignaturas: MateriasDto) {
    if (this.isContenidos) {
      // this.router.navigate(["/contenidos/listar/", asignaturas.asignatura_id]);
      this.router.navigate([
        "/contenidos/contenidos/",
        asignaturas.asignatura_id,
      ]);
    } else {
      this.router.navigate(["/informes/listar/"], {
        queryParams: {
          curso: asignaturas.curso.id,
          asignatura: asignaturas.asignatura_id,
          informe: this.isInformes,
          nombreAsignatura: asignaturas.nombre,
        },
      });
    }

   
  }
}

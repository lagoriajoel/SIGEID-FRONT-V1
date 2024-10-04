import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, filter, Observable, switchMap } from 'rxjs';
import { Alumno } from 'src/app/core/Entities/alumno';
import { AlumnoService } from 'src/app/core/services/alumno.service';

@Component({
  selector: 'app-add-alumno-nuevo',
  templateUrl: './add-alumno-nuevo.component.html',
  styleUrls: ['./add-alumno-nuevo.component.css']
})
export class AddAlumnoNuevoComponent implements OnInit {
  loading: boolean = false;
  alumnos: Alumno[] = [];
  searchControl = new FormControl();
  results$!: Observable<Alumno[]>;
  size=5;
  page=0
  order="apellido"
  acs:boolean = true;
  isFirst: boolean = false
  isLast: boolean = false
  totalElement!:number 
  showSuggestions = false;
  mostrar:string = "";


  displayedColumns: string[] = [
    "dni",
    "apellido",
    "nombres",
    "email",
    "acciones",
  ];
  dataSource = new MatTableDataSource(this.alumnos);
  http: any;
  cursoId!: number;
  constructor(public dialogRef: MatDialogRef<AddAlumnoNuevoComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
    private _alumnosService: AlumnoService
  ) {
    this.cursoId=data.cursoId
    console.log(data.cursoId);
    this.dataSource = new MatTableDataSource();
   }

  ngOnInit(): void {

   
    //this.cargarAlumnos()

    this.results$ = this.searchControl.valueChanges.pipe(
      debounceTime(300), // Espera 300ms antes de emitir el valor
      distinctUntilChanged(), // Evita emitir el mismo valor consecutivamente
      filter(query => query.length >= 3), // Solo busca si el input tiene al menos 3 caracteres
      switchMap(query => this.search(query)) // Realiza la búsqueda con el query
    );


  }

  search(query: string): Observable<Alumno[]> {
    return this._alumnosService.listarApellidoNombre(query);
  }

     cargarAlumnos(): void {
      this._alumnosService.listaPageable(this.page,this.size,this.order,this.acs).subscribe(data => {
        console.log(data);
      
        this.dataSource.data = data.content;
        this.isFirst=data.first
        this.isLast=data.last
        this.totalElement = data.totalElements;
      })
     }


     onPageChange(event: any) {
      console.log(event);
      this.page = event.pageIndex;
      this.size = event.pageSize;
      this.cargarAlumnos(); // Vuelve a realizar la búsqueda con la nueva página
    }

    hideSuggestions(): void {
      // Espera un pequeño tiempo antes de ocultar para evitar problemas al seleccionar
      setTimeout(() => this.showSuggestions = false, 200);
    }
  
    selectSuggestion(alumno: Alumno): void {
      // Coloca el nombre completo en el input y oculta las sugerencias
      this.searchControl.setValue(`${alumno.apellido} ${alumno.nombres}`);
      this.showSuggestions = false;
     
     if(!this.alumnos.some(alum => alum.id === alumno.id)){
      this.alumnos.push(alumno);
      this.dataSource.data=this.alumnos
     }

     this.searchControl.setValue(''); 
    }
  
    agregarAlumnos(): void {
      this._alumnosService.asignarCurso(this.cursoId,this.alumnos).subscribe({
        next: data=>{
          this.dialogRef.close(false);
          
        },
        error: error=>{
          console.log(error.error.mensaje);
        }
      
      })
    
    }

  cancelar() {
    this.dialogRef.close(false);
  }
}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { contenido } from 'src/app/core/Entities/Contenido';
import { contenidoAdeudadoDto } from 'src/app/core/Entities/contenidoAdeudadoDto';
import { criterioDto } from 'src/app/core/Entities/criterioDTO';
import { estrategiaDto } from 'src/app/core/Entities/estrategiaDto';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { criterioService } from 'src/app/core/services/criterio.service';
import { estrategiaService } from 'src/app/core/services/estrategia.service';
import { InformesService } from 'src/app/core/services/informes.service';
import { MateriasService } from 'src/app/core/services/materias.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

interface instancia {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {
  estrategias: estrategiaDto[] = [];
  criterios: criterioDto[] = [];
  asignaturaId!: number;
  AlumnoId!: number;
  contenidos: contenidoAdeudadoDto[] = [];

  instancia: instancia[] = [
    {value: '-', viewValue: ''},
    {value: 'aprobado', viewValue: 'APROBADO'},
    {value: 'desaprobado', viewValue: 'DESAPROBADO'},
    {value: 'ausente', viewValue: 'AUSENTE'},
   
  ];
  form: any;
  
  espacioCurricular:string = ''
  NombreAlumno:string =''
  dniAlunmno:string =''
  nombreProfesor:string =''
  curso:string =''
  cicloLectivo:string =''
  isButtonVisible: boolean = false;
  informeId!: number;
  numInstanciasEvaluacion!:number;
  loading: boolean= true;
  
 

  constructor(
  
    private _asignaturasService: MateriasService,
    private _alumnoService: AlumnoService,
    private _route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _informesService: InformesService,
  ) { 
      this.numInstanciasEvaluacion = 0
    this._route.queryParamMap.subscribe((params) => {
      this.asignaturaId = Number(params.get('asignaturaId'));
      this.AlumnoId = Number(params.get('AlumnoId'));
      this.informeId= Number(params.get('informeId'));

      this.form=this.fb.group({
        resultado: ['', Validators.required],
       })
      
    })


   
  }
  toggleButton() {
    this.isButtonVisible = !this.isButtonVisible;
   

  }

  isElementVisible(Value: number): boolean {
    var num = this.numInstanciasEvaluacion
    return num == Value;
  }

  ngOnInit(): void {

    this.buscarAlumnoInforme(this.AlumnoId, this.asignaturaId);
    this.buscarAsignatura(this.asignaturaId)
    this.buscarAlumno(this.AlumnoId)
   


  }

  getInstaciasEvaluacion(informeId: number): void {
    this._informesService.instanciaEvaluacion(this.informeId).subscribe({
      next: data => {

      
        this.numInstanciasEvaluacion = data; 
        console.log(this.numInstanciasEvaluacion);
        return
      }
    })
  }

  buscarAlumno(alumnoId: number){
    this._alumnoService.detail(alumnoId).subscribe({
      next: data=>{
        this.NombreAlumno=data.apellido +" "+data.nombres
        this.dniAlunmno=data.dni
      }
    })  }
 
  buscarAsignatura(asignaturaId:number){
    this._asignaturasService.detail(asignaturaId).subscribe({
      next: data=> {
        this.espacioCurricular=data.nombre
        this.curso=data.curso.anio + " "+ data.curso.division
        this.cicloLectivo=data.cicloLectivo
        
      }
    })
  }


  buscarAlumnoInforme(alumnoId: number, asignaturaId: number){

    this._informesService.listaPorAlumnoMateria(alumnoId, asignaturaId).subscribe({
      next: data=>{console.log(data);
        this.nombreProfesor=data.profesorNombre;
        this.informeId=data.id
       this.getInstaciasEvaluacion(data.id)
        
        this.estrategias = data.estrategiasEvaluacion
        this.criterios = data.criteriosEvaluacion
        this.contenidos = data.contenidosAdeudados
        console.log(this.estrategias);
      },
      error: error=>{console.log(error);}
    })
  }


  resultadoInstanciaDiciembre(ob: MatSelectChange, id: number){
    if(ob.value =="aprobado"){
      this.contenidos.forEach(contenido=>{
        if(contenido.id==id){
          contenido.instanciaEvaluacion_diciembre="aprobado"
          
        
        }
      })
     console.log(this.contenidos);
    }
    if(ob.value =="desaprobado"){
      this.contenidos.forEach(contenido=>{
        if(contenido.id==id){
          contenido.instanciaEvaluacion_diciembre="desaprobado"
         
        }
      })
      console.log(this.contenidos);
   }
   if(ob.value =="ausente"){
    this.contenidos.forEach(contenido=>{
      if(contenido.id==id){
        contenido.instanciaEvaluacion_diciembre="ausente"
       
      }
    })
    console.log(this.contenidos);
  }
}

resultadoInstanciaFebrero(ob: MatSelectChange, id: number){
 
  if(ob.value =="aprobado"){
    this.contenidos.forEach(contenido=>{
      if(contenido.id==id){
        contenido.instanciaEvaluacion_febrero="aprobado"
        
      
      }
    })
   console.log(this.contenidos);
  }
  if(ob.value =="desaprobado"){
    this.contenidos.forEach(contenido=>{
      if(contenido.id==id){
        contenido.instanciaEvaluacion_febrero="desaprobado"
       
      }
    })
    console.log(this.contenidos);
 }
 if(ob.value =="ausente"){
  this.contenidos.forEach(contenido=>{
    if(contenido.id==id){
      contenido.instanciaEvaluacion_febrero="ausente"
     
    }
  })
  console.log(this.contenidos);
}
}

resultadoInstanciaExamen(ob: MatSelectChange, id: number){
  switch(this.numInstanciasEvaluacion){
    case 2:
                        if(ob.value =="aprobado"){
                          this.contenidos.forEach(contenido=>{
                            if(contenido.id==id){
                              contenido.instanciaEvaluacion_1="aprobado"
                                        
                            }
                          })
                        console.log(this.contenidos);
                        }
                        else if(ob.value =="desaprobado"){
                          this.contenidos.forEach(contenido=>{
                            if(contenido.id==id){
                              contenido.instanciaEvaluacion_1="desaprobado"
                            
                            }
                          })
                          console.log(this.contenidos);
                      }
                     else if(ob.value =="ausente"){
                        this.contenidos.forEach(contenido=>{
                          if(contenido.id==id){
                            contenido.instanciaEvaluacion_1="ausente"
                          
                          }
                        })
                        console.log(this.contenidos);
                      }
      break
      case 3:
                     
                    if(ob.value =="aprobado"){
                      this.contenidos.forEach(contenido=>{
                        if(contenido.id==id){
                          contenido.instanciaEvaluacion_2="aprobado"
                                    
                        }
                      })
                    console.log(this.contenidos);
                    }
                    else if(ob.value =="desaprobado"){
                      this.contenidos.forEach(contenido=>{
                        if(contenido.id==id){
                          contenido.instanciaEvaluacion_2="desaprobado"
                        
                        }
                      })
                      console.log(this.contenidos);
                  }
                else if(ob.value =="ausente"){
                    this.contenidos.forEach(contenido=>{
                      if(contenido.id==id){
                        contenido.instanciaEvaluacion_2="ausente"
                      
                      }
                    })
                    console.log(this.contenidos);
                  }

      break
      case 4:
                     
      if(ob.value =="aprobado"){
        this.contenidos.forEach(contenido=>{
          if(contenido.id==id){
            contenido.instanciaEvaluacion_3="aprobado"
                      
          }
        })
      console.log(this.contenidos);
      }
      else if(ob.value =="desaprobado"){
        this.contenidos.forEach(contenido=>{
          if(contenido.id==id){
            contenido.instanciaEvaluacion_3="desaprobado"
          
          }
        })
        console.log(this.contenidos);
    }
  else if(ob.value =="ausente"){
      this.contenidos.forEach(contenido=>{
        if(contenido.id==id){
          contenido.instanciaEvaluacion_3="ausente"
        
        }
      })
      console.log(this.contenidos);
    }

break
case 5:
                     
if(ob.value =="aprobado"){
  this.contenidos.forEach(contenido=>{
    if(contenido.id==id){
      contenido.instanciaEvaluacion_4="aprobado"
                
    }
  })
console.log(this.contenidos);
}
else if(ob.value =="desaprobado"){
  this.contenidos.forEach(contenido=>{
    if(contenido.id==id){
      contenido.instanciaEvaluacion_4="desaprobado"
    
    }
  })
  console.log(this.contenidos);
}
else if(ob.value =="ausente"){
this.contenidos.forEach(contenido=>{
  if(contenido.id==id){
    contenido.instanciaEvaluacion_4="ausente"
  
  }
})
console.log(this.contenidos);
}

break
  }


}



actualizarInforme(){
  this.loading = true;

  this.dialog
    .open(ConfirmDialogComponent, {
      width: "500px",
      disableClose: true,
      data: {
        title: "Actualizar Informe",
        message: "¿Esta seguro de Actualiza el Informe?",
      },
    })
    .afterClosed()
    .subscribe((res) => {
         
      this._informesService.actualizarDiciembreFebrero(this.contenidos, this.informeId).subscribe({
        next: data=>{
           
         this.toggleButton()
         window.location.reload();
          console.log(data);},
        
        error: (err)=>{
        
          console.log(err);},
        
       })
    });
}
mensajeExito() {
  this._snackBar.open("El Informa fue actualizado con Exito ", "", {
    duration: 2000,
  });
}
}

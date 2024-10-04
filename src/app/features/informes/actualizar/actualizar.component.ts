import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { infoMesaDto } from 'src/app/core/Entities/infoMesaDto';
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
  presidenteMesa_1!:string
  presidenteMesa_2!:string
  presidenteMesa_3!:string
  presidenteMesa_4!:string
  fechaExamen_1!:string
  fechaExamen_2!:string
  fechaExamen_3!:string
  fechaExamen_4!:string
  presidenteMesaDto!: string;
  fechaExamenDto!: string;

  
 

  constructor(
  
    private _asignaturasService: MateriasService,
    private _alumnoService: AlumnoService,
    private _route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _informesService: InformesService,
    private _notificationService: NotificationService
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
    console.log(this.presidenteMesaDto);
   

  }

  NombrePresidenteMesa(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.presidenteMesaDto = inputElement.value;
  console.log(this.presidenteMesaDto);
}
fechaMesaExamen(event:Event): void {
 const inputElement = event.target as HTMLInputElement;
 this.fechaExamenDto= inputElement.value;
 console.log(this.fechaExamenDto);
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
       this.presidenteMesa_1=data.presidenteMesaInstancia_1
       this.presidenteMesa_2=data.presidenteMesaInstancia_2
       this.presidenteMesa_3=data.presidenteMesaInstancia_3
       this.presidenteMesa_4=data.presidenteMesaInstancia_4
       this.fechaExamen_1=data.fechaInstancia_1
       this.fechaExamen_2=data.fechaInstancia_2
       this.fechaExamen_3=data.fechaInstancia_3
       this.fechaExamen_4=data.fechaInstancia_4

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
          contenido.aprobado=true
        
        }
      })
     console.log(this.contenidos);
    }
    if(ob.value =="desaprobado"){
      this.contenidos.forEach(contenido=>{
        if(contenido.id==id){
          contenido.instanciaEvaluacion_diciembre="desaprobado"
          contenido.aprobado=false
        }
      })
      console.log(this.contenidos);
   }
   if(ob.value =="ausente"){
    this.contenidos.forEach(contenido=>{
      if(contenido.id==id){
        contenido.instanciaEvaluacion_diciembre="ausente"
        contenido.aprobado=false
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
        contenido.aprobado=true
      
      }
    })
   console.log(this.contenidos);
  }
  if(ob.value =="desaprobado"){
    this.contenidos.forEach(contenido=>{
      if(contenido.id==id){
        contenido.instanciaEvaluacion_febrero="desaprobado"
       contenido.aprobado=false
      }
    })
    console.log(this.contenidos);
 }
 if(ob.value =="ausente"){
  this.contenidos.forEach(contenido=>{
    if(contenido.id==id){
      contenido.instanciaEvaluacion_febrero="ausente"
      contenido.aprobado=false
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
                              contenido.aprobado=true        
                            }
                          })
                        console.log(this.contenidos);
                        }
                        else if(ob.value =="desaprobado"){
                          this.contenidos.forEach(contenido=>{
                            if(contenido.id==id){
                              contenido.instanciaEvaluacion_1="desaprobado"
                              contenido.aprobado=false
                            }
                          })
                          console.log(this.contenidos);
                      }
                     else if(ob.value =="ausente"){
                        this.contenidos.forEach(contenido=>{
                          if(contenido.id==id){
                            contenido.instanciaEvaluacion_1="ausente"
                            contenido.aprobado=false
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
                          contenido.aprobado=true       
                        }
                      })
                    console.log(this.contenidos);
                    }
                    else if(ob.value =="desaprobado"){
                      this.contenidos.forEach(contenido=>{
                        if(contenido.id==id){
                          contenido.instanciaEvaluacion_2="desaprobado"
                          contenido.aprobado=false
                        }
                      })
                      console.log(this.contenidos);
                  }
                else if(ob.value =="ausente"){
                    this.contenidos.forEach(contenido=>{
                      if(contenido.id==id){
                        contenido.instanciaEvaluacion_2="ausente"
                        contenido.aprobado=false
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
            contenido.aprobado=true  
          }
        })
      console.log(this.contenidos);
      }
      else if(ob.value =="desaprobado"){
        this.contenidos.forEach(contenido=>{
          if(contenido.id==id){
            contenido.instanciaEvaluacion_3="desaprobado"
            contenido.aprobado=false
          }
        })
        console.log(this.contenidos);
    }
  else if(ob.value =="ausente"){
      this.contenidos.forEach(contenido=>{
        if(contenido.id==id){
          contenido.instanciaEvaluacion_3="ausente"
          contenido.aprobado=false
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
      contenido.aprobado=true
    }
  })
console.log(this.contenidos);
}
else if(ob.value =="desaprobado"){
  this.contenidos.forEach(contenido=>{
    if(contenido.id==id){
      contenido.instanciaEvaluacion_4="desaprobado"
      contenido.aprobado=false
    }
  })
  console.log(this.contenidos);
}
else if(ob.value =="ausente"){
this.contenidos.forEach(contenido=>{
  if(contenido.id==id){
    contenido.instanciaEvaluacion_4="ausente"
    contenido.aprobado=false
  }
})
console.log(this.contenidos);
}

break
  }


}
//metodo que genera el objeto actualizar mesaExamen dto

generarInfoMesaExamen(): infoMesaDto {
  
  
  const ac : infoMesaDto = {
    numInstancia: this.numInstanciasEvaluacion,
    presidenteMesa: this.presidenteMesaDto,
    fechaMesa: this.fechaExamenDto,
    contenidos: this.contenidos
   
  }

  return ac
}



actualizarInforme(){
   
  this.loading = true;

  this.dialog
    .open(ConfirmDialogComponent, {
      width: "500px",
      
      data: {
        title: "Actualizar Informe",
        message: "¿Esta seguro de Actualiza el Informe?",
      },
    }).afterClosed()
    .subscribe((res) => {
     if (res) {
      
              this._informesService.actualizarInstancia(this.generarInfoMesaExamen(), this.informeId).subscribe({
                next: (res) => {
                  console.log(res);
                  this.buscarAlumnoInforme(this.AlumnoId, this.asignaturaId);
                  this.toggleButton()
                  this.presidenteMesaDto=""
                  this.fechaExamenDto=""
                },
                error: (err) => {
                  console.log(err.error.mensaje);
                  this._notificationService.openSnackBar(err.error.mensaje);
                }
              })
         
    
     }
    });

      
}


mensajeExito() {
  this._snackBar.open("El Informa fue actualizado con Exito ", "", {
    duration: 2000,
  });
}
}

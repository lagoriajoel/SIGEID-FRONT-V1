import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { estadisticaDTO } from 'src/app/core/Entities/estadisticaDTO';
import { Informes } from 'src/app/core/Entities/informe';
import { InformesService } from 'src/app/core/services/informes.service';
import { __values } from 'tslib';

interface anio {
  value: string;
  viewValue: string;
}
interface materiaInforme {
  materia: string;
  numInforme: number;
}
interface cicloLectivo {
  value: string;
  
}
@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  anios: anio[] = [
    {value: '1', viewValue: 'Primer'},
    {value: '2', viewValue: 'Segundo'},
    {value: '3', viewValue: 'Tercer'},
    {value: '4', viewValue: 'Cuarto'},
    {value: '5', viewValue: 'Quinto'},
    {value: '6', viewValue: 'Sexto'},

  ];
  ciclos: cicloLectivo[] = [
    {value: '2020'},
    {value: '2021'},
    {value: '2022'},

    {value: '2023'},
    {value: '2024'},
    {value: '2025'},

  ]
  form!: FormGroup;
  labeldata1: any[] = [];
  realdata1: any[] = [];
  labeldata2: any[] = [];
  realdata2: any[] = [];
  labeldata3: any[] = [];
  realdata3: any[] = [];
  labeldata4: any[] = [];
  realdata4: any[] = [];
  labeldata5: any[] = [];
  realdata5: any[] = [];
  labeldata6: any[] = [];
  realdata6: any[] = [];
  colordata: any[] = [];
 cicloLectivo:string = '2020'
  numInformes:number[] =[];
  materiasInformes1:materiaInforme[] =[]
  materiasInformes2:materiaInforme[] =[]
  materiasInformes3:materiaInforme[] =[]

  estadisticas1:estadisticaDTO[]=[]
  estadisticas2:estadisticaDTO[]=[]
  estadisticas3:estadisticaDTO[]=[]
  estadisticas4:estadisticaDTO[]=[]
  estadisticas5:estadisticaDTO[]=[]
  estadisticas6:estadisticaDTO[]=[]

  anio: string = '1'
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;
  canvas2: any;
  ctx2: any;
  @ViewChild('mychart2') mychart2: any;
  canvas3: any;
  ctx3: any;
  @ViewChild('mychart3') mychart3: any;
  canvas4: any;
  ctx4: any;
  @ViewChild('mychart4') mychart4: any;
  canvas5: any;
  ctx5: any;
  @ViewChild('mychart5') mychart5: any;
  canvas6: any;
  ctx6: any;
  @ViewChild('mychart6') mychart6: any;

  constructor(private informeService: InformesService) { 
  
   
  }
  private createForm() {
   

    this.form = new FormGroup({
       cicloLectivo: new FormControl('', [Validators.required]),
     
      
      
      });
}

  buscar(){
    
    setTimeout(() => {
    
    this.cargarDatos(this.form.get('cicloLectivo')?.value)

   
   
   
   
   
    }, 10);
  }

   cargarDatos(cicloLectivo:string) { 
   
    this.informeService.estadisticasPorAnio("1",cicloLectivo).subscribe({
      next: data => {
        this.labeldata1=[]
        this.realdata1=[]
        this.estadisticas1=[]
        console.log(data);
        this.estadisticas1 = data
        this.estadisticas1.forEach(dato=> {
            this.labeldata1.push(dato.nombre)
            this.realdata1.push(dato.dato)
        })
        this.RenderChart1(this.labeldata1, this.realdata1)
      }
    })
    this.informeService.estadisticasPorAnio("2",cicloLectivo).subscribe({
      next: data => {
        this.labeldata2=[]
        this.realdata2=[]
        this.estadisticas2=[]
        console.log(data);
        this.estadisticas2 = data
        this.estadisticas2.forEach(dato=> {
            this.labeldata2.push(dato.nombre)
            this.realdata2.push(dato.dato)
        })
        this.RenderChart2(this.labeldata2, this.realdata2)
      }
    })
    this.informeService.estadisticasPorAnio("3",cicloLectivo).subscribe({
      next: data => {
        this.labeldata3=[]
        this.realdata3=[]
        this.estadisticas3=[]
        console.log(data);
        this.estadisticas3 = data
        this.estadisticas3.forEach(dato=> {
            this.labeldata3.push(dato.nombre)
            this.realdata3.push(dato.dato)
        })
        this.RenderChart3(this.labeldata3, this.realdata3)
      }
    })
    this.informeService.estadisticasPorAnio("4",cicloLectivo).subscribe({
      next: data => {
        console.log(data);
        this.labeldata4=[]
        this.realdata4=[]
        this.estadisticas4=[]
        this.estadisticas4 = data
        this.estadisticas4.forEach(dato=> {
            this.labeldata4.push(dato.nombre)
            this.realdata4.push(dato.dato)
        })
        this.RenderChart4(this.labeldata4, this.realdata4)
      }
    })
    this.informeService.estadisticasPorAnio("5",cicloLectivo).subscribe({
      next: data => {
        console.log(data);
        this.labeldata5=[]
        this.realdata5=[]
        this.estadisticas5=[]
        this.estadisticas5 = data
        this.estadisticas5.forEach(dato=> {
            this.labeldata5.push(dato.nombre)
            this.realdata5.push(dato.dato)
        })
        this.RenderChart5(this.labeldata5, this.realdata5)
       
      }
    })
    this.informeService.estadisticasPorAnio("6",cicloLectivo).subscribe({
      next: data => {
        console.log(data);
        this.labeldata6=[]
        this.realdata6=[]
        this.estadisticas6=[]
        this.estadisticas6 = data
        this.estadisticas6.forEach(dato=> {
            this.labeldata6.push(dato.nombre)
            this.realdata6.push(dato.dato)
        })
       
        this.RenderChart6(this.labeldata6, this.realdata6)
      }
    })
   }
    
  

  ngOnInit(): void {
    this.createForm();

    
    
    
  }
  ngAfterViewInit() {
    
   
    this.RenderChart1(this.labeldata1, this.realdata1)
    this.RenderChart2(this.labeldata2, this.realdata2)
    this.RenderChart3(this.labeldata3, this.realdata3)
    this.RenderChart4(this.labeldata4, this.realdata4)
    this.RenderChart5(this.labeldata5, this.realdata5)
    this.RenderChart6(this.labeldata6, this.realdata6)
  
 
  

   
}






RenderChart1(labeldata: any[], data: any[]): void { 

  this.canvas = this.mychart.nativeElement;
  this.ctx = this.canvas.getContext('2d');

  new Chart(this.ctx, {
      type: 'bar',
      options: {
        title: {
          display: true,
          text: ' 1° Año'
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          
        }
      },
      data: {
          datasets: [{
              label: 'Informes de Desempeño',
              data: data,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)',
              fill: true,
              borderWidth: 1
          }],
          labels: labeldata
      },
  });
}

RenderChart2(labeldata: any[], data: any[]): void { 
  this.canvas2 = this.mychart2.nativeElement;
  this.ctx2 = this.canvas2.getContext('2d');

  new Chart(this.ctx2, {
      type: 'bar',
      options: {
        title: {
          display: true,
          text: ' 2° Año'
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          
        }
      },
      data: {
        datasets: [{
            label: 'Informes de Desempeño',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            fill: true,
            borderWidth: 1
        }],
        labels: labeldata
    },
});
}

RenderChart3(labeldata: any[], data: any[]): void { 
  this.canvas3 = this.mychart3.nativeElement;
  this.ctx3 = this.canvas3.getContext('2d');

  new Chart(this.ctx3, {
      type: 'bar',
      options: {
        title: {
          display: true,
          text: ' 3° Año'
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          
        }
      },
      data: {
        datasets: [{
            label: 'Informes de Desempeño',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            fill: true,
            borderWidth: 1
        }],
        labels: labeldata
    },
});
}


RenderChart4(labeldata: any[], data: any[]): void { 
  this.canvas4 = this.mychart4.nativeElement;
  this.ctx4 = this.canvas4.getContext('2d');

  new Chart(this.ctx4, {
      type: 'bar',
      options: {
        title: {
          display: true,
          text: ' 4° Año'
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          
        }
      },
      data: {
        datasets: [{
            label: 'Informes de Desempeño',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            fill: true,
            borderWidth: 1
        }],
        labels: labeldata
    },
});
}

RenderChart5(labeldata: any[], data: any[]): void { 
  this.canvas5 = this.mychart5.nativeElement;
  this.ctx5 = this.canvas5.getContext('2d');

  new Chart(this.ctx5, {
      type: 'bar',
      options: {
        title: {
          display: true,
          text: ' 5° Año'
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          
        }
      },
      data: {
        datasets: [{
            label: 'Informes de Desempeño',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            fill: true,
            borderWidth: 1
        }],
        labels: labeldata
    },
});
}

RenderChart6(labeldata: any[], data: any[]): void { 
  this.canvas6 = this.mychart6.nativeElement;
  this.ctx6 = this.canvas6.getContext('2d');

  new Chart(this.ctx6, {
      type: 'bar',
      options: {
        title: {
          display: true,
          text: ' 6° Año'
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          
        }
      },
      data: {
        datasets: [{
            label: 'Informes de Desempeño',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            fill: true,
            borderWidth: 1
        }],
        labels: labeldata
    },
});
}

}

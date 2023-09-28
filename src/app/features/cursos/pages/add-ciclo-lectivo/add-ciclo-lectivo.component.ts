import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-add-ciclo-lectivo',
  templateUrl: './add-ciclo-lectivo.component.html',
  styleUrls: ['./add-ciclo-lectivo.component.css']
})
export class AddCicloLectivoComponent implements OnInit {

 
 
  form: FormGroup;
 
 
  cicloLectivo!: string;
 
  loading: boolean = false;
  operacion: string = 'Agregar ';
  id: number | undefined;

  constructor(public dialogRef: MatDialogRef<AddCicloLectivoComponent>,
    private fb: FormBuilder,
    
    @Inject(MAT_DIALOG_DATA) public data: any) {
   
    this.form = this.fb.group({
      cicloLectivo: ['', Validators.required],
      
      
      
    })
   
  }



  ngOnInit(): void {
  
   
  }

  
  // se obtiene el curso para poder editarlo


  cancelar() {
    this.dialogRef.close(false);
  }

   
  enviarCiclo() {
 

    if (this.form.invalid) {
      return console.log("error");;
    }
    
    localStorage.setItem("ciclo", this.form.value.cicloLectivo); 
    this.dialogRef.close(true)
  }


}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlumnoNuevoComponent } from './add-alumno-nuevo.component';

describe('AddAlumnoNuevoComponent', () => {
  let component: AddAlumnoNuevoComponent;
  let fixture: ComponentFixture<AddAlumnoNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAlumnoNuevoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAlumnoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

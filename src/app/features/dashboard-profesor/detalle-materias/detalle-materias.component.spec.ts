import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMateriasComponent } from './detalle-materias.component';

describe('DetalleMateriasComponent', () => {
  let component: DetalleMateriasComponent;
  let fixture: ComponentFixture<DetalleMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleMateriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

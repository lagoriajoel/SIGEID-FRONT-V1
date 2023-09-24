import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialContenidosComponent } from './historial-contenidos.component';

describe('HistorialContenidosComponent', () => {
  let component: HistorialContenidosComponent;
  let fixture: ComponentFixture<HistorialContenidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialContenidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialContenidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

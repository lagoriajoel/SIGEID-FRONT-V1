import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCicloLectivoComponent } from './add-ciclo-lectivo.component';

describe('AddCicloLectivoComponent', () => {
  let component: AddCicloLectivoComponent;
  let fixture: ComponentFixture<AddCicloLectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCicloLectivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCicloLectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CicloLectivoComponent } from './ciclo-lectivo.component';

describe('CicloLectivoComponent', () => {
  let component: CicloLectivoComponent;
  let fixture: ComponentFixture<CicloLectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CicloLectivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CicloLectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

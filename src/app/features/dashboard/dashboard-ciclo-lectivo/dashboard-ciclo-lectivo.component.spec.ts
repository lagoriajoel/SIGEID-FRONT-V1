import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCicloLectivoComponent } from './dashboard-ciclo-lectivo.component';

describe('DashboardCicloLectivoComponent', () => {
  let component: DashboardCicloLectivoComponent;
  let fixture: ComponentFixture<DashboardCicloLectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCicloLectivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCicloLectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

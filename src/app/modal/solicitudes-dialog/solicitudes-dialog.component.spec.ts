import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesDialogComponent } from './solicitudes-dialog.component';

describe('SolicitudesDialogComponent', () => {
  let component: SolicitudesDialogComponent;
  let fixture: ComponentFixture<SolicitudesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

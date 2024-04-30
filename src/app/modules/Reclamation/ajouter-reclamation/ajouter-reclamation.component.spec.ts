import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterReclamationComponent } from './ajouter-reclamation.component';

describe('AjouterReclamationComponent', () => {
  let component: AjouterReclamationComponent;
  let fixture: ComponentFixture<AjouterReclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterReclamationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatRecComponent } from './stat-rec.component';

describe('StatRecComponent', () => {
  let component: StatRecComponent;
  let fixture: ComponentFixture<StatRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatRecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

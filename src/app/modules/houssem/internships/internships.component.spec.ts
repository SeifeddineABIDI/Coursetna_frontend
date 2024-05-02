import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipsComponent } from './internships.component';

describe('InternshipsComponent', () => {
  let component: InternshipsComponent;
  let fixture: ComponentFixture<InternshipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternshipsComponent]
    });
    fixture = TestBed.createComponent(InternshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

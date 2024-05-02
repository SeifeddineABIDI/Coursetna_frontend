import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormApplyComponent } from './form-apply.component';

describe('FormApplyComponent', () => {
  let component: FormApplyComponent;
  let fixture: ComponentFixture<FormApplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormApplyComponent]
    });
    fixture = TestBed.createComponent(FormApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

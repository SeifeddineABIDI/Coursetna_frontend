import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubforumSideBarComponent } from './subforum-side-bar.component';

describe('SubforumSideBarComponent', () => {
  let component: SubforumSideBarComponent;
  let fixture: ComponentFixture<SubforumSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubforumSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubforumSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

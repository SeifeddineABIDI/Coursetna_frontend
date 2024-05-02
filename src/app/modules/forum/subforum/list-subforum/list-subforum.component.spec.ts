import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubforumComponent } from './list-subforum.component';

describe('ListSubforumComponent', () => {
  let component: ListSubforumComponent;
  let fixture: ComponentFixture<ListSubforumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSubforumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSubforumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

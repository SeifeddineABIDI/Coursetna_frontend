import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifCommentComponent } from './notif-comment.component';

describe('NotifCommentComponent', () => {
  let component: NotifCommentComponent;
  let fixture: ComponentFixture<NotifCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentListButtonComponent } from './comment-list-button.component';

describe('CommentListButtonComponent', () => {
  let component: CommentListButtonComponent;
  let fixture: ComponentFixture<CommentListButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentListButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentListButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

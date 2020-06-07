import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRatingEditComponent } from './admin-rating-edit.component';

describe('AdminRatingEditComponent', () => {
  let component: AdminRatingEditComponent;
  let fixture: ComponentFixture<AdminRatingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRatingEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRatingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

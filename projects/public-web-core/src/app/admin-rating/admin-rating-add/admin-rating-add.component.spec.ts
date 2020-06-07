import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRatingAddComponent } from './admin-rating-add.component';

describe('AdminRatingAddComponent', () => {
  let component: AdminRatingAddComponent;
  let fixture: ComponentFixture<AdminRatingAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRatingAddComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRatingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookEditComponent } from './admin-book-edit.component';

describe('AdminBookEditComponent', () => {
  let component: AdminBookEditComponent;
  let fixture: ComponentFixture<AdminBookEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBookEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

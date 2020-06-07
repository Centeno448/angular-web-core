import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookAddComponent } from './admin-book-add.component';

describe('AdminBookAddComponent', () => {
  let component: AdminBookAddComponent;
  let fixture: ComponentFixture<AdminBookAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBookAddComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

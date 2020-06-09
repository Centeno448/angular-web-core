import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingRecievedComponent } from './rating-recieved.component';

describe('RatingRecievedComponent', () => {
  let component: RatingRecievedComponent;
  let fixture: ComponentFixture<RatingRecievedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingRecievedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingRecievedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { RatingComponent } from './rating/rating.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';
import { RatingRoutingModule } from './rating-routing.module';
import { RatingAddComponent } from './rating-add/rating-add.component';
import { RatingEditComponent } from './rating-edit/rating-edit.component';
import { RatingRecievedComponent } from './rating-recieved/rating-recieved.component';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    RatingRoutingModule
  ],
  declarations: [
    RatingComponent,
    RatingAddComponent,
    RatingEditComponent,
    RatingRecievedComponent
  ]
})
export class RatingModule {}

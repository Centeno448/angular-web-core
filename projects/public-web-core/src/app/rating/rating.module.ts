import { RatingComponent } from './rating/rating.component';
import { RatingRoutingModule } from './rating-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { RatingAddComponent } from './rating-add/rating-add.component';
import { RatingEditComponent } from './rating-edit/rating-edit.component';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    RatingRoutingModule
  ],
  declarations: [RatingComponent, RatingAddComponent, RatingEditComponent]
})
export class RatingModule {}

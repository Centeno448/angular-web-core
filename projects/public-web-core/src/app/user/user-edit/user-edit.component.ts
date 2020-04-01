import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  editedId: number;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.editedId = +this.activatedRoute.snapshot.paramMap.get('id');
  }
}

import { Book } from './../book.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  isLoading: boolean;
  dataSource: Book[];
  errorMessage: string = '';
  displayedColumns = ['id', 'name', 'author', 'publicationDate', 'actions'];

  constructor() {}

  ngOnInit(): void {}
}

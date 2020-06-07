export class Book {
  constructor(
    public id: number,
    public name: string,
    public category: string,
    public owner: string,
    public author: string,
    public publicationDate: Date
  ) {}
}

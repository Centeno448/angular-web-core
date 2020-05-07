export class Rating {
  constructor(
    public id: number,
    public score: number,
    public comment: string,
    public toUser: string,
    public fromUser: string
  ) {}
}

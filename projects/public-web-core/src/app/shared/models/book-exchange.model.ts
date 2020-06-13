export class BookExchange {
  constructor(
    public id: number,
    public toUser: string,
    public fromUser: string,
    public toBook: string,
    public fromBook: string,
    public exchangeDate: Date,
    public failed: boolean
  ) {}
}

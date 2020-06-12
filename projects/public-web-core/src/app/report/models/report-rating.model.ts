export class ReportRatingModel {
  constructor(
    public index: number,
    public user: string,
    public acumulatedScore: number,
    public averageScore: number,
    public amountOfRatings: number
  ) {}
}

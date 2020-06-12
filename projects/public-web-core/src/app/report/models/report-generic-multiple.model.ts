export class GenericMultipleReportModel {
  constructor(
    public name: string,
    public series: [
      {
        name: string;
        value: number;
      }
    ]
  ) {}
}

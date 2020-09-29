export class AppProject {
  constructor(
    public id: string,
    public title: string,
    public status: {progress: string, language: string, classification: string, hostType: string},
    public desc: string,
    public gitLink: string,
    public directLink?: string,
    public logoUrl?: string,
    public additionInfo?: any,
    public position?: string,
  ) {}
}

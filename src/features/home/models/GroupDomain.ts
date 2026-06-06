export class GroupDomain{

  constructor(title: string, description:string, creatorId:string){
    this.id = "";
    this.title = title;
    this.description = description;
    this.totalBalance = 0;
    this.creatorId = creatorId;
  }

  public getId(){
    return this.id;
  }
  public getTitle(){
    return this.title;
  }
  public getDescription(){
    return this.description;
  }

  public getTotalBalance(){
    return this.totalBalance;
  }

  public getCreatorId(){
    return this.creatorId;
  }

  private id: string;
  private title: string;
  private description: string;
  private totalBalance: number;
  private creatorId: string;
}
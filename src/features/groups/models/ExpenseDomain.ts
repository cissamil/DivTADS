export class ExpenseDomain {

  constructor(
    groupId: string,
    memberId: string,
    totalAmount: number,
    description: string,
    category: string,
    receiptUrl: string
  ) {

    this.groupId = groupId
    this.memberId = memberId
    this.totalAmount= totalAmount
    this.description = description
    this.category = category
    this.receiptUrl = receiptUrl;
  }


  public getGroupId() { return this.groupId;}
  public getMemberId() { return this.memberId;}
  public getTotalAmount() { return this.totalAmount;}
  public getDescription() { return this.description;}
  public getCategory() { return this.category;}
  public getReceiptUrl() {return this.receiptUrl;}


  private groupId: string;
  private memberId: string;
  private totalAmount: number;
  private description: string;
  private category: string;
  private receiptUrl:string;
}

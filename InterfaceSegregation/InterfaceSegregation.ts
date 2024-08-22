interface IPayment{
  paymentStatus:string;
  getPayments():Array<string>[];
}

interface IBank extends IPayment{
  initiatePayment():void;
}

interface ILoan extends IPayment{
  intiateLoanSettlement():void;
  initiateRePayment():void;
}

class BankPayment implements IBank {
  initiatePayment(): void {
    throw new Error("Method not implemented.");
  }
  paymentStatus: string;
  getPayments(): Array<string>[] {
    throw new Error("Method not implemented.");
  }
  
}

class LoanPayment implements ILoan{
  intiateLoanSettlement(): void {
    throw new Error("Method not implemented.");
  }
  initiateRePayment(): void {
    throw new Error("Method not implemented.");
  }
  paymentStatus: string;
  getPayments(): Array<string>[] {
    throw new Error("Method not implemented.");
  }
}
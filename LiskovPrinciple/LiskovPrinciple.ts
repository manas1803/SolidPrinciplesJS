interface IDepositAmount {
  depositAmount(amount: number): void;
}

interface IWithdrawAmount {
  withdrawAmount(amount: number): void;
}
abstract class BankAccount implements IDepositAmount {
  private _customerName: string;
  private _customerId: string;
  private _amount: number = 10000;

  constructor(customerName: string, customerId: string) {
    this._customerName = customerName;
    this._customerId = customerId;
  }
  abstract depositAmount(amount: number): void;

  public get getAmount(): number {
    return this._amount;
  }

  public set setAmount(amount: number) {
    this._amount = amount;
  }
}

abstract class WithdrawableAccount
  extends BankAccount
  implements IWithdrawAmount
{
  constructor(customerName: string, customerId: string) {
    super(customerName, customerId);
  }
  abstract withdrawAmount(amount: number): void;
}

class SavingsAccount extends WithdrawableAccount {
  constructor(customerName: string, customerId: string) {
    super(customerName, customerId);
  }

  withdrawAmount(newAmount: number): void {
    this.setAmount = this.getAmount - this.getAmount * 0.005 - newAmount;
  }

  depositAmount(newAmount: number): void {
    this.setAmount = this.getAmount + this.getAmount * 0.005 + newAmount;
  }
}

class CurrentAccount extends WithdrawableAccount {
  constructor(customerName: string, customerId: string) {
    super(customerName, customerId);
  }

  withdrawAmount(newAmount: number): void {
    this.setAmount = this.getAmount - this.getAmount * 0.005 - newAmount;
  }

  depositAmount(newAmount: number): void {
    this.setAmount = this.getAmount + this.getAmount * 0.005 + newAmount;
  }
}

class FixedDepositAccount extends BankAccount {
  depositAmount(amount: number): void {
    this.setAmount = this.getAmount + amount;
  }
}
const fixedAccount = new FixedDepositAccount("Manas", "123");
fixedAccount.depositAmount(1234567);

class BankWithdrawService {
  private _withdrawableAccount: WithdrawableAccount;

  constructor(withdrawableAccount: WithdrawableAccount) {
    this._withdrawableAccount = withdrawableAccount;
  }

  withdrawAmount(amount: number) {
    this._withdrawableAccount.withdrawAmount(amount);
  }
}

const withdrawableAccount = new SavingsAccount("Manas","123")

const bankWithdrawlService = new BankWithdrawService(withdrawableAccount);
bankWithdrawlService.withdrawAmount(123);

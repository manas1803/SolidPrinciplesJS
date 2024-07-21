/**
 * Now as you can see that here in a single user interface we are adding multiple values
 * The issue with this approach is that if we extend this interface
 * We need to use all the values even if we don't want to.
 * So there should be a segregation of interfaces
 */
interface IUser {
  name: string;
  email: string;
  dob: Date;
  paymentType: string;
  salary: number;
  bankInfo: string;
}

// Refactoring
interface IUserPersonalInfo {
  name: string;
  email: string;
  dob: Date;
}

interface IUserBankInfo {
  paymentType: string;
  salary: number;
  bankInfo: string;
}

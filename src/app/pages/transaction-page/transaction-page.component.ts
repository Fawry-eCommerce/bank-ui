import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-transaction-page',
  standalone: true,
  imports: [],
  templateUrl: './transaction-page.component.html',
  styleUrl: './transaction-page.component.css'
})
export class TransactionPageComponent {
  transactionform!: FormGroup;

  currentBalance: number = 0;  // Initial balance, can be updated based on backend data
  currentDeposit: number = 0;
  currentWithdraw: number = 0;
  accountId: number = 1; // This should be dynamically set based on logged-in user

  constructor(private fb: FormBuilder, private bankService: BankService) {}

  ngOnInit(): void {
    this.transactionform = this.fb.group({
      depositAmount: [''],
      withdrawAmount: ['']
    });
  }

  onDeposit(): void {
    const depositAmount = parseFloat(this.transactionform.get('depositAmount')?.value);
    if (!isNaN(depositAmount) && depositAmount > 0) {
      this.bankService.deposit(this.accountId, depositAmount).subscribe(response => {
        this.currentDeposit += depositAmount;
        this.currentBalance = response.newBalance; // Update based on backend response
        this.transactionform.get('depositAmount')?.reset();
      });
    }
  }

  onWithdraw(): void {
    const withdrawAmount = parseFloat(this.transactionform.get('withdrawAmount')?.value);
    if (!isNaN(withdrawAmount) && withdrawAmount > 0 && withdrawAmount <= this.currentBalance) {
      this.bankService.withdraw(this.accountId, withdrawAmount).subscribe(response => {
        this.currentWithdraw += withdrawAmount;
        this.currentBalance = response.newBalance; // Update based on backend response
        this.transactionform.get('withdrawAmount')?.reset();
      });
    }
  }




}

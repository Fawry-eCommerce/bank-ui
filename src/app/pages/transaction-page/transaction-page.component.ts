import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BankService } from '../../services/bank.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-transaction-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './transaction-page.component.html',
  styleUrl: './transaction-page.component.css'
})
export class TransactionPageComponent {
  transactionform!: FormGroup;

  currentBalance: number = 0;  
  currentDeposit: number = 0;
  currentWithdraw: number = 0;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private bankService: BankService) {}

  ngOnInit(): void {
    this.transactionform = this.fb.group({
      depositAmount: [''],
      withdrawAmount: ['']
    });
    this.getBalance();
  }

  onDeposit(): void {
    const depositAmount = parseFloat(this.transactionform.get('depositAmount')?.value);
    if (!isNaN(depositAmount) && depositAmount > 0) {
      this.bankService.deposit(this.getAccoundId(), depositAmount).subscribe(response => {
        this.currentDeposit += depositAmount;
        this.currentBalance = response.newBalance; // Update based on backend response
        this.transactionform.get('depositAmount')?.reset();
      });
    }
  }

  onWithdraw(): void {
    const withdrawAmount = parseFloat(this.transactionform.get('withdrawAmount')?.value);
    // if (!isNaN(withdrawAmount) && withdrawAmount > 0 && withdrawAmount <= this.currentBalance) {
    //   this.bankService.withdraw(Number(localStorage.getItem('accountId')), withdrawAmount).subscribe(response => {
    //     this.currentWithdraw += withdrawAmount;
    //     this.currentBalance = response.newBalance;  // Use newBalance from the backend response
    //     this.transactionform.get('withdrawAmount')?.reset();
    // },
    // error => {
    //   this.errorMessage = error.error.message;
    //   console.log(this.errorMessage);
      
    // });
    // }
    this.bankService.withdraw(this.getAccoundId(), withdrawAmount).subscribe({
      next: (response) => {
        this.currentWithdraw += withdrawAmount;
        this.currentBalance = response.newBalance;
        this.transactionform.get('withdrawAmount')?.reset();
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        alert(this.errorMessage);
      }
    });
  }

  getBalance(): void {
    this.bankService.getBalance(this.getAccoundId()).subscribe(response => {
      this.currentBalance = response;
    });
  }

  getAccoundId(): number {
    console.log(Number(localStorage.getItem('accountId')));
    return Number(localStorage.getItem('accountId'));
  }
  



}

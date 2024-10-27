import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BankService } from '../../services/bank.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  loginform!: FormGroup;
  constructor(private bankService: BankService, private router:Router) {}

  ngOnInit(): void {
    this.loginform = new FormGroup({
    cardNum: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
    });
  }

  Login(): void {
    if (this.loginform.valid) {
      let data = {
        cardNum: this.loginform.get('cardNum')?.value,
        password: this.loginform.get('password')?.value,
      }
  
      this.bankService.login(data).subscribe({
        next: (response) => {
          if (response.accountId) {
            this.router.navigate(['/transactions']);
          }
          console.log(response); // TODO: Handle login. ex: goto transactions page
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }


}

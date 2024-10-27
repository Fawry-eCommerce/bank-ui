import { Component, OnInit } from '@angular/core';
import { BankService } from '../../services/bank.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {

  form!: FormGroup;

  constructor(private bankService: BankService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  register(): void {
    if (this.form.valid) {
      let data = {
        name: this.form.get('name')?.value,
        password: this.form.get('password')?.value,
      }
      this.bankService.register(data).subscribe({
        next: (response) => {
          if (response.accountId) {
            this.router.navigate(['/auth/login']);
          }
          console.log(response); // TODO: Handle registration. ex: goto login
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form!: FormGroup;
  hasAccount = true;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.pattern(/\S/)],
      ],
      password: ['', [Validators.required, Validators.pattern(/\S/)]],
    });
  }

  changeForm() {
    this.hasAccount = !this.hasAccount;
    this.form.reset();
  }

  onSubmit(hasAccount: boolean) {
    if (!this.form.valid) {
      return;
    }
    const { email, password } = this.form.value;

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...',
    });
    Swal.showLoading();

    if (hasAccount) {
      this.auth
        .loginEmailPassword(email, password)
        .then((userCredential) => {
          Swal.close();
          this.auth.saveLocalStorage(userCredential);
          this.router.navigate(['/chat']);
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
          });
        });
    } else {
      this.auth
        .createEmailPassword(email, password)
        .then((userCredential) => {
          Swal.close();
          this.auth.saveLocalStorage(userCredential);
          this.router.navigate(['/chat']);
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
          });
        });
    }
  }

  login(proveedor: string) {
    this.auth.login(proveedor);
  }
}

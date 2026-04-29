import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

type SubmitStatus = 'idle' | 'success' | 'error';

@Component({
  selector: 'app-public-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class PublicForgetPasswordComponent {
  form: FormGroup;
  isSubmitting = false;
  mailSent = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  handleSubmit() {
    if (this.form.invalid) return;
    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.sendMail(this.form.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.mailSent = true;
      },
      error: (err: any) => {
        this.isSubmitting = false;
        this.errorMessage = err?.error?.message ?? 'Une erreur est survenue. Veuillez réessayer.';
        this.toastr.error(this.errorMessage, 'Mot de passe oublié');
      }
    });
  }
}

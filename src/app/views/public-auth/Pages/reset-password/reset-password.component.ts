import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-public-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class PublicResetPasswordComponent implements OnInit {
  form: FormGroup;
  isSubmitting = false;
  token = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
    if (!this.token) {
      this.router.navigate(['/public/auth/login']);
    }
  }

  handleSubmit() {
    if (this.form.invalid) return;

    const { password, password_confirmation } = this.form.value;
    if (password !== password_confirmation) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.recoverPassword(this.token, this.form.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.toastr.success('Mot de passe modifié avec succès', 'Réinitialisation');
        this.router.navigate(['/public/auth/login']);
      },
      error: (err: any) => {
        this.isSubmitting = false;
        this.errorMessage = err?.error?.message ?? 'Une erreur est survenue. Veuillez réessayer.';
        this.toastr.error(this.errorMessage, 'Réinitialisation');
      }
    });
  }
}

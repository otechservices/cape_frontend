import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PromoterInvitationService } from 'src/app/core/services/promoter-invitation.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';

/**
 * Création d'un compte promoteur depuis le lien envoyé quand la DFEA déclare
 * agréé un centre dont le promoteur n'a pas encore de compte. Le compte est
 * ouvert sous l'adresse qui a reçu le lien, et le centre lui est rattaché.
 */
@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.css'
})
export class PromoterInvitationComponent implements OnInit {
  token = '';
  invitation: any = null;
  loading = true;
  erreur: string | null = null;
  isSubmitting = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private invitationService: PromoterInvitationService
  ) {
    this.form = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
    this.invitationService.get(this.token).subscribe({
      next: (res: any) => {
        this.invitation = res.data;
        this.form.patchValue({
          lastname: res.data?.lastname ?? '',
          firstname: res.data?.firstname ?? '',
          phone: res.data?.phone ?? ''
        });
        this.loading = false;
      },
      error: (err: any) => {
        this.erreur = err?.error?.message ?? 'Ce lien de création de compte est invalide.';
        this.loading = false;
      }
    });
  }

  passwordMatchValidator(group: AbstractControl) {
    return group.get('password')?.value === group.get('password_confirmation')?.value ? null : { mismatch: true };
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastrService.warning('Complétez tous les champs. Le mot de passe (8 caractères minimum) doit être saisi deux fois à l\'identique.');
      return;
    }

    this.isSubmitting = true;
    this.invitationService.accept(this.token, this.form.value).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        AppSweetAlert.simpleAlert('success', 'Compte créé', res.message);
        this.router.navigate(['/public/auth/login']);
      },
      error: (err: any) => {
        this.isSubmitting = false;
        AppSweetAlert.simpleAlert('error', 'Création du compte', err?.error?.message ?? 'La création du compte a échoué');
      }
    });
  }
}

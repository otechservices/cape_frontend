import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-mon-profil-promoter',
  templateUrl: './mon-profil-promoter.component.html',
  styleUrl: './mon-profil-promoter.component.css'
})
export class MonProfilPromoterComponent implements OnInit {

  activeTab: 'informations' | 'securite' = 'informations';
  isEditing = false;
  saving = false;
  user: any = null;

  profilForm!: FormGroup;
  passwordForm!: FormGroup;

  showOld = false;
  showNew = false;
  showConfirm = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private lsService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.user = this.lsService.get(GlobalName.userName);
    this.buildForms();
  }

  get userInitial(): string {
    return this.user?.name?.charAt(0)?.toUpperCase() ?? '?';
  }

  private buildForms(): void {
    this.profilForm = this.fb.group({
      firstname: [this.user?.firstname ?? '', Validators.required],
      lastname:  [this.user?.lastname  ?? '', Validators.required],
      email:     [this.user?.email     ?? '', [Validators.required, Validators.email]],
      phone:     [this.user?.phone     ?? ''],
    });

    this.passwordForm = this.fb.group({
      old_password:     ['', Validators.required],
      new_password:     ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', Validators.required],
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.profilForm.patchValue({
      firstname: this.user?.firstname ?? '',
      lastname:  this.user?.lastname  ?? '',
      email:     this.user?.email     ?? '',
      phone:     this.user?.phone     ?? '',
    });
  }

  saveProfile(): void {
    if (this.profilForm.invalid) return;
    this.saving = true;

    this.authService.update(this.profilForm.value).subscribe({
      next: (res: any) => {
        this.saving = false;
        this.isEditing = false;
        const updated = { ...this.user, ...this.profilForm.value,
          name: `${this.profilForm.value.firstname} ${this.profilForm.value.lastname}` };
        this.lsService.set(GlobalName.userName, updated);
        this.user = updated;
        AppSweetAlert.simpleAlert('success', 'Profil', 'Informations mises à jour avec succès.');
      },
      error: (err: any) => {
        this.saving = false;
        AppSweetAlert.simpleAlert('error', 'Profil', err?.error?.message ?? 'Une erreur est survenue.');
      }
    });
  }

  savePassword(): void {
    if (this.passwordForm.invalid) return;
    const { new_password, confirm_password } = this.passwordForm.value;
    if (new_password !== confirm_password) {
      AppSweetAlert.simpleAlert('warning', 'Mot de passe', 'Les mots de passe ne correspondent pas.');
      return;
    }
    this.saving = true;

    this.authService.changePassword(this.passwordForm.value).subscribe({
      next: () => {
        this.saving = false;
        this.passwordForm.reset();
        AppSweetAlert.simpleAlert('success', 'Sécurité', 'Mot de passe modifié avec succès.');
      },
      error: (err: any) => {
        this.saving = false;
        AppSweetAlert.simpleAlert('error', 'Sécurité', err?.error?.message ?? 'Une erreur est survenue.');
      }
    });
  }
}

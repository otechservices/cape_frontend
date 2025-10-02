import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mon-profil-promoter',
  templateUrl: './mon-profil-promoter.component.html',
  styleUrl: './mon-profil-promoter.component.css'
})
export class MonProfilPromoterComponent {

isEditing = false;
  isSaving = false;
  //activeTab:  'informations' | 'securite' | 'notifications' = 'informations';
activeTab:any
  profilForm: FormGroup;
  motDePasseForm: FormGroup;
  notificationsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profilForm = this.fb.group({
      prenom: ['Marie', Validators.required],
      nom: ['Dubois', Validators.required],
      email: ['marie.dubois@email.com', [Validators.required, Validators.email]],
      telephone: ['06 12 34 56 78'],
      adresse: ['123 Rue de la République'],
      ville: ['Lyon'],
      codePostal: ['69000'],
      profession: ['Directrice de crèche'],
      organisme: ['Association Les Petits Pas']
    });

    this.motDePasseForm = this.fb.group({
      ancien: ['', Validators.required],
      nouveau: ['', [Validators.required, Validators.minLength(8)]],
      confirmation: ['', Validators.required]
    });

    this.notificationsForm = this.fb.group({
      email: this.fb.group({
        dossiers: [true],
        rappels: [true],
        newsletter: [false]
      }),
      sms: this.fb.group({
        urgences: [true],
        confirmations: [false]
      })
    });
  }

  async onProfilSubmit() {
    if (this.profilForm.invalid) return;
    this.isSaving = true;
    await new Promise(res => setTimeout(res, 1500));
    this.isSaving = false;
    this.isEditing = false;
    alert('Profil sauvegardé !');
  }

  async onMotDePasseSubmit() {
    if (this.motDePasseForm.invalid) return;

    const { nouveau, confirmation } = this.motDePasseForm.value;
    if (nouveau !== confirmation) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    this.isSaving = true;
    await new Promise(res => setTimeout(res, 1500));
    this.isSaving = false;
    this.motDePasseForm.reset();
    alert('Mot de passe modifié avec succès');
  }

  async onNotificationsSubmit() {
    this.isSaving = true;
    await new Promise(res => setTimeout(res, 1000));
    this.isSaving = false;
    alert('Préférences sauvegardées');
  }

}

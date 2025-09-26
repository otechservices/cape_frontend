import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 registerForm: FormGroup;
  isSubmitting = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';

  constructor(private fb: FormBuilder, private router: Router) {
     this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      typeCompte: ['particulier', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      typeCompte: ['particulier', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

    passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }


  async handleSubmit() {
    if (this.registerForm.invalid) {
      alert('Veuillez remplir tous les champs requis et vérifier les mots de passe');
      return;
    }

    this.isSubmitting = true;
    this.submitStatus = 'idle';

    const formData = this.registerForm.value;

    try {
      const response = await fetch('https://readdy.ai/api/forms/2088b13d-c4e5-45c7-8bdb-4ad14cbfb123', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone,
          typeCompte: formData.typeCompte,
          password: formData.password
        })
      });
      if (response.ok) {
              this.submitStatus = 'success';
              this.registerForm.reset({ typeCompte: 'particulier' });
              setTimeout(() => this.router.navigate(['/connexion']), 1500);
            } else {
              this.submitStatus = 'error';
            }
          } catch (error) {
            this.submitStatus = 'error';
          } finally {
            this.isSubmitting = false;
          }
        }
}

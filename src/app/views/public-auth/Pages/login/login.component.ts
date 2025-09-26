import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

type SubmitStatus = 'idle' | 'success' | 'error';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 loginForm: FormGroup;
  isSubmitting = false;
  submitStatus: SubmitStatus = 'idle';


    constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  async handleSubmit() {
    if (this.loginForm.invalid) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    this.isSubmitting = true;
    this.submitStatus = 'idle';

    const formData = new URLSearchParams(this.loginForm.value).toString();

    try {
      const response = await fetch('https://readdy.ai/api/form/d31u8ug49c5vu889jicg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
      });

      if (response.ok) {
        this.submitStatus = 'success';
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', this.loginForm.value.email);
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      } else {
        this.submitStatus = 'error';
      }
    } catch (error) {
      this.submitStatus = 'error';
    } finally {
      this.isSubmitting = false;
    }
  }

  setActiveTab(tab:any){
    
  }
}

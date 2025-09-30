import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 registerForm: FormGroup;
  isSubmitting = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private toastrService:ToastrService,
    private authService:AuthService
  
  ) {
     this.registerForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
     // typeCompte: ['particulier', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
  }

    passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('password_confirmation')?.value;
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

        this.authService.register(formData).subscribe((res:any)=>{
          this.isSubmitting=false
    
            this.toastrService.success(res.message)

            this.router.navigate(['/public/auth/login'])
    
        },
        (err:any)=>{
          this.isSubmitting=false
    
          console.log(err)
            AppSweetAlert.simpleAlert("error","Inscription",err.error.message)
        })
      
      }
}

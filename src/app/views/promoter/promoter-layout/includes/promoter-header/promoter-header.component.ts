import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promoter-header',
  templateUrl: './promoter-header.component.html',
  styleUrl: './promoter-header.component.css'
})
export class PromoterHeaderComponent {
  userEmail: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('userEmail');
  }

  handleLogout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/']); // Redirection vers la page d’accueil
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


interface NewsItem {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  readTime: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
}


@Component({
  selector: 'app-actuality',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './actuality.component.html',
  styleUrl: './actuality.component.css'
})
export class ActualityComponent {
selectedCategory = 'all';
  siteUrl = 'https://example.com';

  newsItems: NewsItem[] = [
    {
      id: 1,
      date: "15 Décembre 2024",
      title: "Nouvelle procédure d'agrément pour les CAPE",
      excerpt: "Le Ministère annonce la mise en place d'une nouvelle procédure simplifiée pour l'agrément des Centres d'Accueil et de Protection de l'Enfant (CAPE). Cette réforme vise à améliorer l'efficacité du processus tout en maintenant les standards de qualité.",
      category: "CAPE",
      image: "https://readdy.ai/api/search-image?query=African%20children%20in%20a%20modern%20daycare%20center%20with%20colorful%20toys%20and%20educational%20materials%2C%20bright%20and%20welcoming%20environment%2C%20professional%20caregivers%20supervising%20activities%2C%20clean%20and%20organized%20space&width=400&height=250&seq=news1&orientation=landscape",
      author: "Direction des Affaires Sociales",
      readTime: "3 min de lecture"
    },
    {
      id: 2,
      date: "12 Décembre 2024",
      title: "Formation obligatoire pour les directeurs de garderies",
      excerpt: "Une formation de 40 heures devient obligatoire pour tous les directeurs de garderies afin d'améliorer la qualité des services offerts aux enfants. Cette mesure entre en vigueur dès janvier 2025.",
      category: "GARDERIES",
      image: "https://readdy.ai/api/search-image?query=Professional%20training%20session%20for%20daycare%20directors%20in%20Benin%2C%20adults%20in%20formal%20attire%20attending%20educational%20workshop%2C%20modern%20conference%20room%20setting%2C%20presentation%20screen%20visible&width=400&height=250&seq=news2&orientation=landscape",
      author: "Département Formation",
      readTime: "4 min de lecture"
    },
    {
      id: 3,
      date: "10 Décembre 2024",
      title: "Inspection annuelle des structures autorisées",
      excerpt: "Les équipes du Ministère effectuent actuellement les inspections annuelles de toutes les structures de protection de l'enfant autorisées. Ces inspections garantissent le respect des normes de sécurité et de qualité.",
      category: "INSPECTION",
      image: "https://readdy.ai/api/search-image?query=Government%20officials%20conducting%20inspection%20at%20childcare%20facility%20in%20Benin%2C%20professional%20assessment%20of%20safety%20standards%2C%20modern%20African%20childcare%20center%20environment&width=400&height=250&seq=news3&orientation=landscape",
      author: "Service d'Inspection",
      readTime: "2 min de lecture"
    },
    {
      id: 4,
      date: "8 Décembre 2024",
      title: "Subventions pour l'amélioration des infrastructures",
      excerpt: "Le gouvernement alloue des fonds spéciaux pour l'amélioration des infrastructures des CAPE et garderies dans tout le pays. Un budget de 2 milliards de FCFA est prévu pour cette initiative.",
      category: "FINANCEMENT",
      image: "https://readdy.ai/api/search-image?query=Modern%20renovated%20childcare%20facility%20in%20Benin%20showing%20improved%20infrastructure%2C%20new%20playground%20equipment%2C%20updated%20buildings%20with%20children%20playing%20safely&width=400&height=250&seq=news4&orientation=landscape",
      author: "Ministère des Finances",
      readTime: "5 min de lecture"
    },
    {
      id: 5,
      date: "5 Décembre 2024",
      title: "Campagne de sensibilisation sur les droits de l'enfant",
      excerpt: "Lancement d'une grande campagne nationale de sensibilisation sur les droits de l'enfant et l'importance de la protection infantile. Cette campagne touchera toutes les communes du Bénin.",
      category: "SENSIBILISATION",
      image: "https://readdy.ai/api/search-image?query=Community%20awareness%20campaign%20about%20children%20rights%20in%20Benin%2C%20colorful%20banners%20and%20posters%2C%20community%20gathering%20with%20families%20and%20children%2C%20educational%20materials%20displayed&width=400&height=250&seq=news5&orientation=landscape",
      author: "Communication Ministérielle",
      readTime: "3 min de lecture"
    },
    {
      id: 6,
      date: "2 Décembre 2024",
      title: "Partenariat avec l'UNICEF pour la formation",
      excerpt: "Signature d'un accord de partenariat avec l'UNICEF pour renforcer les capacités du personnel des structures de protection de l'enfant. Ce partenariat prévoit la formation de 500 professionnels.",
      category: "PARTENARIAT",
      image: "https://readdy.ai/api/search-image?query=Official%20signing%20ceremony%20between%20Benin%20Ministry%20and%20UNICEF%20representatives%2C%20formal%20handshake%2C%20flags%20of%20Benin%20and%20UNICEF%20visible%2C%20professional%20government%20office%20setting&width=400&height=250&seq=news6&orientation=landscape",
      author: "Relations Internationales",
      readTime: "4 min de lecture"
    },
    {
      id: 7,
      date: "28 Novembre 2024",
      title: "Nouvelles normes de sécurité pour les garderies",
      excerpt: "Publication des nouvelles normes de sécurité applicables à toutes les garderies du territoire national. Ces normes renforcent la protection des enfants et améliorent les conditions d'accueil.",
      category: "GARDERIES",
      image: "https://readdy.ai/api/search-image?query=Safe%20and%20secure%20daycare%20environment%20in%20Benin%20with%20modern%20safety%20equipment%2C%20fire%20safety%20systems%2C%20secure%20entrances%2C%20and%20child-friendly%20safety%20measures&width=400&height=250&seq=news7&orientation=landscape",
      author: "Service Technique",
      readTime: "6 min de lecture"
    },
    {
      id: 8,
      date: "25 Novembre 2024",
      title: "Journée mondiale de l'enfance célébrée",
      excerpt: "Célébration de la Journée mondiale de l'enfance avec des activités dans tous les CAPE du pays. Plus de 10 000 enfants ont participé aux festivités organisées à cette occasion.",
      category: "ÉVÉNEMENT",
      image: "https://readdy.ai/api/search-image?query=Children%20celebrating%20World%20Children%20Day%20in%20Benin%2C%20colorful%20festivities%2C%20traditional%20African%20decorations%2C%20happy%20children%20with%20flags%20and%20balloons%2C%20outdoor%20celebration&width=400&height=250&seq=news8&orientation=landscape",
      author: "Coordination Nationale",
      readTime: "3 min de lecture"
    }
  ];

  categories: Category[] = [
    { id: 'all', name: 'Toutes les actualités', count: this.newsItems.length },
    { id: 'CAPE', name: 'CAPE', count: this.newsItems.filter(item => item.category === 'CAPE').length },
    { id: 'GARDERIES', name: 'Garderies', count: this.newsItems.filter(item => item.category === 'GARDERIES').length },
    { id: 'INSPECTION', name: 'Inspections', count: this.newsItems.filter(item => item.category === 'INSPECTION').length },
    { id: 'FINANCEMENT', name: 'Financement', count: this.newsItems.filter(item => item.category === 'FINANCEMENT').length },
    { id: 'SENSIBILISATION', name: 'Sensibilisation', count: this.newsItems.filter(item => item.category === 'SENSIBILISATION').length },
    { id: 'PARTENARIAT', name: 'Partenariats', count: this.newsItems.filter(item => item.category === 'PARTENARIAT').length },
    { id: 'ÉVÉNEMENT', name: 'Événements', count: this.newsItems.filter(item => item.category === 'ÉVÉNEMENT').length }
  ];

  getCategoryColor(category: string): string {
    switch (category) {
      case 'CAPE': return 'tw-bg-green-100 tw-text-green-800';
      case 'GARDERIES': return 'tw-bg-blue-100 tw-text-blue-800';
      case 'INSPECTION': return 'tw-bg-orange-100 tw-text-orange-800';
      case 'FINANCEMENT': return 'tw-bg-purple-100 tw-text-purple-800';
      case 'SENSIBILISATION': return 'tw-bg-red-100 tw-text-red-800';
      case 'PARTENARIAT': return 'tw-bg-indigo-100 tw-text-indigo-800';
      case 'ÉVÉNEMENT': return 'tw-bg-pink-100 tw-text-pink-800';
      default: return 'tw-bg-gray-100 tw-text-gray-800';
    }
  }



    get filteredNews(): NewsItem[] {
    return this.selectedCategory === 'all'
      ? this.newsItems
      : this.newsItems.filter(item => item.category === this.selectedCategory);
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
  }
}

import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActualityService } from 'src/app/core/services/actuality.service';
import { ConfigService } from 'src/app/core/utils/config-service';

interface NewsItem {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  readTime: string;
  content: string;
}

@Component({
  selector: 'app-actuality-details',
  templateUrl: './actuality-details.component.html',
  styleUrls: ['./actuality-details.component.css']
})
export class ActualityDetailsComponent implements OnInit {

  @ViewChild('img') img: ElementRef | undefined
  
  data:any

   siteUrl = 'https://example.com';
  article: NewsItem | null = null;
  relatedArticles: NewsItem[] = [];
  id: number | null = null;

  newsItems: NewsItem[] = [
    {
      id: 1,
      date: "15 Décembre 2024",
      title: "Nouvelle procédure d'agrément pour les CAPE",
      excerpt: "Le Ministère annonce la mise en place d'une nouvelle procédure simplifiée pour l'agrément des Centres d'Accueil et de Protection de l'Enfant (CAPE). Cette réforme vise à améliorer l'efficacité du processus tout en maintenant les standards de qualité.",
      category: "CAPE",
      image: "https://readdy.ai/api/search-image?query=African%20children%20in%20a%20modern%20daycare%20center&width=800&height=400&seq=article1&orientation=landscape",
      author: "Direction des Affaires Sociales",
      readTime: "3 min de lecture",
   content: `
        <p>Le Ministère des Affaires Sociales et de la Microfinance annonce officiellement la mise en place d'une nouvelle procédure d'agrément pour les Centres d'Accueil et de Protection de l'Enfant (CAPE). Cette réforme majeure, qui entrera en vigueur le 1er janvier 2025, vise à simplifier les démarches administratives tout en renforçant les critères de qualité et de sécurité.</p>

        <h3>Les principales innovations de cette réforme</h3>
        
        <p>La nouvelle procédure introduit plusieurs améliorations significatives :</p>
        
        <ul>
          <li><strong>Dématérialisation complète</strong> : Tous les dossiers peuvent désormais être soumis en ligne via notre plateforme dédiée</li>
          <li><strong>Délais raccourcis</strong> : Le temps de traitement passe de 6 mois à 3 mois maximum</li>
          <li><strong>Accompagnement renforcé</strong> : Chaque candidat bénéficie d'un conseiller dédié</li>
          <li><strong>Critères clarifiés</strong> : Publication d'un guide détaillé avec tous les critères d'évaluation</li>
        </ul>
        
        <h3>Impact sur les structures existantes</h3>
        
        <p>Les CAPE déjà agréés devront procéder à une mise à jour de leur dossier avant le 30 juin 2025. Cette transition se fera sans interruption de service et sera accompagnée par nos équipes techniques.</p>
        
        <p>Le Directeur des Affaires Sociales, M. Kokou AGBESSI, précise : "Cette réforme s'inscrit dans notre volonté d'améliorer continuellement la qualité des services offerts aux enfants tout en facilitant les démarches des professionnels du secteur."</p>
        
        <h3>Formation et accompagnement</h3>
        
        <p>Des sessions de formation seront organisées dans toutes les régions du pays pour accompagner les professionnels dans cette transition. Les dates et modalités d'inscription seront communiquées prochainement.</p>
        
        <p>Pour toute question relative à cette nouvelle procédure, les professionnels peuvent contacter le service dédié au 229 60 42 20 09 ou par email à cape.agrement@gouv.bj.</p>
      `    },
    {
      id: 2,
      date: "12 Décembre 2024",
      title: "Formation obligatoire pour les directeurs de garderies",
      excerpt: "Une formation de 40 heures devient obligatoire pour tous les directeurs de garderies afin d'améliorer la qualité des services offerts aux enfants.",
      category: "GARDERIES",
      image: "https://readdy.ai/api/search-image?query=Professional%20training%20session&width=800&height=400&seq=article2&orientation=landscape",
      author: "Département Formation",
      readTime: "4 min de lecture",
      content: `<p>À partir de janvier 2025...</p>` // contenu HTML
    }
  ];

  constructor(
    private actualityService:ActualityService,
    private route:ActivatedRoute,
    private toastrService:ToastrService,
    private renderer: Renderer2

  ) { }

  ngOnInit(): void {
    // this.id =this.route.snapshot.paramMap.get('id')
    // if( this.id!= undefined) this.get()


      this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.loadArticle();
    });
  }

  get(){
    this.actualityService.get(this.id).subscribe((res:any)=>{
      this.data=res.data
      this.renderer.setStyle(this.img!.nativeElement, 'background-image',this.getLink(this.data.big_photo));
    },
    (err:any)=>{

    })
  }


  getLink(name:any){

    return ConfigService.toFile(`storage/actualities/${name}`)
  }

   loadArticle(): void {
    this.article = this.newsItems.find(item => item.id === this.id) || null;

    if (this.article) {
      this.relatedArticles = this.newsItems
        .filter(item => item.id !== this.article!.id && item.category === this.article!.category)
        .slice(0, 3);
    }
  }

  getCategoryColor(category: string): string {
    switch (category) {
      case 'CAPE': return 'tw-bg-green-100 tw-text-green-800';
      case 'GARDERIES': return 'tw-bg-blue-100 tw-text-blue-800';
      case 'INSPECTION': return 'tw-bg-orange-100 tw-text-orange-800';
      case 'FINANCEMENT': return 'tw-bg-purple-100 tw-text-purple-800';
      case 'SENSIBILISATION': return 'tw-bg-red-100 tw-text-red-800';
      case 'PARTENARIAT': return 'tw-bg-indigo-100 tw-text-indigo-800';
      default: return 'tw-bg-gray-100 tw-text-gray-800';
    }
  }

}

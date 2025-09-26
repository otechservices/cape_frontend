import { Component, OnInit } from '@angular/core';
import { ActualityService } from 'src/app/core/services/actuality.service';
import { ConfigService } from 'src/app/core/utils/config-service';
interface NewsItem {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  active = 'top';
  data:any[]=[]


  newsItems: NewsItem[] = [
    {
      id: 1,
      date: "15 Décembre 2024",
      title: "Nouvelle procédure d'agrément pour les CAPE",
      excerpt: "Le Ministère annonce la mise en place d'une nouvelle procédure simplifiée pour l'agrément des Centres d'Accueil et de Protection de l'Enfant (CAPE).",
      category: "CAPE",
      image: "https://readdy.ai/api/search-image?query=African%20children%20in%20a%20modern%20daycare%20center%20with%20colorful%20toys%20and%20educational%20materials%2C%20bright%20and%20welcoming%20environment%2C%20professional%20caregivers%20supervising%20activities%2C%20clean%20and%20organized%20space&width=400&height=250&seq=news1&orientation=landscape"
    },
    {
      id: 2,
      date: "12 Décembre 2024",
      title: "Formation obligatoire pour les directeurs de garderies",
      excerpt: "Une formation de 40 heures devient obligatoire pour tous les directeurs de garderies afin d'améliorer la qualité des services offerts aux enfants.",
      category: "GARDERIES",
      image: "https://readdy.ai/api/search-image?query=Professional%20training%20session%20for%20daycare%20directors%20in%20Benin%2C%20adults%20in%20formal%20attire%20attending%20educational%20workshop%2C%20modern%20conference%20room%20setting%2C%20presentation%20screen%20visible&width=400&height=250&seq=news2&orientation=landscape"
    },
    {
      id: 3,
      date: "10 Décembre 2024",
      title: "Inspection annuelle des structures autorisées",
      excerpt: "Les équipes du Ministère effectuent actuellement les inspections annuelles de toutes les structures de protection de l'enfant autorisées.",
      category: "INSPECTION",
      image: "https://readdy.ai/api/search-image?query=Government%20officials%20conducting%20inspection%20at%20childcare%20facility%20in%20Benin%2C%20professional%20assessment%20of%20safety%20standards%2C%20modern%20African%20childcare%20center%20environment&width=400&height=250&seq=news3&orientation=landscape"
    },
    {
      id: 4,
      date: "8 Décembre 2024",
      title: "Subventions pour l'amélioration des infrastructures",
      excerpt: "Le gouvernement alloue des fonds spéciaux pour l'amélioration des infrastructures des CAPE et garderies dans tout le pays.",
      category: "FINANCEMENT",
      image: "https://readdy.ai/api/search-image?query=Modern%20renovated%20childcare%20facility%20in%20Benin%20showing%20improved%20infrastructure%2C%20new%20playground%20equipment%2C%20updated%20buildings%20with%20children%20playing%20safely&width=400&height=250&seq=news4&orientation=landscape"
    },
    {
      id: 5,
      date: "5 Décembre 2024",
      title: "Campagne de sensibilisation sur les droits de l'enfant",
      excerpt: "Lancement d'une grande campagne nationale de sensibilisation sur les droits de l'enfant et l'importance de la protection infantile.",
      category: "SENSIBILISATION",
      image: "https://readdy.ai/api/search-image?query=Community%20awareness%20campaign%20about%20children%20rights%20in%20Benin%2C%20colorful%20banners%20and%20posters%2C%20community%20gathering%20with%20families%20and%20children%2C%20educational%20materials%20displayed&width=400&height=250&seq=news5&orientation=landscape"
    },
     {
      id: 6,
      date: "2 Décembre 2024",
      title: "Partenariat avec l'UNICEF pour la formation",
      excerpt: "Signature d'un accord de partenariat avec l'UNICEF pour renforcer les capacités du personnel des structures de protection de l'enfant.",
      category: "PARTENARIAT",
      image: "https://readdy.ai/api/search-image?query=Official%20signing%20ceremony%20between%20Benin%20Ministry%20and%20UNICEF%20representatives%2C%20formal%20handshake%2C%20flags%20of%20Benin%20and%20UNICEF%20visible%2C%20professional%20government%20office%20setting&width=400&height=250&seq=news6&orientation=landscape"
    }
  ];

 links = [
    {
      title: "Cartographie des structures de protection",
      logo: "https://cape.social.gouv.bj/assets/template2/images/logo-masm-2.png",
      url: "https://acteursprotection.social.gouv.bj/"
    },
    {
      title: "Site web du Ministère des Affaires Sociales et de la Microfinance (MASM)",
      logo: "https://cape.social.gouv.bj/assets/template2/images/logo-masm-2.png",
      url: "https://social.gouv.bj/"
    },
    {
      title: "Secrétariat Général du Gouvernement",
      logo: "https://cape.social.gouv.bj/assets/template2/images/sgg-gouv-bj.png",
      url: "https://sgg.gouv.bj/"
    },
    {
      title: "Bibliothèque numérique du MASM",
      logo: "https://cape.social.gouv.bj/assets/template2/images/sgg-gouv-bj.png",
      url: "https://bibliotheque.social.gouv.bj/pe"
    }
  ];

 documents = [
    {
      title: "Décret fixant les modalités de création des CAPE",
      type: "Télécharger le décret",
      icon: "ri-file-pdf-line",
      color: "bg-red-500"
    },
    {
      title: "Décret fixant les modalités de création des GARDERIES",
      type: "Télécharger le décret",
      icon: "ri-file-pdf-line",
      color: "bg-red-500"
    },
    {
      title: "Le modèle consentement pour la collecte de vos données personnelles",
      type: "Télécharger le modèle",
      icon: "ri-file-text-line",
      color: "bg-blue-500"
    },
    {
      title: "Cahier de charge de la GARDERIE",
      type: "Télécharger le cahier des charges par promoteurs",
      icon: "ri-file-pdf-line",
      color: "bg-red-500"
    },
    {
      title: "Le guide d'inscription",
      type: "Télécharger le guide",
      icon: "ri-file-text-line",
      color: "bg-blue-500"
    },
    {
      title: "Le code de l'enfant",
      type: "Télécharger le code de l'enfant",
      icon: "ri-file-text-line",
      color: "bg-red-500"
    }
  ];

  getCategoryColor(category: string) {
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

  constructor(
    private actualityService:ActualityService
  ) { }

  ngOnInit(): void {
    this.getAll()
  }


  
  getAll(){
    this.actualityService.getAll2().subscribe((res:any)=>{
      this.data=res.data
    },
    (err:any)=>{

    })
  }
  download(index:any){
   /* const blob = new Blob(['assets/decret.pdf'], { type: 'application/pdf' });
    const url= window.URL.createObjectURL(blob);*/
    let url="";
    switch (index) {
      case 1:
         url=ConfigService.toFile('decret_cape.pdf')
        break;
      case 2:
         url=ConfigService.toFile('decret_garderie.pdf')
        break;
      case 3:
         url=ConfigService.toFile('consentement.docx')
        break;
      case 4:
         url=ConfigService.toFile('cdc.pdf')
        break;
      case 5:
         url=ConfigService.toFile('guide.pdf')
        break;
      case 6:
         url=ConfigService.toFile('code_enfant.pdf')
        break;
    
      default:
        break;
    }
 
    window.open(url),'_blank';
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
}

getLink(name:any){

  return ConfigService.toFile(`storage/actualities/${name}`)
}


goTo(path: string) {
  window.location.href = path;
}

scrollTo(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

}

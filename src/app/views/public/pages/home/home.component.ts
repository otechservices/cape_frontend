import { Component, OnInit } from '@angular/core';
import { ActualityService } from 'src/app/core/services/actuality.service';
import { ConfigService } from 'src/app/core/utils/config-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  active = 'top';
  data:any[]=[]


  newsItems: any[] = [];

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
      color: "bg-red-500",
      index:1
    },
    {
      title: "Décret fixant les modalités de création des GARDERIES",
      type: "Télécharger le décret",
      icon: "ri-file-pdf-line",
      color: "bg-red-500",
      index:2
    },
    {
      title: "Le modèle consentement pour la collecte de vos données personnelles",
      type: "Télécharger le modèle",
      icon: "ri-file-text-line",
      color: "bg-blue-500",
      index:3
    },
    {
      title: "Cahier de charge de la GARDERIE",
      type: "Télécharger le cahier des charges par promoteurs",
      icon: "ri-file-pdf-line",
      color: "bg-red-500",
      index:4
    },
    {
      title: "Le guide d'inscription",
      type: "Télécharger le guide",
      icon: "ri-file-text-line",
      color: "bg-blue-500",
      index:5
    },
    {
      title: "Le code de l'enfant",
      type: "Télécharger le code de l'enfant",
      icon: "ri-file-text-line",
      color: "bg-red-500",
      index:6
    }
  ];

  getCategoryColor(category: string) {
    switch (category) {
      case 'CAPE': return 'tw-bg-green-100 tw-text-green-800';
      case 'GARDERIES': return 'tw-bg-blue-100 tw-text-blue-800';
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
      this.newsItems=res.data?.slice(0,6)
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



goTo(path: string) {
  window.location.href = path;
}

scrollTo(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}


getLink(dir:any,path:any){
  return ConfigService.toFile(`storage/${dir}/${path}`)
}


}

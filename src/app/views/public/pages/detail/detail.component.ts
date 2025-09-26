import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/core/utils/config-service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  type:any

  pieces1 = [
  { title: "Une fiche de renseignement", desc: "dûment remplie et dûment signée par le demandeur avec photo récente, timbrée" },
  { title: "Le plan architectural de la garderie", desc: "comprenant un plan de situation et des espaces dédiés aux activités éducatives et récréatives des enfants" },
  { title: "Le recensement des personnes", desc: "qui interviennent sur la prise en charge et le bien-être des enfants" },
  { title: "La visite des parents", desc: "qui désirent confier leurs enfants et qui jugent de la sécurité et de la propreté de la garderie" },
  { title: "Un traitement de projet éducatif", desc: "et un plan de prise en compte des besoins affectifs, éducationnels et de développement de l'enfant" },
];

pieces2 = [
  { title: "Le certificat de conformité environnementale", desc: "de 2 échaus, 1er registre hygiène - entretien ménager régulier avec services" },
  { title: "La pièce d'identité en cours de validité", desc: "et extrait du casier judiciaire" },
  { title: "L'engagement du personnel de la liste", desc: "et états des diplômes et des statuts" },
  { title: "Le contrôle médical annuel", desc: "établi pour la structure et le personnel qui travaille dans l'établissement" },
];

procedureSteps2 = [
  { number: 1, title: "Dépôt de candidature", desc: "L'ouverture d'inscription se fait sur présentation des documents requis. Les demandes de dossiers complètes et régulières sont reçues du Lundi au Samedi" },
  { number: 2, title: "Étude de demande et agrément provisoire", desc: "Une semaine d'étude des demandes d'autorisation sera organisée. Une équipe d'experts effectuera les évaluations nécessaires" },
  { number: 3, title: "Délivrance de l'agrément définitif", desc: "L'agrément définitif est accordé pour la mission des années scolaires selon les réglementations en vigueur" },
];

documents2 = [
  { title: "Décret fixant les modalités de création des garderies", desc: "Télécharger le décret", color: "tw-text-red-600" },
  { title: "Le modèle consentement pour la collecte de vos données personnelles", desc: "Télécharger le modèle", color: "tw-text-blue-600" },
  { title: "Cahier de charge de la garderie", desc: "Télécharger le cahier de charges", color: "tw-text-red-600" },
  { title: "Le guide d'inscription", desc: "Télécharger le guide", color: "tw-text-red-600" },
];



piecesLeft = [
  { title: "Demande d'autorisation d'ouverture", description: "sur papier en-tête" },
  { title: "Certificat médical du promoteur", description: "datant de moins de 3 mois" },
  { title: "Plan architectural", description: "du local où sera installé le CAPE" },
  { title: "Dossier du personnel", description: "CV et diplômes du personnel qualifié" },
  { title: "Inventaire du matériel", description: "équipements et mobilier" }
];

piecesRight = [
  { title: "Document du projet", description: "indiquant les activités du centre avec un volet financement et la procédure d'accès aux bénéficiaires" },
  { title: "Numéro d'agrément", description: "ou autorisation du ministère si nécessaire" },
  { title: "Documents légaux", description: "de responsabilité de la structure et du bail" },
  { title: "Tous les actes de recommandation", description: "des institutions partenaires ou du personnel concerné par les activités" },
  { title: "Quittance de primes", description: "statutaires et règlement des frais d'étude du dossier" }
];

procedureSteps = [
  { title: "Inscription en ligne", description: "Votre inscription se fait par cette plateforme ou enregistrement via les informations informatisées avec les pièces jointes" },
  { title: "Étude de demande et visite et agrément provisoire", description: "Une équipe d'experts du MASM sera constituée pour étudier votre dossier et effectuer une visite de terrain" },
  { title: "Délivrance de l'agrément définitif", description: "Agrément définitif vous sera délivré, des activités suivant la loi en vigueur" }
];

documents = [
  { title: "Décret fixant les modalités de création des CAPE", subtitle: "Télécharger le décret", icon: "ri-file-pdf-line", color: "red" },
  { title: "Le modèle consentement pour la collecte de vos données personnelles", subtitle: "Télécharger le modèle", icon: "ri-file-pdf-line", color: "blue" },
  { title: "Le guide d'inscription", subtitle: "Télécharger le guide", icon: "ri-file-pdf-line", color: "red" }
];

  constructor(
    private activatedRoute:ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.type=this.activatedRoute.snapshot.paramMap.get('type')

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
}

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
  {
    title: "Une fiche de renseignement",
    desc: "indiquant la dénomination de la garderie, les tranches d’âge d’enfants à accueillir, l’adresse complète, l’effectif prévisionnel d’enfants en fonction de la superficie des pièces, ainsi que les équipements disponibles."
  },
  {
    title: "Une copie d’un titre de propriété, d’un bail ou d’une autorisation",
    desc: "à occuper les lieux gratuitement."
  },
  {
    title: "Le document de projet éducatif de la garderie",
    desc: "avec le plan et le mode de financement."
  },
  {
    title: "Le certificat de conformité environnementale",
    desc: "ou à défaut, le rapport hygiène-santé-sécurité réalisé et/ou délivré par les services compétents du ministère en charge du Cadre de Vie."
  },
  {
    title: "L’engagement à souscrire une assurance",
    desc: "contre tous risques d’accidents des enfants dans la structure et une assurance maladie pour le personnel dans les trente (30) jours suivant le démarrage des activités."
  }
];

pieces2 = [
  {
    title: "Le plan architectural de la garderie",
    desc: "comportant le plan des bâtiments et des autres installations réalisées et/ou à construire."
  },
  {
    title: "Le nombre d’agents",
    desc: "recrutés ou à recruter et leur profil."
  },
  {
    title: "La copie des statuts",
    desc: "ou de l’accord de siège et de la publication de la création au Journal officiel pour une association ou organisation non gouvernementale nationale ou internationale, et la copie des statuts et de la publication dans un journal d’annonce légale pour une société."
  },
  {
    title: "La pièce d’identité en cours de validité",
    desc: "et l’extrait du casier judiciaire datant de moins de trois (03) mois du promoteur personne physique ou du représentant légal du promoteur personne morale."
  },
  {
    title: "La quittance de paiement des frais d’étude de dossiers",
    desc: "justifiant le paiement des frais requis pour le traitement du dossier."
  }
];

procedureSteps2 = [
  {
    number: 1,
    title: "Inscription en ligne",
    desc: "L'étape d'inscription se fait sur cette plateforme en renseignant toutes les informations demandées ainsi que toutes les pièces jointes. Une fois le dossier enregistré, vous recevrez un mail de notification."
  },
  {
    number: 2,
    title: "Étude de demandes d'autorisation et agrément provisoire",
    desc: "Une session chargée de l'étude des demandes d'autorisation des garderies est organisée de façon annuelle au MASM afin d'analyser les dossiers des garderies enregistrées en ligne. Les garderies dont les dossiers auront été jugés recevables se verront délivrer un agrément provisoire. Les résultats de cette délibération seront notifiés aux responsables concernés par email et publiés sur le site web."
  },
  {
    number: 3,
    title: "Délivrance de l'agrément définitif",
    desc: "L'agrément définitif est délivré par le Ministre des Affaires Sociales et de la Microfinance."
  }
];

documents2 = [
  { title: "Décret fixant les modalités de création des garderies", desc: "Télécharger le décret", color: "tw-text-red-600",index:2 },
  { title: "Le modèle consentement pour la collecte de vos données personnelles", desc: "Télécharger le modèle", color: "tw-text-blue-600" ,index:3},
  { title: "Cahier de charge de la garderie", desc: "Télécharger le cahier de charges", color: "tw-text-red-600",index:4 },
  { title: "Le guide d'inscription", desc: "Télécharger le guide", color: "tw-text-red-600",index:5 },
];


piecesLeft = [
  {
    title: "Demande d’autorisation d’ouverture",
    description: "adressée au ministre chargé de la famille indiquant la dénomination exacte et le type de centre, l’adresse complète, le but, la capacité d’accueil, la cible d’enfants et les équipements disponibles pour le démarrage."
  },
  {
    title: "Dossier du promoteur",
    description: "contenant la pièce d’identité ou toute autre pièce y tenant lieu, le casier judiciaire de moins de 3 mois, le CV, le certificat de nationalité et la copie du diplôme."
  },
  {
    title: "Dossier du directeur",
    description: "contenant les mêmes pièces que celles du dossier du promoteur."
  },
  {
    title: "Copie de l’acte de propriété, de donation ou du contrat de bail du site",
    description: "conformément aux dispositions de l’article 9 du décret."
  }
];

piecesRight = [
  {
    title: "Document du projet",
    description: "indiquant les activités du centre, le plan de financement et le mode de financement."
  },
  {
    title: "Plan architectural du centre",
    description: "comprenant les bâtiments et autres installations réalisées et/ou à construire."
  },
  {
    title: "Nombre d’agents",
    description: "recrutés ou à recruter avec leur profil."
  },
  {
    title: "Documents légaux de reconnaissance de la structure",
    description: "tels que récépissé d’enregistrement, journal officiel, statuts, règlement intérieur ou accord de siège pour les structures internationales."
  },
  {
    title: "Trois lettres de recommandation",
    description: "de personnalités reconnues et/ou d’acteurs de la protection de l’enfant attestant de la bonne moralité du promoteur ou du représentant légal."
  },
  {
    title: "Quittance ou preuve de paiement",
    description: "justifiant le règlement des frais d’étude du dossier fixés par arrêté conjoint du ministre de la famille et du ministre de l’Économie et des Finances."
  }
];


procedureSteps = [
  {
    title: "Inscription en ligne",
    description: "L'étape d'inscription se fait sur cette plateforme en renseignant toutes les informations demandées ainsi que toutes les pièces jointes. Une fois le dossier enregistré, vous recevrez un mail de notification."
  },
  {
    title: "Étude de demandes d'autorisation et agrément provisoire",
    description: "Une session chargée de l'étude des demandes d'autorisation des CAPE est organisée de façon annuelle au MASM afin d'analyser les dossiers des CAPE enregistrés en ligne. Les CAPE dont les dossiers auront été jugés recevables se verront délivrer un agrément provisoire. Les résultats de cette délibération seront notifiés aux responsables concernés par email et publiés sur le site web."
  },
  {
    title: "Délivrance de l'agrément définitif",
    description: "L'agrément définitif est délivré par le Ministre des Affaires Sociales et de la Microfinance."
  }
];

documents = [
  { title: "Décret fixant les modalités de création des CAPE", subtitle: "Télécharger le décret", icon: "ri-file-pdf-line", color: "red" , index:1},
  { title: "Le modèle consentement pour la collecte de vos données personnelles", subtitle: "Télécharger le modèle", icon: "ri-file-pdf-line", color: "blue",index:3 },
  { title: "Le guide d'inscription", subtitle: "Télécharger le guide", icon: "ri-file-pdf-line", color: "red",index:5 }
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

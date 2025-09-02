
interface menu{
    isTitle:boolean
    hasChildren:boolean
    title?:string
    name?:string
    route?:string
    children?: menu[]
}
export const AdminMenu:menu[]=[
  
    {
        isTitle:false,
        name:"Tableau de bord",
        route:'/admin/dashboard',
        hasChildren:false
    
    },
    {
        isTitle:true,
        title:"Actualité",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"Toutes les actualités",
        route:'/admin/actualities',
        hasChildren:false
    
    },
    {
        isTitle:true,
        title:"configuration",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"Localisation",
        hasChildren:true,
        children:[
            {
                isTitle:false,
                name:"Départements",
                route:'/admin/departments',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Communes",
                route:'/admin/municipalities',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Arrondissements",
                route:'/admin/districts',
                hasChildren:false
            
            },
            {
                isTitle:true,
                title:"Centres sociaux",
                hasChildren:false
            },
            {
                isTitle:false,
                name:"CPS",
                route:'/admin/cps',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"CAPE autorisés",
                route:'/admin/cape-inscritss',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"CAPE Inscrits",
                route:'/admin/list-requetes',
                hasChildren:false
            
            }
        ]
    },
   
 
    {
        isTitle:false,
        name:"Typologie",
        hasChildren:true,
        children:[
            {
                isTitle:false,
                name:"Type Cape",
                route:'/admin/type-capes',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Type Garderie",
                route:'/admin/type-garderies',
                hasChildren:false
            
            },
            // {
            //     isTitle:false,
            //     name:"Type sous garderie",
            //     route:'/admin/type-sous-garderies',
            //     hasChildren:false
            
            // },
            {
                isTitle:false,
                name:"Type assistance",
                route:'/admin/type-billings',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Type Info",
                route:'/admin/type-infos',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Cible",
                route:'/admin/targets',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Nature de promoteur",
                route:'/admin/nature-promotors',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Services",
                route:'/admin/services',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Type d'avis",
                route:'/admin/type-avis',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Type de sanction",
                route:'/admin/type-sanctions',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Type de contrôles",
                route:'/admin/type-controls',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Structure",
                route:'/admin/unite-admins',
                hasChildren:false
            
            }
        ]
    },

    {
        isTitle:false,
        name:"Documents",
        hasChildren:true,
        children:[
            {
        isTitle:false,
        name:"Pièces à fournir",
        route:'/admin/files',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"Type de documents",
        route:'/admin/type-files',
        hasChildren:false
    
    }
        ]
    },
   
    {
        isTitle:true,
        title:"Administration",
        hasChildren:false,

    },
    {
        isTitle:false,
        name:"Gestion des comptes utilisateurs",
        hasChildren:true,
        children:[
            {
                isTitle:false,
                name:"Comptes utilisateurs",
                route:'/admin/users',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Rôles",
                route:'/admin/roles',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Permissions",
                route:'/admin/permissions',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Rôles et Permission",
                route:'/admin/profiles',
                hasChildren:false
            
            }
        ]

    },
    {
        isTitle:false,
        name:"Maintenances",
        hasChildren:true,
        children:[
            {
                isTitle:false,
                name:"Sauvegardes",
                route:'/admin/backups',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Restauration",
                route:'/admin/backups',
                hasChildren:false
            
            }        
        ]

    },
    {
        isTitle:false,
        name:"Support",
        hasChildren:true,
        children:[
            {
                isTitle:false,
                name:"Assistance",
                route:'/admin/billings',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Demande d'information",
                route:'/admin/infos',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Journal des opérations",
                route:'/admin/journals',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Suggestions",
                route:'/admin/messages',
                hasChildren:false
            
            }
        ]

    },

   
   
]
export const MinistreMenu:menu[]=[

    {
        isTitle:false,
        name:"Tableau de bord",
        route:'/admin/dashboard',
        hasChildren:false
    
    },
    {
        isTitle:true,
        title:"Décision du ministre",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"En attente de décision finale",
        route:'/admin/request-has-agreements',
        hasChildren:false
    
    },
    {
        isTitle:true,
        title:"Gestion des rapports",
        hasChildren:false
    },

    {
        isTitle:false,
        name:"Visites de terrain",
        route:'/admin/follow-cape',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"Recommandations",
        route:'/admin/referals',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"Rapports d’activité",
        route:'/admin/activity-report',
        hasChildren:false
    
    },
    {
        isTitle:true,
        title:"Statistiques",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"CAPE inscrits",
        route:'/admin/statistiques/cape-inscrits',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"CAPE autorisés",
        route:'/admin/statistiques/cape-autorises',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"Visites de terrain",
        route:'/admin/statistiques/controls',
        hasChildren:false
    
    },

    {
        isTitle:true,
        title:"Recherche",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"CAPE inscrits",
        route:'/admin/search/cape-inscrits',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"CAPE autorisés",
        route:'/admin/search/cape-autorises',
        hasChildren:false
    
    }
   
]

export const CapeMenu:menu[]=[
 
    {
        isTitle:false,
        name:"Tableau de bord",
        route:'/admin/dashboard',
        hasChildren:false
    
    },
    {
        isTitle:true,
        title:"Espace CAPE",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"Personnels",
        route:'/admin/staff',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"Pensionnaires",
        route:'/admin/residents',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"Recommandations",
        route:'/admin/referals',
        hasChildren:false
    
    },
    // {
    //     isTitle:false,
    //     name:"Grille de contröle",
    //     route:'/admin/dashboard',
    //     hasChildren:false
    
    // },
    {
        isTitle:false,
        name:"Rapport d'activité",
        route:'/admin/activity-report',
        hasChildren:false
    
    },
];

export const CpsMenu:menu[]=[
   
    {
        isTitle:false,
        name:"Tableau de bord",
        route:'/admin/dashboard',
        hasChildren:false
    
    },
    {
        isTitle:true,
        title:"Traitement des demandes",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"A traiter",
        hasChildren:true,
        children:[
            {
                isTitle:false,
                name:"CAPE",
                route:'/admin/requetes/new/cape',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Garderie",
                route:'/admin/requetes/new/garderie',
                hasChildren:false
            
            },
           
        ]
    },
    {
        isTitle:false,
        name:"Parcours traitement",
        hasChildren:true,
        children:[
            {
                isTitle:false,
                name:"CAPE",
                route:'/admin/requetes/cape',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Garderie",
                route:'/admin/requetes/garderie',
                hasChildren:false
            
            },
         ]
    },

    {
        isTitle:true,
        title:"Gestion des rapports",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"Visite de terrain",
        hasChildren:true,
        children:[
            {
                isTitle:false,
                name:"CAPE",
                route:'/admin/follow-cape/cape',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Garderie",
                route:'/admin/follow-cape/garderie',
                hasChildren:false
            
            }
        ]
    
    },
   
    {
        isTitle:false,
        name:"Recommandations",
        hasChildren:true,
        children:[
            {
                isTitle:false,
                name:"CAPE",
                route:'/admin/referals/cape',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Garderie",
                route:'/admin/referals/garderie',
                hasChildren:false
            
            },
        ]
    
    },
  
    {
        isTitle:false,
        name:"Rapports d’activité",
        hasChildren:true,
        children:[
            {
                isTitle:false,
                name:"CAPE",
                route:'/admin/activity-report/cape',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Garderie",
                route:'/admin/activity-report/garderie',
                hasChildren:false
            
            },
        ]
    
    },
 
 
   
    {
        isTitle:true,
        title:"Statistiques",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"CAPE",
        hasChildren:true,
        children:[
            {
                isTitle:false,
                name:"CAPE inscrits",
                route:'/admin/statistiques/cape-inscrits/cape',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"CAPE autorisés",
                route:'/admin/statistiques/cape-autorises/cape',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Visites de terrain",
                route:'/admin/statistiques/controls/cape',
                hasChildren:false
            
            },
        ]
    },
    {
        isTitle:false,
        name:"Garderie",
        hasChildren:true,
        children:[
            {
                isTitle:false,
                name:"Garderies inscrites",
                route:'/admin/statistiques/cape-inscrits/garderie',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Garderies autorisées",
                route:'/admin/statistiques/cape-autorises/garderie',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Visites de terrain",
                route:'/admin/statistiques/controls/garderie',
                hasChildren:false
            
            },
        ]
    },
   
  
    

    {
        isTitle:true,
        title:"Recherche",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"CAPE",
        hasChildren:true,
        children:[
            {
                isTitle:false,
                name:"CAPE inscrits",
                route:'/admin/search/cape-inscrits/cape',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"CAPE autorisés",
                route:'/admin/search/cape-autorises/cape',
                hasChildren:false
            
            }
        ]
    },
    {
        isTitle:false,
        name:"Garderie",
        hasChildren:true,
        children:[
            {
                isTitle:false,
                name:"Garderie inscrites",
                route:'/admin/search/cape-inscrits/garderie',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Garderie autorisées",
                route:'/admin/search/cape-autorises/garderie',
                hasChildren:false
            
            }
        ]
    }
  
];
export const DDASMMenu:menu[]=[

    {
        isTitle:false,
        name:"Tableau de bord",
        route:'/admin/dashboard',
        hasChildren:false
    
    },
    {
        isTitle:true,
        title:"TRAITEMENT DES DEMANDES",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"A valider",
        route:'/admin/requetes/new',
        hasChildren:false
    
    },
    // {
    //     isTitle:false,
    //     name:"Demandes transmises",
    //     route:'/admin/requetes/transmitted',
    //     hasChildren:false
    
    // },
    {
        isTitle:false,
        name:"Parcours demandes",
        route:'/admin/requetes',
        hasChildren:false
    
    },

    {
        isTitle:true,
        title:"Gestion des rapports",
        hasChildren:false
    },

    {
        isTitle:false,
        name:"Visites de terrain",
        route:'/admin/follow-cape',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"Recommandations",
        route:'/admin/referals',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"Rapports d’activité",
        route:'/admin/activity-report',
        hasChildren:false
    
    },
    {
        isTitle:true,
        title:"Statistiques",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"CAPE inscrits",
        route:'/admin/statistiques/cape-inscrits',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"CAPE autorisés",
        route:'/admin/statistiques/cape-autorises',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"Visites de terrain",
        route:'/admin/statistiques/controls',
        hasChildren:false
    
    },

    {
        isTitle:true,
        title:"Recherche",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"CAPE inscrits",
        route:'/admin/search/cape-inscrits',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"CAPE autorisés",
        route:'/admin/search/cape-autorises',
        hasChildren:false
    
    }
];
export const DFEAMenu:menu[]=[
    {
        isTitle:false,
        name:"Tableau de bord",
        route:'/admin/dashboard',
        hasChildren:false
    
    },
    {
        isTitle:true,
        title:"Traitement des demandes",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"A valider",
        route:'/admin/requetes/new',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"Parcours traitement",
        route:'/admin/requetes',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"Dossiers à inscrire en session",
        route:'/admin/requetes/finished',
        hasChildren:false
    
    },

    {
        isTitle:true,
        title:"Agréments existants",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"Agréments à valider",
        route:'/admin/requetes-aggrement-validation',
        hasChildren:false
    
    },
    {
        isTitle:true,
        title:"Gestion des sessions",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"Création de session",
        route:'/admin/sessions',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"Création des membres",
        route:'/admin/members',
        hasChildren:false
    
    },

    {
        isTitle:true,
        title:"Gestion des sanctions",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"Sanctions",
        route:'/admin/sanctions',
        hasChildren:false
    
    },

    {
        isTitle:true,
        title:"Gestion des rapports",
        hasChildren:false
    },

    {
        isTitle:false,
        name:"Visites de terrain",
        route:'/admin/follow-cape',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"Recommandations",
        route:'/admin/referals',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"Rapports d’activité",
        route:'/admin/activity-report',
        hasChildren:false
    
    },
    {
        isTitle:true,
        title:"Statistiques",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"CAPE inscrits",
        route:'/admin/statistiques/cape-inscrits',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"CAPE autorisés",
        route:'/admin/statistiques/cape-autorises',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"Visites de terrain",
        route:'/admin/statistiques/controls',
        hasChildren:false
    
    },

    {
        isTitle:true,
        title:"Recherche",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"CAPE inscrits",
        route:'/admin/search/cape-inscrits',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"CAPE autorisés",
        route:'/admin/search/cape-autorises',
        hasChildren:false
    
    }

];
export const MemberMenu:menu[]=[
    {
        isTitle:false,
        name:"Tableau de bord",
        route:'/admin/dashboard',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"Dossiers inscrits",
        route:'/admin/session-requests',
        hasChildren:false
    
    },
];


export const ErrorMenu:menu[]=[];


export const ServiceMenu:menu[]=[
    {
        isTitle:false,
        name:"Tableau de bord",
        route:'/admin/dashboard',
        hasChildren:false
    
    },

    {
        isTitle:true,
        title:"Gestion des sessions",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"Création de session",
        route:'/admin/sessions',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"Création des membres",
        route:'/admin/members',
        hasChildren:false
    
    },
    {
        isTitle:true,
        title:"Statistiques",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"CAPE",
        hasChildren:true,
        children:[
            {
                isTitle:false,
                name:"CAPE inscrits",
                route:'/admin/statistiques/cape-inscrits/cape',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"CAPE autorisés",
                route:'/admin/statistiques/cape-autorises/cape',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Visites de terrain",
                route:'/admin/statistiques/controls/cape',
                hasChildren:false
            
            },
        ]
    },
    {
        isTitle:false,
        name:"Garderie",
        hasChildren:true,
        children:[
            {
                isTitle:false,
                name:"Garderies inscrites",
                route:'/admin/statistiques/cape-inscrits/garderie',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Garderies autorisées",
                route:'/admin/statistiques/cape-autorises/garderie',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Visites de terrain",
                route:'/admin/statistiques/controls/garderie',
                hasChildren:false
            
            },
        ]
    },
   
  
    

    {
        isTitle:true,
        title:"Recherche",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"CAPE",
        hasChildren:true,
        children:[
            {
                isTitle:false,
                name:"CAPE inscrits",
                route:'/admin/search/cape-inscrits/cape',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"CAPE autorisés",
                route:'/admin/search/cape-autorises/cape',
                hasChildren:false
            
            }
        ]
    },
    {
        isTitle:false,
        name:"Garderie",
        hasChildren:true,
        children:[
            {
                isTitle:false,
                name:"Garderie inscrites",
                route:'/admin/search/cape-inscrits/garderie',
                hasChildren:false
            
            },
            {
                isTitle:false,
                name:"Garderie autorisées",
                route:'/admin/search/cape-autorises/garderie',
                hasChildren:false
            
            }
        ]
    }

];





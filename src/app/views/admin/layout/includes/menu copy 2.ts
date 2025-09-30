export interface menu {
    id: string; // nouvelle clé
    isTitle: boolean;
    hasChildren: boolean;
    title?: string;
    name?: string;
    route?: string;
    children?: menu[];
}

// ================== AdminMenu ==================
export const AdminMenu: menu[] = [
    { id: 'admin-1', isTitle: false, name:"Tableau de bord", route:'/admin/dashboard', hasChildren:false },
    { id: 'admin-2', isTitle:true, title:"Actualité", hasChildren:false },
    { id: 'admin-3', isTitle:false, name:"Toutes les actualités", route:'/admin/actualities', hasChildren:false },
    { id: 'admin-4', isTitle:true, title:"configuration", hasChildren:false },
    { id: 'admin-5', isTitle:false, name:"Localisation", hasChildren:true, children:[
        { id: 'admin-5-1', isTitle:false, name:"Départements", route:'/admin/departments', hasChildren:false },
        { id: 'admin-5-2', isTitle:false, name:"Communes", route:'/admin/municipalities', hasChildren:false },
        { id: 'admin-5-3', isTitle:false, name:"Arrondissements", route:'/admin/districts', hasChildren:false },
        { id: 'admin-5-4', isTitle:true, title:"Centres sociaux", hasChildren:false },
        { id: 'admin-5-5', isTitle:false, name:"CPS", route:'/admin/cps', hasChildren:false },
        { id: 'admin-5-6', isTitle:false, name:"CAPE autorisés", route:'/admin/cape-inscritss', hasChildren:false },
        { id: 'admin-5-7', isTitle:false, name:"CAPE Inscrits", route:'/admin/list-requetes', hasChildren:false }
    ] },
    { id: 'admin-6', isTitle:false, name:"Typologie", hasChildren:true, children:[
        { id: 'admin-6-1', isTitle:false, name:"Type Cape", route:'/admin/type-capes', hasChildren:false },
        { id: 'admin-6-2', isTitle:false, name:"Type Garderie", route:'/admin/type-garderies', hasChildren:false },
        { id: 'admin-6-3', isTitle:false, name:"Type assistance", route:'/admin/type-billings', hasChildren:false },
        { id: 'admin-6-4', isTitle:false, name:"Type Info", route:'/admin/type-infos', hasChildren:false },
        { id: 'admin-6-5', isTitle:false, name:"Cible", route:'/admin/targets', hasChildren:false },
        { id: 'admin-6-6', isTitle:false, name:"Nature de promoteur", route:'/admin/nature-promotors', hasChildren:false },
        { id: 'admin-6-7', isTitle:false, name:"Services", route:'/admin/services', hasChildren:false },
        { id: 'admin-6-8', isTitle:false, name:"Type d'avis", route:'/admin/type-avis', hasChildren:false },
        { id: 'admin-6-9', isTitle:false, name:"Type de sanction", route:'/admin/type-sanctions', hasChildren:false },
        { id: 'admin-6-10', isTitle:false, name:"Type de contrôles", route:'/admin/type-controls', hasChildren:false },
        { id: 'admin-6-11', isTitle:false, name:"Structure", route:'/admin/unite-admins', hasChildren:false }
    ] },
    { id: 'admin-7', isTitle:false, name:"Documents", hasChildren:true, children:[
        { id: 'admin-7-1', isTitle:false, name:"Eléments de fiche de contrôle", route:'/admin/cfes', hasChildren:false },
        { id: 'admin-7-2', isTitle:false, name:"Pièces à fournir", route:'/admin/files', hasChildren:false },
        { id: 'admin-7-3', isTitle:false, name:"Type de documents", route:'/admin/type-files', hasChildren:false }
    ] },
    { id: 'admin-8', isTitle:true, title:"Administration", hasChildren:false },
    { id: 'admin-9', isTitle:false, name:"Gestion des comptes utilisateurs", hasChildren:true, children:[
        { id: 'admin-9-1', isTitle:false, name:"Comptes utilisateurs", route:'/admin/users', hasChildren:false },
        { id: 'admin-9-2', isTitle:false, name:"Rôles", route:'/admin/roles', hasChildren:false },
        { id: 'admin-9-3', isTitle:false, name:"Permissions", route:'/admin/permissions', hasChildren:false },
        { id: 'admin-9-4', isTitle:false, name:"Rôles et Permission", route:'/admin/profiles', hasChildren:false }
    ] },
    { id: 'admin-10', isTitle:false, name:"Maintenances", hasChildren:true, children:[
        { id: 'admin-10-1', isTitle:false, name:"Sauvegardes", route:'/admin/backups', hasChildren:false },
        { id: 'admin-10-2', isTitle:false, name:"Restauration", route:'/admin/backups', hasChildren:false }
    ] },
    { id: 'admin-11', isTitle:false, name:"Support", hasChildren:true, children:[
        { id: 'admin-11-1', isTitle:false, name:"Assistance", route:'/admin/billings', hasChildren:false },
        { id: 'admin-11-2', isTitle:false, name:"Demande d'information", route:'/admin/infos', hasChildren:false },
        { id: 'admin-11-3', isTitle:false, name:"Journal des opérations", route:'/admin/journals', hasChildren:false },
        { id: 'admin-11-4', isTitle:false, name:"Suggestions", route:'/admin/messages', hasChildren:false }
    ] },
];


// ================== MinistreMenu ==================
export const MinistreMenu: menu[] = [
    { id: 'min-1', isTitle:false, name:"Tableau de bord", route:'/admin/dashboard', hasChildren:false },
    { id: 'min-2', isTitle:true, title:"Décision du ministre", hasChildren:false },
    { id: 'min-3', isTitle:false, name:"En attente de décision finale", route:'/admin/request-has-agreements', hasChildren:false },
    { id: 'min-4', isTitle:true, title:"Gestion des rapports", hasChildren:false },
    { id: 'min-5', isTitle:false, name:"Visites de terrain", route:'/admin/follow-cape', hasChildren:false },
    { id: 'min-6', isTitle:false, name:"Recommandations", route:'/admin/referals', hasChildren:false },
    { id: 'min-7', isTitle:false, name:"Rapports d’activité", route:'/admin/activity-report', hasChildren:false },
    { id: 'min-8', isTitle:true, title:"Statistiques", hasChildren:false },
    { id: 'min-9', isTitle:false, name:"CAPE inscrits", route:'/admin/statistiques/cape-inscrits', hasChildren:false },
    { id: 'min-10', isTitle:false, name:"CAPE autorisés", route:'/admin/statistiques/cape-autorises', hasChildren:false },
    { id: 'min-11', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls', hasChildren:false },
    { id: 'min-12', isTitle:true, title:"Recherche", hasChildren:false },
    { id: 'min-13', isTitle:false, name:"CAPE inscrits", route:'/admin/search/cape-inscrits', hasChildren:false },
    { id: 'min-14', isTitle:false, name:"CAPE autorisés", route:'/admin/search/cape-autorises', hasChildren:false }
];

// ================== CapeMenu ==================
export const CapeMenu: menu[] = [
    { id: 'cape-1', isTitle:false, name:"Tableau de bord", route:'/admin/dashboard', hasChildren:false },
    { id: 'cape-2', isTitle:true, title:"Espace CAPE", hasChildren:false },
    { id: 'cape-3', isTitle:false, name:"Personnels", route:'/admin/staff', hasChildren:false },
    { id: 'cape-4', isTitle:false, name:"Pensionnaires", route:'/admin/residents', hasChildren:false },
    { id: 'cape-5', isTitle:false, name:"Recommandations", route:'/admin/referals', hasChildren:false },
    { id: 'cape-6', isTitle:false, name:"Rapport d'activité", route:'/admin/activity-report', hasChildren:false },
    { id: 'cape-7', isTitle:true, title:"Statistiques", hasChildren:false },
    { id: 'cape-8', isTitle:false, name:"CAPE", hasChildren:true, children:[
        { id: 'cape-8-1', isTitle:false, name:"CAPE inscrits", route:'/admin/statistiques/cape-inscrits/cape', hasChildren:false },
        { id: 'cape-8-2', isTitle:false, name:"CAPE autorisés", route:'/admin/statistiques/cape-autorises/cape', hasChildren:false },
        { id: 'cape-8-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/cape', hasChildren:false }
    ] },
    { id: 'cape-9', isTitle:false, name:"Garderie", hasChildren:true, children:[
        { id: 'cape-9-1', isTitle:false, name:"Garderies inscrites", route:'/admin/statistiques/cape-inscrits/garderie', hasChildren:false },
        { id: 'cape-9-2', isTitle:false, name:"Garderies autorisées", route:'/admin/statistiques/cape-autorises/garderie', hasChildren:false },
        { id: 'cape-9-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/garderie', hasChildren:false }
    ] },
    { id: 'cape-10', isTitle:true, title:"Recherche", hasChildren:false },
    { id: 'cape-11', isTitle:false, name:"CAPE", hasChildren:true, children:[
        { id: 'cape-11-1', isTitle:false, name:"CAPE inscrits", route:'/admin/search/cape-inscrits/cape', hasChildren:false },
        { id: 'cape-11-2', isTitle:false, name:"CAPE autorisés", route:'/admin/search/cape-autorises/cape', hasChildren:false }
    ] },
    { id: 'cape-12', isTitle:false, name:"Garderie", hasChildren:true, children:[
        { id: 'cape-12-1', isTitle:false, name:"Garderie inscrites", route:'/admin/search/cape-inscrits/garderie', hasChildren:false },
        { id: 'cape-12-2', isTitle:false, name:"Garderie autorisées", route:'/admin/search/cape-autorises/garderie', hasChildren:false }
    ] }
];

// ================== CpsMenu ==================
export const CpsMenu: menu[] = [
    { id: 'cps-1', isTitle:false, name:"Tableau de bord", route:'/admin/dashboard', hasChildren:false },
    { id: 'cps-2', isTitle:true, title:"Traitement des demandes", hasChildren:false },
    { id: 'cps-3', isTitle:false, name:"A traiter", hasChildren:true, children:[
        { id: 'cps-3-1', isTitle:false, name:"CAPE", route:'/admin/requetes/new/cape', hasChildren:false },
        { id: 'cps-3-2', isTitle:false, name:"Garderie", route:'/admin/requetes/new/garderie', hasChildren:false }
    ] },
    { id: 'cps-4', isTitle:false, name:"Parcours traitement", hasChildren:true, children:[
        { id: 'cps-4-1', isTitle:false, name:"CAPE", route:'/admin/requetes/cape', hasChildren:false },
        { id: 'cps-4-2', isTitle:false, name:"Garderie", route:'/admin/requetes/garderie', hasChildren:false }
    ] },
    { id: 'cps-5', isTitle:true, title:"Gestion des rapports", hasChildren:false },
    { id: 'cps-6', isTitle:false, name:"Visite de terrain", hasChildren:true, children:[
        { id: 'cps-6-1', isTitle:false, name:"CAPE", route:'/admin/follow-cape/cape', hasChildren:false },
        { id: 'cps-6-2', isTitle:false, name:"Garderie", route:'/admin/follow-cape/garderie', hasChildren:false }
    ] },
    { id: 'cps-7', isTitle:false, name:"Recommandations", hasChildren:true, children:[
        { id: 'cps-7-1', isTitle:false, name:"CAPE", route:'/admin/referals/cape', hasChildren:false },
        { id: 'cps-7-2', isTitle:false, name:"Garderie", route:'/admin/referals/garderie', hasChildren:false }
    ] },
    { id: 'cps-8', isTitle:false, name:"Rapports d’activité", hasChildren:true, children:[
        { id: 'cps-8-1', isTitle:false, name:"CAPE", route:'/admin/activity-report/cape', hasChildren:false },
        { id: 'cps-8-2', isTitle:false, name:"Garderie", route:'/admin/activity-report/garderie', hasChildren:false }
    ] },
    { id: 'cps-9', isTitle:true, title:"Statistiques", hasChildren:false },
    { id: 'cps-10', isTitle:false, name:"CAPE", hasChildren:true, children:[
        { id: 'cps-10-1', isTitle:false, name:"CAPE inscrits", route:'/admin/statistiques/cape-inscrits/cape', hasChildren:false },
        { id: 'cps-10-2', isTitle:false, name:"CAPE autorisés", route:'/admin/statistiques/cape-autorises/cape', hasChildren:false },
        { id: 'cps-10-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/cape', hasChildren:false }
    ] },
    { id: 'cps-11', isTitle:false, name:"Garderie", hasChildren:true, children:[
        { id: 'cps-11-1', isTitle:false, name:"Garderies inscrites", route:'/admin/statistiques/cape-inscrits/garderie', hasChildren:false },
        { id: 'cps-11-2', isTitle:false, name:"Garderies autorisées", route:'/admin/statistiques/cape-autorises/garderie', hasChildren:false },
        { id: 'cps-11-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/garderie', hasChildren:false }
    ] },
    { id: 'cps-12', isTitle:true, title:"Recherche", hasChildren:false },
    { id: 'cps-13', isTitle:false, name:"CAPE", hasChildren:true, children:[
        { id: 'cps-13-1', isTitle:false, name:"CAPE inscrits", route:'/admin/search/cape-inscrits/cape', hasChildren:false },
        { id: 'cps-13-2', isTitle:false, name:"CAPE autorisés", route:'/admin/search/cape-autorises/cape', hasChildren:false }
    ] },
    { id: 'cps-14', isTitle:false, name:"Garderie", hasChildren:true, children:[
        { id: 'cps-14-1', isTitle:false, name:"Garderie inscrites", route:'/admin/search/cape-inscrits/garderie', hasChildren:false },
        { id: 'cps-14-2', isTitle:false, name:"Garderie autorisées", route:'/admin/search/cape-autorises/garderie', hasChildren:false }
    ] }
];

// ================== DDASMMenu ==================
export const DDASMMenu: menu[] = [
    { id: 'ddasm-1', isTitle:false, name:"Tableau de bord", route:'/admin/dashboard', hasChildren:false },
    { id: 'ddasm-2', isTitle:true, title:"TRAITEMENT DES DEMANDES", hasChildren:false },
    { id: 'ddasm-3', isTitle:false, name:"A valider", hasChildren:true, children:[
        { id: 'ddasm-3-1', isTitle:false, name:"CAPE", route:'/admin/requetes/new/cape', hasChildren:false },
        { id: 'ddasm-3-2', isTitle:false, name:"Garderie", route:'/admin/requetes/new/garderie', hasChildren:false }
    ] },
    { id: 'ddasm-4', isTitle:false, name:"Parcours traitement", hasChildren:true, children:[
        { id: 'ddasm-4-1', isTitle:false, name:"CAPE", route:'/admin/requetes/cape', hasChildren:false },
        { id: 'ddasm-4-2', isTitle:false, name:"Garderie", route:'/admin/requetes/garderie', hasChildren:false }
    ] },
    { id: 'ddasm-5', isTitle:true, title:"Gestion des rapports", hasChildren:false },
    { id: 'ddasm-6', isTitle:false, name:"Visite de terrain", hasChildren:true, children:[
        { id: 'ddasm-6-1', isTitle:false, name:"CAPE", route:'/admin/follow-cape/cape', hasChildren:false },
        { id: 'ddasm-6-2', isTitle:false, name:"Garderie", route:'/admin/follow-cape/garderie', hasChildren:false }
    ] },
    { id: 'ddasm-7', isTitle:false, name:"Recommandations", hasChildren:true, children:[
        { id: 'ddasm-7-1', isTitle:false, name:"CAPE", route:'/admin/referals/cape', hasChildren:false },
        { id: 'ddasm-7-2', isTitle:false, name:"Garderie", route:'/admin/referals/garderie', hasChildren:false }
    ] },
    { id: 'ddasm-8', isTitle:false, name:"Rapports d’activité", hasChildren:true, children:[
        { id: 'ddasm-8-1', isTitle:false, name:"CAPE", route:'/admin/activity-report/cape', hasChildren:false },
        { id: 'ddasm-8-2', isTitle:false, name:"Garderie", route:'/admin/activity-report/garderie', hasChildren:false }
    ] },
    { id: 'ddasm-9', isTitle:true, title:"Statistiques", hasChildren:false },
    { id: 'ddasm-10', isTitle:false, name:"CAPE", hasChildren:true, children:[
        { id: 'ddasm-10-1', isTitle:false, name:"CAPE inscrits", route:'/admin/statistiques/cape-inscrits/cape', hasChildren:false },
        { id: 'ddasm-10-2', isTitle:false, name:"CAPE autorisés", route:'/admin/statistiques/cape-autorises/cape', hasChildren:false },
        { id: 'ddasm-10-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/cape', hasChildren:false }
    ] },
    { id: 'ddasm-11', isTitle:false, name:"Garderie", hasChildren:true, children:[
        { id: 'ddasm-11-1', isTitle:false, name:"Garderies inscrites", route:'/admin/statistiques/cape-inscrits/garderie', hasChildren:false },
        { id: 'ddasm-11-2', isTitle:false, name:"Garderies autorisées", route:'/admin/statistiques/cape-autorises/garderie', hasChildren:false },
        { id: 'ddasm-11-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/garderie', hasChildren:false }
    ] },
    { id: 'ddasm-12', isTitle:true, title:"Recherche", hasChildren:false },
    { id: 'ddasm-13', isTitle:false, name:"CAPE", hasChildren:true, children:[
        { id: 'ddasm-13-1', isTitle:false, name:"CAPE inscrits", route:'/admin/search/cape-inscrits/cape', hasChildren:false },
        { id: 'ddasm-13-2', isTitle:false, name:"CAPE autorisés", route:'/admin/search/cape-autorises/cape', hasChildren:false }
    ] },
    { id: 'ddasm-14', isTitle:false, name:"Garderie", hasChildren:true, children:[
        { id: 'ddasm-14-1', isTitle:false, name:"Garderie inscrites", route:'/admin/search/cape-inscrits/garderie', hasChildren:false },
        { id: 'ddasm-14-2', isTitle:false, name:"Garderie autorisées", route:'/admin/search/cape-autorises/garderie', hasChildren:false }
    ] }
];

// ================== DFEAMenu ==================
export const DFEAMenu: menu[] = [
    { id: 'dfea-1', isTitle:false, name:"Tableau de bord", route:'/admin/dashboard', hasChildren:false },
    { id: 'dfea-2', isTitle:true, title:"Traitement des demandes", hasChildren:false },
    { id: 'dfea-3', isTitle:false, name:"A valider", hasChildren:true, children:[
        { id: 'dfea-3-1', isTitle:false, name:"CAPE", route:'/admin/requetes/new/cape', hasChildren:false },
        { id: 'dfea-3-2', isTitle:false, name:"Garderie", route:'/admin/requetes/new/garderie', hasChildren:false }
    ] },
    { id: 'dfea-4', isTitle:false, name:"Parcours traitement", hasChildren:true, children:[
        { id: 'dfea-4-1', isTitle:false, name:"CAPE", route:'/admin/requetes/cape', hasChildren:false },
        { id: 'dfea-4-2', isTitle:false, name:"Garderie", route:'/admin/requetes/garderie', hasChildren:false }
    ] },
    { id: 'dfea-5', isTitle:false, name:"Dossiers CAPE à inscrire en session", route:'/admin/requetes/finished/cape', hasChildren:false },
    { id: 'dfea-6', isTitle:false, name:"Dossiers garderie à inscrire en session", route:'/admin/requetes/finished/garderie', hasChildren:false },
    { id: 'dfea-7', isTitle:true, title:"Agréments existants", hasChildren:false },
    { id: 'dfea-8', isTitle:false, name:"Agréments à valider", route:'/admin/requetes-aggrement-validation', hasChildren:false },
    { id: 'dfea-9', isTitle:true, title:"Gestion des sessions", hasChildren:false },
    { id: 'dfea-10', isTitle:false, name:"Création de session", route:'/admin/sessions', hasChildren:false },
    { id: 'dfea-11', isTitle:false, name:"Création des membres", route:'/admin/members', hasChildren:false },
    { id: 'dfea-12', isTitle:true, title:"Gestion des sanctions", hasChildren:false },
    { id: 'dfea-13', isTitle:false, name:"Sanctions", route:'/admin/sanctions', hasChildren:false },
    { id: 'dfea-14', isTitle:true, title:"Gestion des rapports", hasChildren:false },
    { id: 'dfea-15', isTitle:false, name:"Visite de terrain", hasChildren:true, children:[
        { id: 'dfea-15-1', isTitle:false, name:"CAPE", route:'/admin/follow-cape/cape', hasChildren:false },
        { id: 'dfea-15-2', isTitle:false, name:"Garderie", route:'/admin/follow-cape/garderie', hasChildren:false }
    ] },
    { id: 'dfea-16', isTitle:false, name:"Recommandations", hasChildren:true, children:[
        { id: 'dfea-16-1', isTitle:false, name:"CAPE", route:'/admin/referals/cape', hasChildren:false },
        { id: 'dfea-16-2', isTitle:false, name:"Garderie", route:'/admin/referals/garderie', hasChildren:false }
    ] },
    { id: 'dfea-17', isTitle:false, name:"Rapports d’activité", hasChildren:true, children:[
        { id: 'dfea-17-1', isTitle:false, name:"CAPE", route:'/admin/activity-report/cape', hasChildren:false },
        { id: 'dfea-17-2', isTitle:false, name:"Garderie", route:'/admin/activity-report/garderie', hasChildren:false }
    ] },
    { id: 'dfea-18', isTitle:true, title:"Statistiques", hasChildren:false },
    { id: 'dfea-19', isTitle:false, name:"CAPE", hasChildren:true, children:[
        { id: 'dfea-19-1', isTitle:false, name:"CAPE inscrits", route:'/admin/statistiques/cape-inscrits/cape', hasChildren:false },
        { id: 'dfea-19-2', isTitle:false, name:"CAPE autorisés", route:'/admin/statistiques/cape-autorises/cape', hasChildren:false },
        { id: 'dfea-19-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/cape', hasChildren:false }
    ] },
    { id: 'dfea-20', isTitle:false, name:"Garderie", hasChildren:true, children:[
        { id: 'dfea-20-1', isTitle:false, name:"Garderies inscrites", route:'/admin/statistiques/cape-inscrits/garderie', hasChildren:false },
        { id: 'dfea-20-2', isTitle:false, name:"Garderies autorisées", route:'/admin/statistiques/cape-autorises/garderie', hasChildren:false },
        { id: 'dfea-20-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/garderie', hasChildren:false }
    ] },
    { id: 'dfea-21', isTitle:true, title:"Recherche", hasChildren:false },
    { id: 'dfea-22', isTitle:false, name:"CAPE", hasChildren:true, children:[
        { id: 'dfea-22-1', isTitle:false, name:"CAPE inscrits", route:'/admin/search/cape-inscrits/cape', hasChildren:false },
        { id: 'dfea-22-2', isTitle:false, name:"CAPE autorisés", route:'/admin/search/cape-autorises/cape', hasChildren:false }
    ] },
    { id: 'dfea-23', isTitle:false, name:"Garderie", hasChildren:true, children:[
        { id: 'dfea-23-1', isTitle:false, name:"Garderie inscrites", route:'/admin/search/cape-inscrits/garderie', hasChildren:false },
        { id: 'dfea-23-2', isTitle:false, name:"Garderie autorisées", route:'/admin/search/cape-autorises/garderie', hasChildren:false }
    ] }
];

// ================== MemberMenu ==================
export const MemberMenu: menu[] = [
    { id: 'member-1', isTitle:false, name:"Tableau de bord", route:'/admin/dashboard', hasChildren:false },
    { id: 'member-2', isTitle:true, title:"Gestion des sessions", hasChildren:false },
    { id: 'member-3', isTitle:false, name:"Sessions en cours", route:'/admin/sessions', hasChildren:false },
    { id: 'member-4', isTitle:false, name:"Création des membres", route:'/admin/members', hasChildren:false },
    { id: 'member-5', isTitle:true, title:"Gestion des sanctions", hasChildren:false },
    { id: 'member-6', isTitle:false, name:"Sanctions", route:'/admin/sanctions', hasChildren:false },
    { id: 'member-7', isTitle:true, title:"Rapports", hasChildren:false },
    { id: 'member-8', isTitle:false, name:"Rapports d’activité", route:'/admin/activity-report', hasChildren:false }
];

// ================== ServiceMenu ==================
export const ServiceMenu: menu[] = [
    { id: 'service-1', isTitle:false, name:"Tableau de bord", route:'/admin/dashboard', hasChildren:false },

    { id: 'service-2', isTitle:true, title:"Gestion des sessions", hasChildren:false },
    { id: 'service-3', isTitle:false, name:"Création de session", route:'/admin/sessions', hasChildren:false },
    { id: 'service-4', isTitle:false, name:"Création des membres", route:'/admin/members', hasChildren:false },

    { id: 'service-5', isTitle:true, title:"Statistiques", hasChildren:false },
    { id: 'service-6', isTitle:false, name:"CAPE", hasChildren:true, children:[
        { id: 'service-6-1', isTitle:false, name:"CAPE inscrits", route:'/admin/statistiques/cape-inscrits/cape', hasChildren:false },
        { id: 'service-6-2', isTitle:false, name:"CAPE autorisés", route:'/admin/statistiques/cape-autorises/cape', hasChildren:false },
        { id: 'service-6-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/cape', hasChildren:false },
    ] },
    { id: 'service-7', isTitle:false, name:"Garderie", hasChildren:true, children:[
        { id: 'service-7-1', isTitle:false, name:"Garderies inscrites", route:'/admin/statistiques/cape-inscrits/garderie', hasChildren:false },
        { id: 'service-7-2', isTitle:false, name:"Garderies autorisées", route:'/admin/statistiques/cape-autorises/garderie', hasChildren:false },
        { id: 'service-7-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/garderie', hasChildren:false },
    ] },

    { id: 'service-8', isTitle:true, title:"Recherche", hasChildren:false },
    { id: 'service-9', isTitle:false, name:"CAPE", hasChildren:true, children:[
        { id: 'service-9-1', isTitle:false, name:"CAPE inscrits", route:'/admin/search/cape-inscrits/cape', hasChildren:false },
        { id: 'service-9-2', isTitle:false, name:"CAPE autorisés", route:'/admin/search/cape-autorises/cape', hasChildren:false },
    ] },
    { id: 'service-10', isTitle:false, name:"Garderie", hasChildren:true, children:[
        { id: 'service-10-1', isTitle:false, name:"Garderie inscrites", route:'/admin/search/cape-inscrits/garderie', hasChildren:false },
        { id: 'service-10-2', isTitle:false, name:"Garderie autorisées", route:'/admin/search/cape-autorises/garderie', hasChildren:false },
    ] }
];


// ================== ErrorMenu ==================
export const ErrorMenu: menu[] = [
    { id: 'error-1', isTitle:false, name:"Erreur 403", route:'/admin/403', hasChildren:false },
    { id: 'error-2', isTitle:false, name:"Erreur 404", route:'/admin/404', hasChildren:false },
    { id: 'error-3', isTitle:false, name:"Erreur 500", route:'/admin/500', hasChildren:false }
];

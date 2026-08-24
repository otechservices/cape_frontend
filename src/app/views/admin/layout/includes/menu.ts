export interface menu {
    id: string;
    isTitle: boolean;
    hasChildren: boolean;
    title?: string;
    name?: string;
    route?: string;
    icon?: string;
    children?: menu[];
}

// ================== AdminMenu ==================
export const AdminMenu: menu[] = [
    { id: 'admin-1', isTitle: false, name:"Tableau de bord", route:'/admin/dashboard', icon:'ri-dashboard-line', hasChildren:false },
    { id: 'admin-2', isTitle:true, title:"Actualité", hasChildren:false },
    { id: 'admin-3', isTitle:false, name:"Toutes les actualités", route:'/admin/actualities', icon:'ri-newspaper-line', hasChildren:false },
    { id: 'admin-4', isTitle:true, title:"Configuration", hasChildren:false },
    { id: 'admin-5', isTitle:false, name:"Localisation", icon:'ri-map-pin-line', hasChildren:true, children:[
        { id: 'admin-5-1', isTitle:false, name:"Départements", route:'/admin/departments', icon:'ri-map-2-line', hasChildren:false },
        { id: 'admin-5-2', isTitle:false, name:"Communes", route:'/admin/municipalities', icon:'ri-building-2-line', hasChildren:false },
        { id: 'admin-5-3', isTitle:false, name:"Arrondissements", route:'/admin/districts', icon:'ri-map-line', hasChildren:false },
        { id: 'admin-5-4', isTitle:true, title:"Centres sociaux", hasChildren:false },
        { id: 'admin-5-5', isTitle:false, name:"CPS", route:'/admin/cps', icon:'ri-hospital-line', hasChildren:false },
        { id: 'admin-5-6', isTitle:false, name:"CAPE autorisés", route:'/admin/list-requetes/cape', icon:'ri-verified-badge-line', hasChildren:false },
        { id: 'admin-5-7', isTitle:false, name:"CAPE Inscrits", route:'/admin/list-requetes/garderie', icon:'ri-user-star-line', hasChildren:false }
    ] },
    { id: 'admin-5-b', isTitle:false, name:"Recherche & export", route:'/admin/export-dossiers', icon:'ri-file-excel-2-line', hasChildren:false },
    { id: 'admin-6', isTitle:false, name:"Typologie", icon:'ri-list-settings-line', hasChildren:true, children:[
        { id: 'admin-6-1', isTitle:false, name:"Type Cape", route:'/admin/type-capes', icon:'ri-price-tag-3-line', hasChildren:false },
        { id: 'admin-6-2', isTitle:false, name:"Type Garderie", route:'/admin/type-garderies', icon:'ri-price-tag-line', hasChildren:false },
        { id: 'admin-6-3', isTitle:false, name:"Type assistance", route:'/admin/type-billings', icon:'ri-handbag-line', hasChildren:false },
        { id: 'admin-6-4', isTitle:false, name:"Type Info", route:'/admin/type-infos', icon:'ri-information-line', hasChildren:false },
        { id: 'admin-6-5', isTitle:false, name:"Cible", route:'/admin/targets', icon:'ri-focus-3-line', hasChildren:false },
        { id: 'admin-6-6', isTitle:false, name:"Nature de promoteur", route:'/admin/nature-promotors', icon:'ri-user-2-line', hasChildren:false },
        { id: 'admin-6-7', isTitle:false, name:"Services", route:'/admin/services', icon:'ri-service-line', hasChildren:false },
        { id: 'admin-6-8', isTitle:false, name:"Type d'avis", route:'/admin/type-avis', icon:'ri-chat-check-line', hasChildren:false },
        { id: 'admin-6-9', isTitle:false, name:"Type de sanction", route:'/admin/type-sanctions', icon:'ri-error-warning-line', hasChildren:false },
        { id: 'admin-6-10', isTitle:false, name:"Type de contrôles", route:'/admin/type-controls', icon:'ri-checkbox-circle-line', hasChildren:false },
        { id: 'admin-6-11', isTitle:false, name:"Structure", route:'/admin/unite-admins', icon:'ri-organization-chart', hasChildren:false }
    ] },
    { id: 'admin-7', isTitle:false, name:"Documents", icon:'ri-file-list-3-line', hasChildren:true, children:[
        { id: 'admin-7-1', isTitle:false, name:"Eléments de fiche de contrôle", route:'/admin/cfes', icon:'ri-file-search-line', hasChildren:false },
        { id: 'admin-7-2', isTitle:false, name:"Pièces à fournir", route:'/admin/files', icon:'ri-attachment-line', hasChildren:false },
        { id: 'admin-7-3', isTitle:false, name:"Type de documents", route:'/admin/type-files', icon:'ri-file-type-line', hasChildren:false }
    ] },
    { id: 'admin-8', isTitle:true, title:"Administration", hasChildren:false },
    { id: 'admin-9', isTitle:false, name:"Comptes utilisateurs", icon:'ri-user-settings-line', hasChildren:true, children:[
        { id: 'admin-9-1', isTitle:false, name:"Comptes utilisateurs", route:'/admin/users', icon:'ri-user-line', hasChildren:false },
        { id: 'admin-9-2', isTitle:false, name:"Rôles", route:'/admin/roles', icon:'ri-shield-user-line', hasChildren:false },
        { id: 'admin-9-3', isTitle:false, name:"Permissions", route:'/admin/permissions', icon:'ri-key-line', hasChildren:false },
        { id: 'admin-9-4', isTitle:false, name:"Rôles et Permission", route:'/admin/profiles', icon:'ri-shield-keyhole-line', hasChildren:false }
    ] },
    { id: 'admin-10', isTitle:false, name:"Maintenances", icon:'ri-tools-line', hasChildren:true, children:[
        { id: 'admin-10-1', isTitle:false, name:"Sauvegardes", route:'/admin/backups', icon:'ri-save-line', hasChildren:false },
        { id: 'admin-10-2', isTitle:false, name:"Restauration", route:'/admin/backups', icon:'ri-refresh-line', hasChildren:false }
    ] },
    { id: 'admin-11', isTitle:false, name:"Support", icon:'ri-customer-service-2-line', hasChildren:true, children:[
        { id: 'admin-11-1', isTitle:false, name:"Assistance", route:'/admin/billings', icon:'ri-questionnaire-line', hasChildren:false },
        { id: 'admin-11-2', isTitle:false, name:"Demande d'information", route:'/admin/infos', icon:'ri-mail-open-line', hasChildren:false },
        { id: 'admin-11-3', isTitle:false, name:"Journal des opérations", route:'/admin/journals', icon:'ri-history-line', hasChildren:false },
        { id: 'admin-11-4', isTitle:false, name:"Suggestions", route:'/admin/messages', icon:'ri-discuss-line', hasChildren:false }
    ] },
];


// ================== MinistreMenu ==================
export const MinistreMenu: menu[] = [
    { id: 'min-1', isTitle:false, name:"Tableau de bord", route:'/admin/dashboard', icon:'ri-dashboard-line', hasChildren:false },
    { id: 'min-2', isTitle:true, title:"Décision du ministre", hasChildren:false },
    { id: 'min-3', isTitle:false, name:"En attente de décision finale", route:'/admin/request-has-agreements', icon:'ri-time-line', hasChildren:false },
    { id: 'min-4', isTitle:true, title:"Gestion des rapports", hasChildren:false },
    { id: 'min-5', isTitle:false, name:"Visites de terrain", route:'/admin/follow-cape', icon:'ri-map-search-line', hasChildren:false },
    { id: 'min-6', isTitle:false, name:"Recommandations", route:'/admin/referals', icon:'ri-thumb-up-line', hasChildren:false },
    { id: 'min-7', isTitle:false, name:"Rapports d'activité", route:'/admin/activity-report', icon:'ri-file-chart-line', hasChildren:false },
    { id: 'min-8', isTitle:true, title:"Statistiques", hasChildren:false },
    { id: 'min-9', isTitle:false, name:"CAPE inscrits", route:'/admin/statistiques/cape-inscrits', icon:'ri-bar-chart-grouped-line', hasChildren:false },
    { id: 'min-10', isTitle:false, name:"CAPE autorisés", route:'/admin/statistiques/cape-autorises', icon:'ri-bar-chart-line', hasChildren:false },
    { id: 'min-11', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls', icon:'ri-bar-chart-2-line', hasChildren:false },
    { id: 'min-12', isTitle:true, title:"Recherche", hasChildren:false },
    { id: 'min-13', isTitle:false, name:"CAPE inscrits", route:'/admin/search/cape-inscrits', icon:'ri-search-line', hasChildren:false },
    { id: 'min-14', isTitle:false, name:"CAPE autorisés", route:'/admin/search/cape-autorises', icon:'ri-search-2-line', hasChildren:false },
    { id: 'min-15', isTitle:false, name:"Recherche & export", route:'/admin/export-dossiers', icon:'ri-file-excel-2-line', hasChildren:false }
];

// ================== CapeMenu ==================
export const CapeMenu: menu[] = [
    { id: 'cape-1', isTitle:false, name:"Tableau de bord", route:'/admin/dashboard', icon:'ri-dashboard-line', hasChildren:false },
    { id: 'cape-2', isTitle:true, title:"Espace CAPE", hasChildren:false },
    { id: 'cape-3', isTitle:false, name:"Personnels", route:'/admin/staff', icon:'ri-team-line', hasChildren:false },
    { id: 'cape-4', isTitle:false, name:"Pensionnaires", route:'/admin/residents', icon:'ri-user-heart-line', hasChildren:false },
    { id: 'cape-5', isTitle:false, name:"Recommandations", route:'/admin/referals', icon:'ri-thumb-up-line', hasChildren:false },
    { id: 'cape-6', isTitle:false, name:"Rapport d'activité", route:'/admin/activity-report', icon:'ri-file-chart-line', hasChildren:false },
    { id: 'cape-7', isTitle:true, title:"Statistiques", hasChildren:false },
    { id: 'cape-8', isTitle:false, name:"CAPE", icon:'ri-bar-chart-line', hasChildren:true, children:[
        { id: 'cape-8-1', isTitle:false, name:"CAPE inscrits", route:'/admin/statistiques/cape-inscrits/cape', icon:'ri-bar-chart-grouped-line', hasChildren:false },
        { id: 'cape-8-2', isTitle:false, name:"CAPE autorisés", route:'/admin/statistiques/cape-autorises/cape', icon:'ri-bar-chart-2-line', hasChildren:false },
        { id: 'cape-8-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/cape', icon:'ri-map-search-line', hasChildren:false }
    ] },
    { id: 'cape-9', isTitle:false, name:"Garderie", icon:'ri-bar-chart-box-line', hasChildren:true, children:[
        { id: 'cape-9-1', isTitle:false, name:"Garderies inscrites", route:'/admin/statistiques/cape-inscrits/garderie', icon:'ri-bar-chart-grouped-line', hasChildren:false },
        { id: 'cape-9-2', isTitle:false, name:"Garderies autorisées", route:'/admin/statistiques/cape-autorises/garderie', icon:'ri-bar-chart-2-line', hasChildren:false },
        { id: 'cape-9-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/garderie', icon:'ri-map-search-line', hasChildren:false }
    ] },
    { id: 'cape-10', isTitle:true, title:"Recherche", hasChildren:false },
    { id: 'cape-11', isTitle:false, name:"CAPE", icon:'ri-search-line', hasChildren:true, children:[
        { id: 'cape-11-1', isTitle:false, name:"CAPE inscrits", route:'/admin/search/cape-inscrits/cape', icon:'ri-search-line', hasChildren:false },
        { id: 'cape-11-2', isTitle:false, name:"CAPE autorisés", route:'/admin/search/cape-autorises/cape', icon:'ri-search-2-line', hasChildren:false }
    ] },
    { id: 'cape-12', isTitle:false, name:"Garderie", icon:'ri-search-eye-line', hasChildren:true, children:[
        { id: 'cape-12-1', isTitle:false, name:"Garderie inscrites", route:'/admin/search/cape-inscrits/garderie', icon:'ri-search-line', hasChildren:false },
        { id: 'cape-12-2', isTitle:false, name:"Garderie autorisées", route:'/admin/search/cape-autorises/garderie', icon:'ri-search-2-line', hasChildren:false }
    ] }
];

// ================== CpsMenu ==================
export const CpsMenu: menu[] = [
    { id: 'cps-1', isTitle:false, name:"Tableau de bord", route:'/admin/dashboard', icon:'ri-dashboard-line', hasChildren:false },
    { id: 'cps-2', isTitle:true, title:"Traitement des demandes", hasChildren:false },
    { id: 'cps-3', isTitle:false, name:"A traiter", icon:'ri-inbox-line', hasChildren:true, children:[
        { id: 'cps-3-1', isTitle:false, name:"CAPE", route:'/admin/requetes/new/cape', icon:'ri-file-add-line', hasChildren:false },
        { id: 'cps-3-2', isTitle:false, name:"Garderie", route:'/admin/requetes/new/garderie', icon:'ri-file-add-line', hasChildren:false }
    ] },
    { id: 'cps-4', isTitle:false, name:"Parcours traitement", icon:'ri-route-line', hasChildren:true, children:[
        { id: 'cps-4-1', isTitle:false, name:"CAPE", route:'/admin/requetes/cape', icon:'ri-file-list-2-line', hasChildren:false },
        { id: 'cps-4-2', isTitle:false, name:"Garderie", route:'/admin/requetes/garderie', icon:'ri-file-list-2-line', hasChildren:false }
    ] },
    { id: 'cps-5', isTitle:true, title:"Gestion des rapports", hasChildren:false },
    { id: 'cps-6', isTitle:false, name:"Visite de terrain", icon:'ri-map-search-line', hasChildren:true, children:[
        { id: 'cps-6-1', isTitle:false, name:"CAPE", route:'/admin/follow-cape/cape', icon:'ri-map-pin-user-line', hasChildren:false },
        { id: 'cps-6-2', isTitle:false, name:"Garderie", route:'/admin/follow-cape/garderie', icon:'ri-map-pin-user-line', hasChildren:false }
    ] },
    { id: 'cps-7', isTitle:false, name:"Recommandations", icon:'ri-thumb-up-line', hasChildren:true, children:[
        { id: 'cps-7-1', isTitle:false, name:"CAPE", route:'/admin/referals/cape', icon:'ri-chat-check-line', hasChildren:false },
        { id: 'cps-7-2', isTitle:false, name:"Garderie", route:'/admin/referals/garderie', icon:'ri-chat-check-line', hasChildren:false }
    ] },
    { id: 'cps-8', isTitle:false, name:"Rapports d'activité", icon:'ri-file-chart-line', hasChildren:true, children:[
        { id: 'cps-8-1', isTitle:false, name:"CAPE", route:'/admin/activity-report/cape', icon:'ri-file-chart-2-line', hasChildren:false },
        { id: 'cps-8-2', isTitle:false, name:"Garderie", route:'/admin/activity-report/garderie', icon:'ri-file-chart-2-line', hasChildren:false }
    ] },
    { id: 'cps-9', isTitle:true, title:"Statistiques", hasChildren:false },
    { id: 'cps-10', isTitle:false, name:"CAPE", icon:'ri-bar-chart-line', hasChildren:true, children:[
        { id: 'cps-10-1', isTitle:false, name:"CAPE inscrits", route:'/admin/statistiques/cape-inscrits/cape', icon:'ri-bar-chart-grouped-line', hasChildren:false },
        { id: 'cps-10-2', isTitle:false, name:"CAPE autorisés", route:'/admin/statistiques/cape-autorises/cape', icon:'ri-bar-chart-2-line', hasChildren:false },
        { id: 'cps-10-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/cape', icon:'ri-map-search-line', hasChildren:false }
    ] },
    { id: 'cps-11', isTitle:false, name:"Garderie", icon:'ri-bar-chart-box-line', hasChildren:true, children:[
        { id: 'cps-11-1', isTitle:false, name:"Garderies inscrites", route:'/admin/statistiques/cape-inscrits/garderie', icon:'ri-bar-chart-grouped-line', hasChildren:false },
        { id: 'cps-11-2', isTitle:false, name:"Garderies autorisées", route:'/admin/statistiques/cape-autorises/garderie', icon:'ri-bar-chart-2-line', hasChildren:false },
        { id: 'cps-11-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/garderie', icon:'ri-map-search-line', hasChildren:false }
    ] },
    { id: 'cps-12', isTitle:true, title:"Recherche", hasChildren:false },
    { id: 'cps-13', isTitle:false, name:"CAPE", icon:'ri-search-line', hasChildren:true, children:[
        { id: 'cps-13-1', isTitle:false, name:"CAPE inscrits", route:'/admin/search/cape-inscrits/cape', icon:'ri-search-line', hasChildren:false },
        { id: 'cps-13-2', isTitle:false, name:"CAPE autorisés", route:'/admin/search/cape-autorises/cape', icon:'ri-search-2-line', hasChildren:false }
    ] },
    { id: 'cps-14', isTitle:false, name:"Garderie", icon:'ri-search-eye-line', hasChildren:true, children:[
        { id: 'cps-14-1', isTitle:false, name:"Garderie inscrites", route:'/admin/search/cape-inscrits/garderie', icon:'ri-search-line', hasChildren:false },
        { id: 'cps-14-2', isTitle:false, name:"Garderie autorisées", route:'/admin/search/cape-autorises/garderie', icon:'ri-search-2-line', hasChildren:false }
    ] }
];

// ================== DDASMMenu ==================
export const DDASMMenu: menu[] = [
    { id: 'ddasm-1', isTitle:false, name:"Tableau de bord", route:'/admin/dashboard', icon:'ri-dashboard-line', hasChildren:false },
    { id: 'ddasm-2', isTitle:true, title:"Traitement des demandes", hasChildren:false },
    { id: 'ddasm-3', isTitle:false, name:"A valider", icon:'ri-checkbox-circle-line', hasChildren:true, children:[
        { id: 'ddasm-3-1', isTitle:false, name:"CAPE", route:'/admin/requetes/new/cape', icon:'ri-file-add-line', hasChildren:false },
        { id: 'ddasm-3-2', isTitle:false, name:"Garderie", route:'/admin/requetes/new/garderie', icon:'ri-file-add-line', hasChildren:false }
    ] },
    { id: 'ddasm-4', isTitle:false, name:"Parcours traitement", icon:'ri-route-line', hasChildren:true, children:[
        { id: 'ddasm-4-1', isTitle:false, name:"CAPE", route:'/admin/requetes/cape', icon:'ri-file-list-2-line', hasChildren:false },
        { id: 'ddasm-4-2', isTitle:false, name:"Garderie", route:'/admin/requetes/garderie', icon:'ri-file-list-2-line', hasChildren:false }
    ] },
    { id: 'ddasm-5', isTitle:true, title:"Gestion des rapports", hasChildren:false },
    { id: 'ddasm-6', isTitle:false, name:"Visite de terrain", icon:'ri-map-search-line', hasChildren:true, children:[
        { id: 'ddasm-6-1', isTitle:false, name:"CAPE", route:'/admin/follow-cape/cape', icon:'ri-map-pin-user-line', hasChildren:false },
        { id: 'ddasm-6-2', isTitle:false, name:"Garderie", route:'/admin/follow-cape/garderie', icon:'ri-map-pin-user-line', hasChildren:false }
    ] },
    { id: 'ddasm-7', isTitle:false, name:"Recommandations", icon:'ri-thumb-up-line', hasChildren:true, children:[
        { id: 'ddasm-7-1', isTitle:false, name:"CAPE", route:'/admin/referals/cape', icon:'ri-chat-check-line', hasChildren:false },
        { id: 'ddasm-7-2', isTitle:false, name:"Garderie", route:'/admin/referals/garderie', icon:'ri-chat-check-line', hasChildren:false }
    ] },
    { id: 'ddasm-8', isTitle:false, name:"Rapports d'activité", icon:'ri-file-chart-line', hasChildren:true, children:[
        { id: 'ddasm-8-1', isTitle:false, name:"CAPE", route:'/admin/activity-report/cape', icon:'ri-file-chart-2-line', hasChildren:false },
        { id: 'ddasm-8-2', isTitle:false, name:"Garderie", route:'/admin/activity-report/garderie', icon:'ri-file-chart-2-line', hasChildren:false }
    ] },
    { id: 'ddasm-9', isTitle:true, title:"Statistiques", hasChildren:false },
    { id: 'ddasm-10', isTitle:false, name:"CAPE", icon:'ri-bar-chart-line', hasChildren:true, children:[
        { id: 'ddasm-10-1', isTitle:false, name:"CAPE inscrits", route:'/admin/statistiques/cape-inscrits/cape', icon:'ri-bar-chart-grouped-line', hasChildren:false },
        { id: 'ddasm-10-2', isTitle:false, name:"CAPE autorisés", route:'/admin/statistiques/cape-autorises/cape', icon:'ri-bar-chart-2-line', hasChildren:false },
        { id: 'ddasm-10-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/cape', icon:'ri-map-search-line', hasChildren:false }
    ] },
    { id: 'ddasm-11', isTitle:false, name:"Garderie", icon:'ri-bar-chart-box-line', hasChildren:true, children:[
        { id: 'ddasm-11-1', isTitle:false, name:"Garderies inscrites", route:'/admin/statistiques/cape-inscrits/garderie', icon:'ri-bar-chart-grouped-line', hasChildren:false },
        { id: 'ddasm-11-2', isTitle:false, name:"Garderies autorisées", route:'/admin/statistiques/cape-autorises/garderie', icon:'ri-bar-chart-2-line', hasChildren:false },
        { id: 'ddasm-11-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/garderie', icon:'ri-map-search-line', hasChildren:false }
    ] },
    { id: 'ddasm-12', isTitle:true, title:"Recherche", hasChildren:false },
    { id: 'ddasm-13', isTitle:false, name:"CAPE", icon:'ri-search-line', hasChildren:true, children:[
        { id: 'ddasm-13-1', isTitle:false, name:"CAPE inscrits", route:'/admin/search/cape-inscrits/cape', icon:'ri-search-line', hasChildren:false },
        { id: 'ddasm-13-2', isTitle:false, name:"CAPE autorisés", route:'/admin/search/cape-autorises/cape', icon:'ri-search-2-line', hasChildren:false }
    ] },
    { id: 'ddasm-14', isTitle:false, name:"Garderie", icon:'ri-search-eye-line', hasChildren:true, children:[
        { id: 'ddasm-14-1', isTitle:false, name:"Garderie inscrites", route:'/admin/search/cape-inscrits/garderie', icon:'ri-search-line', hasChildren:false },
        { id: 'ddasm-14-2', isTitle:false, name:"Garderie autorisées", route:'/admin/search/cape-autorises/garderie', icon:'ri-search-2-line', hasChildren:false }
    ] }
];

// ================== DFEAMenu ==================
export const DFEAMenu: menu[] = [
    { id: 'dfea-1', isTitle:false, name:"Tableau de bord", route:'/admin/dashboard', icon:'ri-dashboard-line', hasChildren:false },
    { id: 'dfea-2', isTitle:true, title:"Traitement des demandes", hasChildren:false },
    { id: 'dfea-3', isTitle:false, name:"A valider", icon:'ri-checkbox-circle-line', hasChildren:true, children:[
        { id: 'dfea-3-1', isTitle:false, name:"CAPE", route:'/admin/requetes/new/cape', icon:'ri-file-add-line', hasChildren:false },
        { id: 'dfea-3-2', isTitle:false, name:"Garderie", route:'/admin/requetes/new/garderie', icon:'ri-file-add-line', hasChildren:false }
    ] },
    { id: 'dfea-4', isTitle:false, name:"Parcours traitement", icon:'ri-route-line', hasChildren:true, children:[
        { id: 'dfea-4-1', isTitle:false, name:"CAPE", route:'/admin/requetes/cape', icon:'ri-file-list-2-line', hasChildren:false },
        { id: 'dfea-4-2', isTitle:false, name:"Garderie", route:'/admin/requetes/garderie', icon:'ri-file-list-2-line', hasChildren:false }
    ] },
    { id: 'dfea-5', isTitle:false, name:"Dossiers CAPE à inscrire en session", route:'/admin/requetes/finished/cape', icon:'ri-folder-upload-line', hasChildren:false },
    { id: 'dfea-6', isTitle:false, name:"Dossiers garderie à inscrire en session", route:'/admin/requetes/finished/garderie', icon:'ri-folder-upload-line', hasChildren:false },
    { id: 'dfea-7', isTitle:true, title:"Agréments existants", hasChildren:false },
    { id: 'dfea-8', isTitle:false, name:"Agréments à valider", route:'/admin/requetes-aggrement-validation', icon:'ri-award-line', hasChildren:false },
    { id: 'dfea-8-2', isTitle:false, name:"Agréments hors plateforme", route:'/admin/agrements-existants', icon:'ri-shield-check-line', hasChildren:false },
    { id: 'dfea-8-1', isTitle:false, name:"Recherche & export", route:'/admin/export-dossiers', icon:'ri-file-excel-2-line', hasChildren:false },
    { id: 'dfea-9', isTitle:true, title:"Gestion des sessions", hasChildren:false },
    { id: 'dfea-10', isTitle:false, name:"Création de session", route:'/admin/sessions', icon:'ri-calendar-event-line', hasChildren:false },
    { id: 'dfea-11', isTitle:false, name:"Création des membres", route:'/admin/members', icon:'ri-user-add-line', hasChildren:false },
    { id: 'dfea-12', isTitle:true, title:"Gestion des sanctions", hasChildren:false },
    { id: 'dfea-13', isTitle:false, name:"Sanctions", route:'/admin/sanctions', icon:'ri-scales-line', hasChildren:false },
    { id: 'dfea-14', isTitle:true, title:"Gestion des rapports", hasChildren:false },
    { id: 'dfea-15', isTitle:false, name:"Visite de terrain", icon:'ri-map-search-line', hasChildren:true, children:[
        { id: 'dfea-15-1', isTitle:false, name:"CAPE", route:'/admin/follow-cape/cape', icon:'ri-map-pin-user-line', hasChildren:false },
        { id: 'dfea-15-2', isTitle:false, name:"Garderie", route:'/admin/follow-cape/garderie', icon:'ri-map-pin-user-line', hasChildren:false }
    ] },
    { id: 'dfea-16', isTitle:false, name:"Recommandations", icon:'ri-thumb-up-line', hasChildren:true, children:[
        { id: 'dfea-16-1', isTitle:false, name:"CAPE", route:'/admin/referals/cape', icon:'ri-chat-check-line', hasChildren:false },
        { id: 'dfea-16-2', isTitle:false, name:"Garderie", route:'/admin/referals/garderie', icon:'ri-chat-check-line', hasChildren:false }
    ] },
    { id: 'dfea-17', isTitle:false, name:"Rapports d'activité", icon:'ri-file-chart-line', hasChildren:true, children:[
        { id: 'dfea-17-1', isTitle:false, name:"CAPE", route:'/admin/activity-report/cape', icon:'ri-file-chart-2-line', hasChildren:false },
        { id: 'dfea-17-2', isTitle:false, name:"Garderie", route:'/admin/activity-report/garderie', icon:'ri-file-chart-2-line', hasChildren:false }
    ] },
    { id: 'dfea-18', isTitle:true, title:"Statistiques", hasChildren:false },
    { id: 'dfea-19', isTitle:false, name:"CAPE", icon:'ri-bar-chart-line', hasChildren:true, children:[
        { id: 'dfea-19-1', isTitle:false, name:"CAPE inscrits", route:'/admin/statistiques/cape-inscrits/cape', icon:'ri-bar-chart-grouped-line', hasChildren:false },
        { id: 'dfea-19-2', isTitle:false, name:"CAPE autorisés", route:'/admin/statistiques/cape-autorises/cape', icon:'ri-bar-chart-2-line', hasChildren:false },
        { id: 'dfea-19-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/cape', icon:'ri-map-search-line', hasChildren:false }
    ] },
    { id: 'dfea-20', isTitle:false, name:"Garderie", icon:'ri-bar-chart-box-line', hasChildren:true, children:[
        { id: 'dfea-20-1', isTitle:false, name:"Garderies inscrites", route:'/admin/statistiques/cape-inscrits/garderie', icon:'ri-bar-chart-grouped-line', hasChildren:false },
        { id: 'dfea-20-2', isTitle:false, name:"Garderies autorisées", route:'/admin/statistiques/cape-autorises/garderie', icon:'ri-bar-chart-2-line', hasChildren:false },
        { id: 'dfea-20-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/garderie', icon:'ri-map-search-line', hasChildren:false }
    ] },
    { id: 'dfea-21', isTitle:true, title:"Recherche", hasChildren:false },
    { id: 'dfea-22', isTitle:false, name:"CAPE", icon:'ri-search-line', hasChildren:true, children:[
        { id: 'dfea-22-1', isTitle:false, name:"CAPE inscrits", route:'/admin/search/cape-inscrits/cape', icon:'ri-search-line', hasChildren:false },
        { id: 'dfea-22-2', isTitle:false, name:"CAPE autorisés", route:'/admin/search/cape-autorises/cape', icon:'ri-search-2-line', hasChildren:false }
    ] },
    { id: 'dfea-23', isTitle:false, name:"Garderie", icon:'ri-search-eye-line', hasChildren:true, children:[
        { id: 'dfea-23-1', isTitle:false, name:"Garderie inscrites", route:'/admin/search/cape-inscrits/garderie', icon:'ri-search-line', hasChildren:false },
        { id: 'dfea-23-2', isTitle:false, name:"Garderie autorisées", route:'/admin/search/cape-autorises/garderie', icon:'ri-search-2-line', hasChildren:false }
    ] }
];

// ================== MemberMenu ==================
export const MemberMenu: menu[] = [
    { id: 'member-1', isTitle:false, name:"Tableau de bord", route:'/admin/dashboard', icon:'ri-dashboard-line', hasChildren:false },
    { id: 'member-2', isTitle:true, title:"Etude de dossiers", hasChildren:false },
    { id: 'member-3', isTitle:false, name:"Dossiers inscrits", route:'/admin/session-requests', icon:'ri-folder-open-line', hasChildren:false },
];


export const AcaibMenu: menu[] = [
    { id: 'acaib-1', isTitle:false, name:"Tableau de bord", route:'/admin/dashboard', icon:'ri-dashboard-line', hasChildren:false },
    { id: 'acaib-2', isTitle:true, title:"Espace ACAIB", hasChildren:false },
    { id: 'acaib-3', isTitle:false, name:"Liste des abandons", route:'/admin/abandons', icon:'ri-user-unfollow-line', hasChildren:false },
];




// ================== ServiceMenu ==================
export const ServiceMenu: menu[] = [
    { id: 'service-1', isTitle:false, name:"Tableau de bord", route:'/admin/dashboard', icon:'ri-dashboard-line', hasChildren:false },

    { id: 'service-2', isTitle:true, title:"Gestion des sessions", hasChildren:false },
    { id: 'service-3', isTitle:false, name:"Création de session", route:'/admin/sessions', icon:'ri-calendar-event-line', hasChildren:false },
    { id: 'service-4', isTitle:false, name:"Création des membres", route:'/admin/members', icon:'ri-user-add-line', hasChildren:false },

    { id: 'service-5', isTitle:true, title:"Statistiques", hasChildren:false },
    { id: 'service-6', isTitle:false, name:"CAPE", icon:'ri-bar-chart-line', hasChildren:true, children:[
        { id: 'service-6-1', isTitle:false, name:"CAPE inscrits", route:'/admin/statistiques/cape-inscrits/cape', icon:'ri-bar-chart-grouped-line', hasChildren:false },
        { id: 'service-6-2', isTitle:false, name:"CAPE autorisés", route:'/admin/statistiques/cape-autorises/cape', icon:'ri-bar-chart-2-line', hasChildren:false },
        { id: 'service-6-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/cape', icon:'ri-map-search-line', hasChildren:false },
    ] },
    { id: 'service-7', isTitle:false, name:"Garderie", icon:'ri-bar-chart-box-line', hasChildren:true, children:[
        { id: 'service-7-1', isTitle:false, name:"Garderies inscrites", route:'/admin/statistiques/cape-inscrits/garderie', icon:'ri-bar-chart-grouped-line', hasChildren:false },
        { id: 'service-7-2', isTitle:false, name:"Garderies autorisées", route:'/admin/statistiques/cape-autorises/garderie', icon:'ri-bar-chart-2-line', hasChildren:false },
        { id: 'service-7-3', isTitle:false, name:"Visites de terrain", route:'/admin/statistiques/controls/garderie', icon:'ri-map-search-line', hasChildren:false },
    ] },

    { id: 'service-8', isTitle:true, title:"Recherche", hasChildren:false },
    { id: 'service-9', isTitle:false, name:"CAPE", icon:'ri-search-line', hasChildren:true, children:[
        { id: 'service-9-1', isTitle:false, name:"CAPE inscrits", route:'/admin/search/cape-inscrits/cape', icon:'ri-search-line', hasChildren:false },
        { id: 'service-9-2', isTitle:false, name:"CAPE autorisés", route:'/admin/search/cape-autorises/cape', icon:'ri-search-2-line', hasChildren:false },
    ] },
    { id: 'service-10', isTitle:false, name:"Garderie", icon:'ri-search-eye-line', hasChildren:true, children:[
        { id: 'service-10-1', isTitle:false, name:"Garderie inscrites", route:'/admin/search/cape-inscrits/garderie', icon:'ri-search-line', hasChildren:false },
        { id: 'service-10-2', isTitle:false, name:"Garderie autorisées", route:'/admin/search/cape-autorises/garderie', icon:'ri-search-2-line', hasChildren:false },
    ] }
];


// ================== ErrorMenu ==================
export const ErrorMenu: menu[] = [
    { id: 'error-1', isTitle:false, name:"Erreur 403", route:'/admin/403', hasChildren:false },
    { id: 'error-2', isTitle:false, name:"Erreur 404", route:'/admin/404', hasChildren:false },
    { id: 'error-3', isTitle:false, name:"Erreur 500", route:'/admin/500', hasChildren:false }
];

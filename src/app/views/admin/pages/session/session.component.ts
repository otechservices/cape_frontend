import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CpsService } from 'src/app/core/services/cps.service';
import { DistrictService } from 'src/app/core/services/district.service';
import { MemberServiceService } from 'src/app/core/services/member-service.service';
import { RequeteService } from 'src/app/core/services/requete.service';
import { SessionServiceService } from 'src/app/core/services/session-service.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { ConfigService } from 'src/app/core/utils/config-service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  @ViewChild(DataTableDirective , {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {
    language: {
      processing:     "Traitement en cours...",
      search:         "Rechercher&nbsp;:",
      lengthMenu:    "Afficher _MENU_ &eacute;l&eacute;ments",
      info:           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
      infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
      infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
      infoPostFix:    "",
      loadingRecords: "Chargement en cours...",
      zeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
      emptyTable:     "Aucune donnée disponible dans le tableau",
      paginate: {
          first:      "Premier",
          previous:   "Pr&eacute;c&eacute;dent",
          next:       "Suivant",
          last:       "Dernier"
      },
      aria: {
          sortAscending:  ": activer pour trier la colonne par ordre croissant",
          sortDescending: ": activer pour trier la colonne par ordre décroissant"
      }
      
  
    },
    responsive:true
  };
  dtTrigger: Subject<any> = new Subject<any>();
  buttonsPermission :any|undefined;
  structures:any[] =[]
  data:any[] =[]
  selected_data:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  is_active:any
  loading=false
  members:any[]=[]
  membersAll:any[]=[]
  requetes:any[]=[]
  requetesAll:any[]=[]
  role:any
  user:any
  dropdownList:any = [];
  selectedItems = [];
  dropdownSettings = {};
  dropdownList2:any = [];
  selectedItems2 = [];
  dropdownSettings2 = {};
  fileInput:any
  url:SafeResourceUrl | undefined

  constructor(
    private sessionService:SessionServiceService,
    private memberService:MemberServiceService,
    private reqService:RequeteService,
    private toastrService:ToastrService,
      config: NgbModalConfig,
      private lsService:LocalStorageService,
      private _sanitizationService: DomSanitizer,
    private modalService: NgbModal) {
     config.backdrop = 'static';
     config.keyboard = false;
     }

     showPreview=false

  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)
    this.init()
    this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };
    this.dropdownSettings = { 
      singleSelection: false, 
      text:"Selectionnez les membres",
      selectAllText:'Tous cochés',
      unSelectAllText:'Décochez tous',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    };    
    this.dropdownSettings2 = { 
      singleSelection: false, 
      text:"Selectionnez les dossiers",
      selectAllText:'Tous cochés',
      unSelectAllText:'Décochez tous',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    };    
  }

  init(){
    this.getAll()
    this.getMembers()
    this.getRequetes()
  }

 
 
  getAll(){
    this.sessionService.getAll().subscribe((res:any)=>{
      this.data=res.data
      this.selectedItems=[]
      this.selectedItems2=[]
      this.dropdownList=[]
      this.dropdownList2=[]
      this.modalService.dismissAll()
      this.reInitData()
    },
    (err:any)=>{

    })
  }

   
  getMembers(){
    this.memberService.getAll().subscribe((res:any)=>{
      this.membersAll=res.data
    },
    (err:any)=>{

    })
  }
  getRequetes(){
    this.reqService.getByInstance('admissible').subscribe((res:any)=>{
      this.requetesAll=res
    },
    (err:any)=>{

    })
  }

  upload(event:any){
    if(event.target.files.length>0){
      this.fileInput=event.target.files[0]
    }
  } 
  store(value:any){
    let formData= new FormData()

    let d2 = formatDate(value.date_start,'yyyy-MM-dd','en_US');
    let d1 =formatDate(value.date_end,'yyyy-MM-dd','en_US');
    let dayOfWeek1 =new Date(value.date_start).getDay();
    let dayOfWeek2 =new Date(value.date_end).getDay();
    
     if(d1 < d2){
       this.toastrService.error(`La date fin ne peut être antérieur à la date début `)
       return ;
     }
     if(dayOfWeek1===6 || dayOfWeek1===0 || dayOfWeek2===6 || dayOfWeek2===0 ){
 
       this.toastrService.error(`Veuillez choisir une date de jour ouvré `)
       return ;
     }

     if (this.fileInput == undefined) {
      this.toastrService.error(`Veuillez charger la note d'accord de la session`)
      return
     }else{
      formData.append('file',this.fileInput)
     }
 
     for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];
          formData.append(key,element)
      }
     }
    this.loading=true
    this.sessionService.store(formData).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()

    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Session",err.error.message)
    })
  }
  update(value:any){
    let formData= new FormData()

    let d2 = formatDate(value.date_start,'yyyy-MM-dd','en_US');
    let d1 =formatDate(value.date_end,'yyyy-MM-dd','en_US');
    let dayOfWeek1 =new Date(value.date_start).getDay();
    let dayOfWeek2 =new Date(value.date_end).getDay();
    
     if(d1 < d2){
       this.toastrService.error(`La date fin ne peut être antérieur à la date début `)
       return ;
     }
     if(dayOfWeek1===6 || dayOfWeek1===0 || dayOfWeek2===6 || dayOfWeek2===0 ){
 
       this.toastrService.error(`Veuillez choisir une date de jour ouvré `)
       return ;
     }

     if (this.fileInput != undefined) {
      formData.append('file',this.fileInput)

     }
 
     for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];
          formData.append(key,element)
      }
     }
    this.loading=true

    this.sessionService.update(this.selected_data.id,value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Session",err.error.message)
    })
  }
  delete(){
    if(!this.verifyIfElementChecked()) return ;
    let confirmed=AppSweetAlert.confirmBox('info','Suppression','Voulez vous vraiment retirer cet élément?',);
    confirmed.then((result:any)=>{
       if (result.isConfirmed) {
    this.sessionService.delete(this.selected_data.id).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Session",err.error.message)
    })
  }
})
  }
  checked(el?:any){
    this.selected_data=el;
    this.is_active=el.is_active
    this.members=this.selected_data.session_members
    this.requetes=this.selected_data.requetes


      this.membersAll.forEach((element:any) =>  {
        if (this.members.findIndex((el:any) => el.member?.id == element.id)==-1) {
          this.dropdownList.push({id:element.id,itemName:element.lastname+" "+element.firstname})
        }
      });
    
 
    this.requetesAll.forEach((element:any) =>  {
      if (this.requetes.findIndex((el:any) => el.id != element.id)) {
        this.dropdownList2.push({id:element.id,itemName:element.name})
      }
    });

   
  }
  verifyIfElementChecked(){
    console.log(this.selected_data)
    if (this.selected_data==null) {
      this.toastrService.warning("Aucun élément selectionné");
      return false;
    }
    return true;
  }


  reInitData(){
    this.selected_data=null
    if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      
        this.dtTrigger.subscribe()
       // this.dtTrigger.next(false);
      });
    } else {
      this.isDtInitialized = true
      this.dtTrigger.next(false);
    }
   }
  
  dismiss(){
    this.modalService.dismissAll()
  }

  add(content:any){
    this.modalService.open(content,{size:'lg'});
  }


  show(content:any){
    if(!this.verifyIfElementChecked()) return ;
    this.modalOption={centered:false,size:"lg"}
    this.modalService.open(content,{size:'lg'});
  }

  edit(content:any){
    if(!this.verifyIfElementChecked()) return ;
    this.modalService.open(content,{size:'lg'});

  }

  setStatus(value:any){

    this.toastrService.warning("Opération en cours")
  
        this.sessionService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
          this.toastrService.success(res.message)
          this.getAll()
      },
      (err:any)=>{
        console.log(err)
          AppSweetAlert.simpleAlert("error","Session",err.error.message)
      })
  }
  storeDistricts(value:any){

    this.toastrService.warning("Opération en cours")
    this.loading=true

        this.sessionService.storeMembers({
          id:this.selected_data.id,
          items: JSON.stringify(this.selectedItems)
        }).subscribe((res:any)=>{
          this.loading=false

          this.toastrService.success(res.message)
          this.getAll()
      },
      (err:any)=>{
        this.loading=false
        AppSweetAlert.simpleAlert("error","Session",err.error.message)
      })
  }
  storeRequetes(value:any){

    this.toastrService.warning("Opération en cours")
    this.loading=true
        this.sessionService.storeRequetes({
          id:this.selected_data.id,
          items: JSON.stringify(this.selectedItems2)
        }).subscribe((res:any)=>{
          this.loading=false
          this.selectedItems2=[];
          this.toastrService.success(res.message)
          this.getAll()
      },
      (err:any)=>{
        this.loading=false
        AppSweetAlert.simpleAlert("error","Session",err.error.message)
      })
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
}
OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
}
onSelectAll(items: any) {
    console.log(items);
}
onDeSelectAll(items: any) {
    console.log(items);
}

setStatutMember(id:any,value:any){
  this.toastrService.warning("Opération en cours")
  
        this.sessionService.setStatutMember(id,value).subscribe((res:any)=>{
          this.toastrService.success(res.message)
          this.members=[]
          this.init()
      },
      (err:any)=>{
        console.log(err)
          AppSweetAlert.simpleAlert("error","Session",err.error.message)
      })
}
removeMember(id:any, index:any){
  let confirmed=AppSweetAlert.confirmBox('info','Retrait membre','Voulez vous vraiment retirer cet membre?',);
  confirmed.then((result:any)=>{
     if (result.isConfirmed) {
  this.sessionService.removeMember(id).subscribe((res:any)=>{
      this.toastrService.success(res.message)
      this.members.splice(index,1)
      this.getAll()
  },
  (err:any)=>{
    console.log(err)
      AppSweetAlert.simpleAlert("error","Retrait membre",err.error.message)
  })
}
})
}
removeRequete(id:any, index:any){
  let confirmed=AppSweetAlert.confirmBox('info','Retrait dossier','Voulez vous vraiment retirer ce dossier?',);
  confirmed.then((result:any)=>{
     if (result.isConfirmed) {
  this.sessionService.removeRequete(id).subscribe((res:any)=>{
      this.toastrService.success(res.message)
      this.requetes.splice(index,1)
      this.getAll()
  },
  (err:any)=>{
    console.log(err)
      AppSweetAlert.simpleAlert("error","Retrait dossier",err.error.message)
  })
}
})
}
back(){
  this.showPreview=false
  this.dtTrigger.subscribe()

}
showFile(filename:any){
  this.modalService.dismissAll()
  let url=ConfigService.toFile("sessions/"+filename);
  this.url=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
  this.showPreview=true
// window.location=url 
}
}

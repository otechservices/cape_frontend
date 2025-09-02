import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DistrictService } from 'src/app/core/services/district.service';
import { MunicipalityService } from 'src/app/core/services/municipality.service';
import { RequeteService } from 'src/app/core/services/requete.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-request-has-agreement',
  templateUrl: './request-has-agreement.component.html',
  styleUrls: ['./request-has-agreement.component.css']
})
export class RequestHasAgreementComponent implements OnInit {


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
      
  
    }
  };
  dtTrigger: Subject<any> = new Subject<any>();
  buttonsPermission :any|undefined;
  structures:any[] =[]
  decisions:any[] =[]
  municipalities:any[] =[]
  data:any[] =[]
  data2:any[] =[]
  selected_data:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  is_active=null
  loading=false
  decision:any
  role:any
  user:any
  canClosed=false


  constructor(
    private reqService:RequeteService,
    private mService:MunicipalityService,
    private toastrService:ToastrService,
      config: NgbModalConfig,
      private lsService:LocalStorageService,
    private modalService: NgbModal) {
     config.backdrop = 'static';
     config.keyboard = false;
     }

     onAdd(value:any,refForm:NgForm){
      this.decisions.push({
        observation:value.observation
      })
      console.log(this.decisions)
      refForm.resetForm()
  }
  
  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)
    this.init()
    this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };
  }

  init(){
    this.getAll()
  }


  getAll(){
    this.reqService.getDecisions().subscribe((res:any)=>{
      this.data=res.data
      if(this.data.findIndex((el:any)=>el.is_authorized==null)==-1) this.canClosed=true
      this.modalService.dismissAll()
      this.reInitData()
    },
    (err:any)=>{

    })
  }


  store(value:any){
    this.loading=true
    value.collector_id=this.user.collector_id
   /* this.reqService.store(value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()

    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Accord",err.error.message)
    })*/
  }
  update(value:any){
    this.loading=true

    this.reqService.update(this.selected_data.id,value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Accord",err.error.message)
    })
  }

  checked(el?:any){
    this.selected_data=el;
    this.is_active=el.is_authorized
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
      
        dtInstance.destroy();
        this.dtTrigger.next(false);
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



  setStatus(){
    let formData= new FormData()
    let requetes:any[]=[]
    this.data.forEach((el:any)=> {
      requetes.push({
        id:el.id,
        has_agreemant:el.has_agreemant
      })
    })
    formData.append('requetes',JSON.stringify(requetes))
    formData.append('decision',this.decision)
    formData.append('decisions',JSON.stringify(this.decisions))

    this.toastrService.warning("Opération en cours")
  
        this.reqService.setDecision(formData).subscribe((res:any)=>{
          this.toastrService.success(res.message)
          this.getAll()
      },
      (err:any)=>{
        console.log(err)
          AppSweetAlert.simpleAlert("error","Décision Session",err.error.message)
      })
  }
  authorized(){
   
    this.toastrService.warning("Opération en cours")
  
        this.reqService.authorized().subscribe((res:any)=>{
          this.toastrService.success(res.message)
          this.getAll()
      },
      (err:any)=>{
        console.log(err)
          AppSweetAlert.simpleAlert("error","Décision finale",err.error.message)
      })
  }

}

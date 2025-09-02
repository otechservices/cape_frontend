import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ActivityReportResponseService } from 'src/app/core/services/activity-report-response.service';
import { ActivityReportService } from 'src/app/core/services/activity-report.service';
import { DepartmentService } from 'src/app/core/services/department.service';
import { TypeService } from 'src/app/core/services/type.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { ConfigService } from 'src/app/core/utils/config-service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-activity-report',
  templateUrl: './activity-report.component.html',
  styleUrls: ['./activity-report.component.css']
})
export class ActivityReportComponent implements OnInit {
  url:SafeResourceUrl | undefined
  showPreview=false

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
  buttonsPermission2 :any|undefined;
  activity_reports:any[] =[]
  activity_report_responses:any[] =[]
  data:any[] =[]
  selected_data:any;
  selected_data2:any;
  selected_data3:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  is_active=null
  loading=false
  service_id:any;
  type:any;
  role:any
  user:any

  fileInput1:any
  fileInput2:any

  constructor(
    private typeService:TypeService,
    private activatedRoute:ActivatedRoute,
    private activityReportService:ActivityReportService,
    private activityReportResponseService:ActivityReportResponseService,
    private _sanitizationService: DomSanitizer,
    private toastrService:ToastrService,
      config: NgbModalConfig,
      private lsService:LocalStorageService,
    private modalService: NgbModal) {
     config.backdrop = 'static';
     config.keyboard = false;
     }


  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)
    this.role=this.user.roles[0].name
    this.activatedRoute.paramMap.subscribe(params => {
      this.type =this.activatedRoute.snapshot.paramMap.get('service')
      this.init()
    })
      this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true,
      transission:true
    };
    this.buttonsPermission2 = {
      ok:true,
      nok:true
    };
  }

  showFile(filename:any,data?:any){
    let url=""
    if (this.role=="cape") {
      if(data!=undefined)this.selected_data=data
     url= ConfigService.toFile("docs/"+this.selected_data.cape?.requete?.code+"/reports/"+filename);

    }else{
      url= ConfigService.toFile("docs/"+this.selected_data.requete?.code+"/reports/"+filename);
    }
    this.modalService.dismissAll()
    this.url=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
    this.showPreview=true
  // window.location=url 
 }

  init(){
   this.setServiceId()
  }


  setServiceId(){
    this.typeService.getAll2().subscribe((res:any)=>{
      res.data.forEach((element:any) => {

        if(element.name.toLowerCase().includes(this.type.toLowerCase()))this.service_id=element.id
      });
      console.log(this.service_id)
      if (this.service_id!=undefined) {
        if(this.role!="cape"){
          this.getAll()
    
        }else{
          this.getForCape()
    
        }
      }else{
        this.toastrService.info('Impossible de charger les données, service non reconnue','Requêtes')
      }
      
    })

  }
 
 
  getForCape(){
    this.activityReportService.getForCape().subscribe((res:any)=>{
      this.data=res.data
      this.modalService.dismissAll()
      this.reInitData()
    },
    (err:any)=>{

    })
  }
  getAll(){
    this.activityReportService.getAll(this.service_id).subscribe((res:any)=>{
      this.data=res.data
      this.modalService.dismissAll()
      this.reInitData()
      this.activity_reports=[]
      this.activity_report_responses=[]
    },
    (err:any)=>{

    })
  }


  store(value:any){

    this.loading=true
    let formData= new FormData()

    formData.append('description',value.description)

    if (this.fileInput1==undefined || this.fileInput2==undefined) {
      this.toastrService.warning("Tous les fichiers sont requis","Rapport d'activité")
      return
    }
    formData.append('activity_report_filename', this.fileInput1);
    formData.append('financial_report_filename',this.fileInput2)

    this.activityReportService.store(formData).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()

    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Rapports d'activité",err.error.message)
    })
  }
  update(value:any){
    this.loading=true
    let formData= new FormData()

    formData.append('description',value.description)

    if (this.fileInput1!=undefined) {
      formData.append('activity_report_filename', this.fileInput1);

    }
    if (this.fileInput2!=undefined) {
      formData.append('financial_report_filename',this.fileInput2)

    }
    this.activityReportService.update(this.selected_data.id,formData).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Validation des rapports d'activité",err.error.message)
    })
  }
  delete(){
    if(!this.verifyIfElementChecked()) return ;
    let confirmed=AppSweetAlert.confirmBox('info','Suppression','Voulez vous vraiment retirer cet élément?',);
    confirmed.then((result:any)=>{
       if (result.isConfirmed) {
    this.activityReportService.delete(this.selected_data.id).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Validation des rapports d'activité",err.error.message)
    })
  }
})
  }


  send(){
    if(!this.verifyIfElementChecked()) return ;
    let confirmed=AppSweetAlert.confirmBox('info','Transmission','Voulez vous vraiment transmettre cet rapport?',);
    confirmed.then((result:any)=>{
       if (result.isConfirmed) {
    this.activityReportService.send(this.selected_data.id).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Rapports d'activité",err.error.message)
    })
  }
})
  }

  checked(el?:any){
    this.selected_data=el;
    console.log(el)
    if(this.role == "cape"){
      this.is_active=el.is_active
      this.activity_report_responses=el.responses
      if(this.selected_data.is_transmitted || this.selected_data.status==1){
        this.buttonsPermission.transission=false
        this.buttonsPermission.edit=false
        this.buttonsPermission.delete=false
      }
    }else{
        this.activity_reports=this.selected_data.activity_reports
    }
  
  }

  checked2(d:any){
    this.selected_data2=d;
    this.activity_report_responses=d.responses
      switch (this.selected_data2.status) {
        case 0:
          this.buttonsPermission2.ok=true
          this.buttonsPermission2.nok=true
          break;
        case 1:
          this.buttonsPermission2.ok=false
          this.buttonsPermission2.nok=false
          break;
        case 2:
          this.buttonsPermission2.ok=false
          this.buttonsPermission2.nok=false
          break;
        case 3:
          this.buttonsPermission2.ok=true
          this.buttonsPermission2.nok=true
          break;
      
        default:
          break;
      }
    
  }
  checked3(d:any){
    this.selected_data3=d;
  }
  verifyIfElementChecked(){
    console.log(this.selected_data)
    if (this.selected_data==null) {
      this.toastrService.warning("Aucun élément selectionné");
      return false;
    }
    return true;
  }
  verifyIfElementChecked2(){
    if (this.selected_data2==null) {
      this.toastrService.warning("Aucun rapporté d'activité selectionné");
      return false;
    }
    
    return true;
  }
  verifyIfElementChecked3(){
    if (this.selected_data3==null) {
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
  add2(content:any){
    if(!this.verifyIfElementChecked2() && this.selected_data2.status!=2) return ;
    this.modalService.open(content,{size:'lg'});
  }


  show(content:any){
    if(!this.verifyIfElementChecked2()) return ;
    this.modalOption={centered:false,size:"lg"}
    this.modalService.open(content,{size:'lg'});
  }

  edit(content:any){
    if(!this.verifyIfElementChecked()) return ;
    this.modalService.open(content,{size:'lg'});

  }
  edit2(content:any){
    if(!this.verifyIfElementChecked3()) return ;
    this.modalService.open(content,{size:'lg'});

  }

  setStatus(value:any){
    if(!this.verifyIfElementChecked2()) return ;

    this.toastrService.warning("Opération en cours")
  
        this.activityReportService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
          this.toastrService.success(res.message)
          this.getAll()
      },
      (err:any)=>{
        console.log(err)
          AppSweetAlert.simpleAlert("error","Validation des rapports d'activité",err.error.message)
      })
  }


  
  upload(event:any,index:any){
    if(event.target.files.length>0){
      if (index) {
        this.fileInput2=event.target.files[0]

      }else{
        this.fileInput1=event.target.files[0]

      }
    }
  } 

  getStatus(status:any){
    switch (status) {
      case 0:
        return "Rapport en attente de validation"
        break;
      case 1:
        return "Rapport validé"
        break;
      case 2:
        return "Rapport rejeté"
        break;
      case 3:
        return "Rapport corrigé en attente de validation"
        break;
    
      default:
        return "non défini"
        break;
    }
  }

  back(){
    this.showPreview=false
    this.getAll()
  }




  storeObs(value:any){

    this.loading=true
    value.activity_report_id=this.selected_data2.id
    this.activityReportResponseService.store(value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()

    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Rapports d'activité",err.error.message)
    })
  }
  updateObs(value:any){
    this.loading=true
   
    this.activityReportResponseService.update(this.selected_data3.id,value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Validation des rapports d'activité",err.error.message)
    })
  }
  deleteObs(){
    if(!this.verifyIfElementChecked3()) return ;
    let confirmed=AppSweetAlert.confirmBox('info','Suppression','Voulez vous vraiment retirer cet élément?',);
    confirmed.then((result:any)=>{
       if (result.isConfirmed) {
    this.activityReportResponseService.delete(this.selected_data3.id).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Validation des rapports d'activité",err.error.message)
    })
  }
})
  }
}

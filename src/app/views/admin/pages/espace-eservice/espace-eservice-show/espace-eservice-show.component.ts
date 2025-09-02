import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { inherit } from 'hammerjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RequeteService } from 'src/app/core/services/requete.service';
import { ResponseService } from 'src/app/core/services/response.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { ConfigService } from 'src/app/core/utils/config-service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-espace-eservice-show',
  templateUrl: './espace-eservice-show.component.html',
  styleUrls: ['./espace-eservice-show.component.css']
})
export class EspaceEserviceShowComponent implements OnInit {
  url:SafeResourceUrl | undefined
  showPreview=false
  fileSelected:any
  data:any
  code:any
  fileInput:any
  fileInput2:any
  is_signed=false
  loading=false
  user:any
  role:any
  constructor(
    private reqService:RequeteService,
    private toastrService:ToastrService,
      config: NgbModalConfig,
      private lsService:LocalStorageService,
      private router:Router,
    private activatedRoute:ActivatedRoute,
    private _sanitizationService: DomSanitizer,
    private responseService:ResponseService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal) {
     config.backdrop = 'static';
     config.keyboard = false;
     }

  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)
    this.role=this.user.roles[0].name
    this.code=this.activatedRoute.snapshot.paramMap.get('code')
    console.log(this.user)
    this.init()
  }


  init(){
    this.spinner.show();

    this.reqService.get(this.code).subscribe((res:any)=>{
      this.spinner.hide();

      this.data=res
      if(this.data.status==4  && !this.data.has_cps_file){
        this.data.social_investigator_name=this.user.cps?.name_chief
        console.log(this.data.social_investigator_name)
      }
    },
    (err:any)=>{
      this.spinner.hide();

    })
  }
  getJson(value:any){
    if (value==undefined) {
      return []
    } else {
      return JSON.parse(value)

    }
    
  }
  getZoneFile(name:any){
    let url=ConfigService.toFile("docs/"+this.data.code+"/"+name);
    console.log(url)
    return url
  }
  showFile(filename:any, f?:any){
      this.fileSelected=f
     let url=ConfigService.toFile("docs/"+this.data.code+"/"+filename);
     this.url=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
     this.showPreview=true
     console.log(this.fileSelected, this.data.status)
   // window.location=url 
  }
  showFile2(filename:any){
     let url=ConfigService.toFile("docs/"+this.data.code+"/"+filename);
     this.url=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
     this.showPreview=true
     console.log(this.fileSelected, this.data.status)
   // window.location=url 
  }
  showFileCpsFile(){
      let filename = this.data.files2.find((el:any)=>el.reference == "Enquête sociale")?.filename
     let url=ConfigService.toFile("docs/"+this.data.code+"/"+filename);
     this.url=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
     this.showPreview=true
   // window.location=url 
  }
  showFileRecepisseFile(){
    let filename =""
    if(this.data.has_deposit_file){
       filename = this.data.files2.find((el:any)=>el.reference == "Récépissé du dépôt de physique")?.filename

    }else{
       filename = this.data.receipt_preview

    }
     let url=ConfigService.toFile("docs/"+this.data.code+"/"+filename);
     this.url=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
     this.showPreview=true
   // window.location=url 
  }

  back(){
    this.showPreview=false
  }
  add(content:any){
    this.modalService.open(content,{size:'lg'});
  }


  upload(event:any){
    if (event.target.files.length>0) {
        this.fileInput=event.target.files[0]
    }
  }
  upload2(event:any){
    if (event.target.files.length>0) {
        this.fileInput2=event.target.files[0]
    }
  }

  finishStore1(value:any){
    let formData=new FormData()
    if (this.fileInput==undefined && !this.data.has_cps_file) {
      AppSweetAlert.simpleAlert("warning","Enquête sociale","Veuillez charger le fichier de l'enquête")
      return
    }
    if (this.fileInput!=undefined) {
      formData.append('file',this.fileInput)
    }
    formData.append('code',this.data.code)
    for(const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];
        formData.append(key,element)
      }
    }
    this.loading=true
    this.reqService.finishStore1(formData).subscribe((res:any)=>{
      AppSweetAlert.simpleAlert("success","Enquête sociale",res?.message)

      this.data=res
      this.modalService.dismissAll()
      this.init()
     // this.router.navigate(['/admin/requetes/new'])
     this.loading=false

    },
    (err:any)=>{
      this.loading=false

      AppSweetAlert.simpleAlert("error","Enquête sociale",err.error.message)

    })
  }

  finishStore2(value:any){

    let formData=new FormData()

    if (this.fileInput2==undefined && this.is_signed) {
      AppSweetAlert.simpleAlert("warning","Dépôt physqiue","Veuillez charger le récipissé signé")
      return
    }
    if (this.fileInput2!=undefined) {
      formData.append('file',this.fileInput2)
    }
    formData.append('code',this.data.code)
    for(const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];
        formData.append(key,element)
      }
    }

    this.loading=true

    this.reqService.finishStore2(formData).subscribe((res:any)=>{
      AppSweetAlert.simpleAlert("success","Dépôt physqiue",res?.message)
      if(res.data!=null || res.data!= undefined)this.showFile(res.data.file)
      this.data=res
      this.modalService.dismissAll()
      this.init()
      //this.router.navigate(['/admin/requetes/new'])
      this.loading=false

    },
    (err:any)=>{
      AppSweetAlert.simpleAlert("error","Dépôt physique",err.error.message)
      this.loading=false

    })
  }
  inviteStore(value:any){

    let d2 = formatDate(new Date(),'yyyy-MM-dd','en_US');
    let d1 =formatDate(value.date_meeting,'yyyy-MM-dd','en_US');
    let dayOfWeek1 =new Date(value.date_meeting).getDay();
    
     if(d1 < d2){
       this.toastrService.error(`La date fin ne peut être antérieur à la date du jour `)
       return ;
     }
     if(dayOfWeek1===6 || dayOfWeek1===0){
 
       this.toastrService.error(`Veuillez choisir une date de jour ouvré `)
       return ;
     }
   
     value.id=this.data.id;
     
    this.loading=true
    this.toastrService.info("Envoi du mail en cours","Invitation")
    this.reqService.inviteStore(value).subscribe((res:any)=>{
      this.data=res
      this.modalService.dismissAll()
      AppSweetAlert.simpleAlert("success","Invitation","Mail envoyé")

      this.router.navigate(['/admin/requetes/new/cape'])
      this.loading=false

    },
    (err:any)=>{
      this.loading=false
      this.modalService.dismissAll()

      AppSweetAlert.simpleAlert("error","Invitation",err.error.message)
    })
  }
  transUp(value:any){
   
    this.loading=true

    this.reqService.transUp({
      code:this.data.code,
      observation:value.observation
    }).subscribe((res:any)=>{
      AppSweetAlert.simpleAlert("success",this.data.status==6?"Validation de dossier":"Transmission",res?.message)

      this.data=res
      this.router.navigate(['/admin/requetes/new/cape'])
      this.loading=false
      this.modalService.dismissAll()

    },
    (err:any)=>{
      AppSweetAlert.simpleAlert("error","Transmission",err.error.message)

    })
  }
  transDown(value:any){
   
    this.loading=true

    this.reqService.transDown({
      code:this.data.code,
      motif: value.motif
    }).subscribe((res:any)=>{
      AppSweetAlert.simpleAlert("success","Transmission",res?.message)
      this.loading=false
      this.data=res
      this.modalService.dismissAll()
      this.router.navigate(['/admin/requetes/new/cape'])
    

    },
    (err:any)=>{
      AppSweetAlert.simpleAlert("error","Transmission",err.error.message)
      this.loading=false

    })
  }

  storePending(value:any){
    value.id=this.data.id
    value.hasPermission=0;
    this.loading=true

    this.responseService.needCorrection(value).subscribe((res:any)=>{
      AppSweetAlert.simpleAlert("success","Mise en attente",res?.message)

      this.router.navigate(['/admin/requetes/new/cape'])
        this.modalService.dismissAll()
        this.init()
        this.loading=false

        },
        (err:any)=>{
          this.loading=false

          AppSweetAlert.simpleAlert("error","Mise en attente",err.error.message)

        })
  
  }


  setFileTreatment(value:any){
    
    this.loading=true
    value.id=this.fileSelected.id
    value.is_valid= value.is_valid==""?false:true
    this.reqService.setFileTreatment(value).subscribe((res:any)=>{
      AppSweetAlert.simpleAlert("success","Traitement de fichier",res?.message)
      this.loading=false
      this.fileSelected=null
      this.modalService.dismissAll()
      this.back()
      this.init()
    

    },
    (err:any)=>{
      AppSweetAlert.simpleAlert("error","Traitement de fichier",err.error.message)
      this.loading=false

    })
  }
}

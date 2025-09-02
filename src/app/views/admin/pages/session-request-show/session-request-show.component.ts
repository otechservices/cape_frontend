import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, NgModel } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal, NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AvisServiceService } from 'src/app/core/services/avis-service.service';
import { CfeService } from 'src/app/core/services/cfe.service';
import { RequeteService } from 'src/app/core/services/requete.service';
import { ResponseService } from 'src/app/core/services/response.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { ConfigService } from 'src/app/core/utils/config-service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-session-request-show',
  templateUrl: './session-request-show.component.html',
  styleUrls: ['./session-request-show.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SessionRequestShowComponent implements OnInit {
  @ViewChild('contentFiles') contentFiles:TemplateRef<any> | undefined
  @ViewChild('contentFiche') contentFiche:TemplateRef<any> | undefined
  @ViewChild('contentDetail') contentDetail:TemplateRef<any> | undefined
  @ViewChild('contentFilePreview') contentFilePreview:TemplateRef<any> | undefined
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  url:SafeResourceUrl | undefined
  data:any
  code:any
  detail:any
  myAvis:any
  requete_file:any
  showPreview=false
  fileInput:any
  fileInput2:any
  canSetAvis=true
  is_signed=false
  loading=false
  user:any
  acteUrl:any
  role:any
  avis:any[]=[]
  filesForTreatment:any[]=[]
  elements:any[]=[]
  decisions:any[]=[]
  decision:any
  formInfoHolder:any = [];
  isSessionFile=false
  note:any={
    max:0,
    total:0
  }

  note2:any={
    max:0,
    total:0
  }

  note3:any={
    max:0,
    total:0
  }
  
  constructor(
    private reqService:RequeteService,
    private cfeService:CfeService,
    private avisService:AvisServiceService,
    private toastrService:ToastrService,
    private formBuilder : FormBuilder,
      config: NgbModalConfig,
      private lsService:LocalStorageService,
      private router:Router,
    private activatedRoute:ActivatedRoute,
    private _sanitizationService: DomSanitizer,
    private responseService:ResponseService,
    
    configOffCanvas: NgbOffcanvasConfig,
     private offcanvasService: NgbOffcanvas,
    private modalService: NgbModal) {
     config.backdrop = 'static';
     config.keyboard = false;
     configOffCanvas.position = 'end';
     configOffCanvas.backdropClass = 'bg-dark';
     configOffCanvas.keyboard = false;
     }

  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)
    this.role=this.user.roles[0].name
    this.code=this.activatedRoute.snapshot.paramMap.get('code')
    this.init()
  }


  init(){
    this.filesForTreatment=[]
    this.note2.max=0
    this.note3.max=0
    this.reqService.get2(this.code).subscribe((res:any)=>{
      this.data=res
      this.acteUrl=ConfigService.toFile("sessions/"+this.data.session.filename);
      if(this.role == "member")  {
        this.note3.max+=this.data.my_avis?.note
       } 
       if( this.data.session?.is_active){
        let note=0
        this.data.avis.forEach((r2:any)=>note+=r2.note)
        this.note2.max+=note/this.data.avis.length
       }
      res.files.forEach((r:any)=>{
       
    
     this.filesForTreatment.push({
      name:r.file?.name,
      url:ConfigService.toFile("docs/"+this.data.code+"/"+r.filename)
    })
    
      })
      let filename = this.data.files2.find((el:any)=>el.reference == "Enquête sociale")?.filename
      let url=ConfigService.toFile("docs/"+this.data.code+"/"+filename);
      this.filesForTreatment.push({
        name:"Enquête sociale",
        url:url
      })
      this.getElements(this.data.service_id)

      console.log( this.note3)
    },
    (err:any)=>{

    })
  }

  getElements(id:any){
    this.elements=[]
    this.note.total=0
    this.note2.total=0
    this.note3.total=0
    this.cfeService.getAllActives(id).subscribe((res:any)=>{
      res.data.forEach((el:any,index:any) => {
        this.elements.push({
          name:el.name,
          note_max:el.note_max,
          note:null,
          observation:"",
          alert:false
        })
        if(this.role == "member") this.note3.total+=el.note_max
         this.note2.total+=el.note_max
         this.note.total+=el.note_max
      });
     
    },
    (err:any)=>{

    })
  }
  getJson(value:any){
    if (value==undefined) {
      return []
    } else {
      return JSON.parse(value)

    }
    
  }
  showFileCpsFile(){
    let filename = this.data.files2.find((el:any)=>el.reference == "Enquête sociale")?.filename
   let url=ConfigService.toFile("docs/"+this.data.code+"/"+filename);
   this.url=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
   this.showPreview=true
 // window.location=url 
}
open2(content:any){
  this.modalService.open(content,{size:'lg'})
}
decide(){
  if(this.data?.my_avis){
    this.elements=[]
    let userElements=JSON.parse(this.data?.my_avis?.treatment)
    userElements.forEach((el:any,index:any) => {
      this.elements.push({
        name:el.name,
        note_max:el.note_max,
        note:el.note,
        alert:false,
        observation:el.observation
      })
    });
  }
  this.offcanvasService.open(this.contentFiche,{panelClass: 'details-panel2',position: 'start'  })
  this.offcanvasService.open(this.contentFiles,{panelClass: 'details-panel2',position: 'end'  })
}
showDetails(a:any){
  this.detail=JSON.parse(a?.treatment)
  this.offcanvasService.open(this.contentDetail,{panelClass: 'details-panel2',position: 'start'  })

}
updateResponse(value:any){
  let formData=new FormData()
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      const element = value[key];
      formData.append(key,element)
    }
  }
  let note:any=0
  this.elements.forEach((el:any)=>note+=el.note)

  formData.append('note',note)
  formData.append('treatment',JSON.stringify(this.elements))
  console.log(note,this.elements)
  this.loading=true
  this.avisService.update(this.data?.my_avis?.id,formData).subscribe((res:any)=>{
    this.loading=false
      this.modalService.dismissAll()
      
      let closePDFBtn:HTMLElement = document.getElementById('closePDFBtn') as HTMLElement;
      let closeFicheBtn:HTMLElement = document.getElementById('closeFicheBtn') as HTMLElement;
      this.init()

      closePDFBtn?.click()
      closeFicheBtn?.click()
      this.toastrService.success('Votre élément de réponse a été sauvegardé avec succès')
     // this.router.navigate(['admin/espace-dcetp/acts/new'])
  },
  (err:any)=>{
    this.loading=false

  })
}
openFinished(content:any){
  let checkNotchecked= this.elements.filter((el:any)=>el.note==null)
  if(checkNotchecked.length>0){
    this.elements.forEach((el:any) => {
      if (el.response==null) {
        el.alert=true
      }
    });
    this.toastrService.warning('Veuillez remplir toute la fiche svp')

    return ;
  }
  this.modalService.open(content,{size:'lg'})
}
changeAlert(ev:any,max:any,index:any){
  if(0>ev.target.value) this.elements[index].note=0
  if(ev.target.value>max)this.elements[index].note=max
  if (this.elements[index].alert) {
    this.elements[index].alert=false
  }
}
storeResponse(value:any){
  let formData=new FormData()
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      const element = value[key];
      formData.append(key,element)
    }
  }
  let note:any=0
  this.elements.forEach((el:any)=>note+=el.note)

  formData.append('note',note)
  formData.append('session_member_id',this.user.session_member_id)
  formData.append('requete_id',this.data.id)
  formData.append('treatment',JSON.stringify(this.elements))
  this.loading=true
  this.avisService.store(formData).subscribe((res:any)=>{
    this.loading=false
      this.modalService.dismissAll()
      
      let closePDFBtn:HTMLElement = document.getElementById('closePDFBtn') as HTMLElement;
      let closeFicheBtn:HTMLElement = document.getElementById('closeFicheBtn') as HTMLElement;
      this.init()

      closePDFBtn?.click()
      closeFicheBtn?.click()
      this.toastrService.success('Votre élément de réponse a été sauvegardé avec succès')
     // this.router.navigate(['admin/espace-dcetp/acts/new'])
  },
  (err:any)=>{
    this.loading=false

  })

}
  
  open(content:any, avis:any) {
    this.avis=avis
    this.note.max=0
    this.avis.forEach((res:any)=>{
      this.note.max+=res.note
    })
    this.note.max=this.note.max/avis.length

		this.offcanvasService.open(content,{panelClass: 'details-panel2',position: 'end'  });
	}
  showFile(filename:any,file:any,avis:any){

    if (avis != undefined) {
      this.canSetAvis=false
  }
    this.requete_file=file
     let url=ConfigService.toFile("docs/"+this.data.code+"/"+filename);
     this.url=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
     this.showPreview=true
   // window.location=url 
  }
  showFile2(filename:any){
    this.isSessionFile=true
     let url=ConfigService.toFile("sessions/"+filename);
     this.url=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
     this.showPreview=true
   // window.location=url 
  }
  showFile3(url:any){
    this.pdfSrc=url
    // this.url=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
     this.offcanvasService.open(this.contentFilePreview,{panelClass: 'details-panel3',position: 'bottom'  })

   // window.location=url 
  }


  back(){
    this.showPreview=false
    this.isSessionFile=false
  }
  add(content:any){
    this.modalService.open(content,{size:'lg'});
  }
  add2(content:any,avis:any){
    this.myAvis=avis
  
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


  storeAvis(value:any){
    value.session_member_id=this.user.session_member_id,
   // value.requete_file_id=this.requete_file.id;
    this.loading=true

    this.avisService.store(value).subscribe((res:any)=>{
      AppSweetAlert.simpleAlert("success","Avis",res?.message)
      this.loading=false
      this.modalService.dismissAll()
     // this.back()
      this.init()
      

    },
    (err:any)=>{
      AppSweetAlert.simpleAlert("error","Transmission",err.error.message)
      this.loading=false

    })
  }


  updateAvis(value:any){
    this.loading=true

    this.avisService.update(this.myAvis.id,value).subscribe((res:any)=>{
      AppSweetAlert.simpleAlert("success","Avis",res?.message)
      this.loading=false
      this.modalService.dismissAll()
      this.back()
      this.init()

    },
    (err:any)=>{
      AppSweetAlert.simpleAlert("error","Transmission",err.error.message)
      this.loading=false

    })
  }


  finish(value:any){
    value.id=this.data.id
    value.referals=JSON.stringify(this.decisions)
    value.note=this.note2.max
    this.loading=true
    this.reqService.finish(value).subscribe((res:any)=>{
      AppSweetAlert.simpleAlert("success","Clôture de dossier",res?.message)
      this.loading=false
      this.modalService.dismissAll()
      this.router.navigate(['/admin/sessions'])

    },
    (err:any)=>{
      AppSweetAlert.simpleAlert("error","Clôture de dossier",err.error.message)
      this.loading=false

    })
  }

  onAdd(value:any,refForm:NgForm){
    this.decisions.push({
      observation:value.observation
    })
    console.log(this.decisions)
    refForm.resetForm()
}
deleteLine(toDelete:any){
    this.formInfoHolder.splice(toDelete,1)
}

setCorrectvalue(ev:any,max:any,index:any){
  alert()
  if(0>ev.target.value) this.elements[index].note=0
  if(ev.target.value>max)this.elements[index].note=max
}

getFolderNote(){
  let note=0
  let out=0
  this.elements.forEach((el:any)=>{
    note+=el.note
    out+=el.note_max
  })
  return `${note}/${out}`
}
}
